const moment = require('moment')
const db = require('./database')

// insertQuestions
const insertQuestionHandler = async (request, h) => {
  const { organizerId, competitionId } = request.params
  const { key, dataType, description } = request.payload
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  const avail = await db.query('SELECT * FROM competitions WHERE id =? AND organizerId =?', [competitionId, organizerId])
  if (avail.results.length > 0) {
    await db.query('INSERT INTO data_forms (competitionId, `key`, dataType, description, createdAt, updatedAt) VALUES ((SELECT id FROM competitions WHERE id =?), ?, ?, ?, ?, ?)', [competitionId, key, dataType, description, createdAt, updatedAt])
    const isSuccess = await db.query('SELECT * FROM data_forms WHERE competitionId =? AND createdAt =?', [competitionId, createdAt])
    if (isSuccess.results.length > 0) {
      const response = h.response({
        status: 'success',
        data: isSuccess.results[0]
      })
      response.code(201)
      return response
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Kompetisi tidak ditemukan'
  })
  response.code(404)
  return response
}

// getAllQustions
const getAllQustionsHandler = async (request, h) => {
  const { competitionId } = request.params
  const avail = await db.query('SELECT * FROM data_forms WHERE competitionId =?', [competitionId])
  if (avail.results.length > 0) {
    const { results } = await db.query('SELECT * FROM data_forms')
    if (results) {
      const response = h.response({
        status: 'success',
        data: results
      })
      response.code(200)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menampilkan pertanyaan'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Pertanyaan tidak ditemukan'
  })
  response.code(404)
  return response
}

// updateQuestion
const updateQuestionHandler = async (request, h) => {
  const { organizerId, competitionId, dataId } = request.params
  const { key, dataType, description } = request.payload
  const updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const avail = await db.query('SELECT * FROM competitions WHERE id =? AND organizerId =?', [competitionId, organizerId])
  if (avail.results.length > 0) {
    await db.query('UPDATE data_forms SET updatedAt =? WHERE id =?', [updatedAt, dataId])
    if (key) {
      await db.query('UPDATE data_forms SET `key` =? WHERE id =?', [key, dataId])
    }
    if (dataType) {
      await db.query('UPDATE data_forms SET dataType =? WHERE id =?', [dataType, dataId])
    }
    if (description) {
      await db.query('UPDATE data_forms SET description =? WHERE id =?', [description, dataId])
    }
    const response = h.response({
      status: 'success',
      message: 'Pertanyaan berhasil diupdate'
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Kompetisi tidak ditemukan'
  })
  response.code(404)
  return response
}

// deleteQuestion
const deleteQuestionHandler = async (request, h) => {
  const { competitionId, organizerId, dataId } = request.params
  const avail = await db.query('SELECT * FROM competitions WHERE id =? AND organizerId =?', [competitionId, organizerId])
  if (avail.results.length > 0) {
    await db.query('DELETE FROM data_forms WHERE id =?', [competitionId])
    const { results } = await db.query('SELECT * FROM data_forms WHERE id =?', [dataId])
    if (results.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Berhasil menghapus pertanyaan'
      })
      response.code(200)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus pertanyaan'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Pertanyaan tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  insertQuestionHandler,
  getAllQustionsHandler,
  updateQuestionHandler,
  deleteQuestionHandler
}
