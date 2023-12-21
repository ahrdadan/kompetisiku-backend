const moment = require('moment')
const db = require('./database')
const { nanoid } = require('nanoid')

// createOrders
const createOrdersHandler = async (request, h) => {
  const { userId } = request.params
  const { competitionId, formId } = request.query
  const { answer } = request.payload
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  const avail = await db.query('SELECT * FROM forms WHERE competitionId =? AND formId =?', [competitionId, formId])
  if (avail.results.length > 0) {
    await db.query('INSERT INTO orders SET id =?, userId = (SELECT id FROM users WHERE id =?), competitionId = (SELECT id FROM competitions WHERE id =?), formId = (SELECT id FROM forms WHERE id =?), title = (SELECT title FROM competitions WHERE id =?), pricePerItem = (SELECT pricePerItem FROM competitions WHERE id =?), answer =?, createdAt =?, updatedAt =?', [id, userId, competitionId, formId, competitionId, competitionId, JSON.stringify(answer), createdAt, updatedAt])

    const { results } = await db.query('SELECT * FROM orders WHERE id =?', [id])
    if (results.length > 0) {
      const response = h.response({
        status: 'success',
        data: results[0]
      })
      response.code(201)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal melakukan pemesanan'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Formulir tidak ditemukan'
  })
  response.code(404)
  return response
}

// getOrdersByUserId
const getOrdersByUserId = async (request, h) => {
  const { userId } = request.params
  const { results } = await db.query('SELECT * FROM orders WHERE userId =?', [userId])
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
    message: 'Pesanan tidak ditemukan'
  })
  response.code(404)
  return response
}

// updateOrdersById
const updateOrdersById = async (request, h) => {
  const { userId, orderId } = request.params
  const { answer } = request.payload
  const updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const avail = await db.query('SELECT * FROM orders WHERE id =? AND userId =?', [orderId, userId])

  if (avail.results.length > 0) {
    await db.query('UPDATE orders SET updatedAt =? WHERE id =?', [updatedAt, orderId])
    await db.query('UPDATE forms SET answer =? WHERE id =?', [JSON.stringify(answer), orderId])
    const { results } = await db.query('SELECT * FROM orders WHERE id =?', [orderId])
    const response = h.response({
      status: 'success',
      data: results[0]
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Pemesanan tidak ditemukan'
  })
  response.code(404)
  return response
}

// deleteOrderById
const deleteOrderById = async (request, h) => {
  const { userId, orderId } = request.params
  const avail = await db.query('SELECT * FROM orders WHERE id =? AND userId =?', [orderId, userId])
  if (avail.results.length > 0) {
    await db.query('DELETE FROM orders WHERE id =?', [orderId])
    const { results } = await db.query('SELECT * FROM orders WHERE id =?', [orderId])
    if (results.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Berhasil menghapus pemesanan'
      })
      response.code(200)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus pemesanan'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Pemesanan tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  createOrdersHandler,
  getOrdersByUserId,
  updateOrdersById,
  deleteOrderById
}
