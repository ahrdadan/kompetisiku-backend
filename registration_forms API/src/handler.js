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

  const { results } = await db.query('INSERT INTO data_forms SET data =?, id =?, userId = (SELECT id FROM users WHERE id =?), competitionId =(SELECT id FROM competitions WHERE id =?), createdAt =?, updatedAt =?', [JSON.stringify(data), id, userId, competitionId, createdAt, updatedAt])

  if (results) {
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
    message: 'Gagal menampilkan form pendaftaran'
  })
  response.code(404)
  return response
}

module.exports = {
  inputDataFormsHandler,
  getAllFormsHandler
}
