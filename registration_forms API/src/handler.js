const moment = require('moment')
const { nanoid } = require('nanoid')
const db = require('./database')

// inputDataForms
const inputDataFormsHandler = async (request, h) => {
  const { data } = request.payload
  const { userId } = request.params
  const { competitionId } = request.query
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  const { results } = await db.query('INSERT INTO data_forms SET data =?, id =?, userId = (SELECT id FROM users WHERE id =?), competitionId =(SELECT id FROM competitions WHERE id =?), title = (SELECT title FROM competitions WHERE id =?),createdAt =?, updatedAt =?', [JSON.stringify(data), id, userId, competitionId, competitionId, createdAt, updatedAt])

  if (results.length > 0) {
    const success = await db.query('SELECT * FROM data_forms WHERE id =?', [id])
    const response = h.response({
      status: 'success',
      data: success.results[0]
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail'
  })
  response.code(400)
  return response
}

// getAllForms
const getAllFormsHandler = async (request, h) => {
  const { results } = await db.query('SELECT * FROM data_forms')
  if (results.length > 0) {
    const response = h.response({
      status: 'success',
      data: results
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menampilkan form pendaftaran'
  })
  response.code(404)
  return response
}

// getFormsById
const getFormsByIdHandler = async (request, h) => {
  const { formId } = request.params
  const { results } = await db.query('SELECT * FROM data_forms WHERE id =?', [formId])

  if (results.length > 0) {
    const response = h.response({
      status: 'success',
      data: results[0]
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Form pendaftaran tidak ditemukan'
  })
  response.code(404)
  return response
}

// updateFormsById
const updateFormsByIdHandler = async (request, h) => {
  const { formId } = request.params
  const { data } = request.payload
  const updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const { results } = await db.query('SELECT * FROM data_forms WHERE id =?', [formId])
  const jsondoc = await db.query('SELECT data FROM data_forms WHERE id =?', [formId])
  const jdoc = jsondoc.results

  if (results.length > 0) {
    await db.query("UPDATE data_forms SET data = JSON_SET(?, '$', CAST(? AS JSON)) WHERE id =?", [JSON.stringify(jdoc[0].data), JSON.stringify([...data]), formId])
    await db.query('UPDATE data_forms SET updatedAt =? WHERE id =?', [updatedAt, formId])
    const updated = await db.query('SELECT * FROM data_forms WHERE id =?', [formId])
    if (updated.results.length > 0) {
      const response = h.response({
        status: 'success',
        message: 'Berhasil mengubah data formulir pendaftaran',
        data: updated.results[0]
      })
      response.code(201)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal mengubah form pendaftaran'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Form pendaftaran tidak ditemukan.'
  })
  response.code(404)
  return response
}

// deleteForms
const deleteFormsHandler = async (request, h) => {
  const { formId } = request.params
  const { results } = await db.query('SELECT * FROM data_forms WHERE id =?', [formId])

  if (results.length > 0) {
    await db.query('DELETE FROM data_forms WHERE id =?', [formId])
    const deleted = await db.query('SELECT * FROM data_forms WHERE id =?', [formId])
    if (deleted.results.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Form pendaftaran berhasil dihapus'
      })
      response.code(200)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus form pendaftaran'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Form pendaftaran tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  inputDataFormsHandler,
  getAllFormsHandler,
  getFormsByIdHandler,
  updateFormsByIdHandler,
  deleteFormsHandler
}
