const db = require('./database')
const moment = require('moment')
const { nanoid } = require('nanoid')

// getTotalPrice
const getTotalPriceHandler = async (request, h) => {
  const { userId } = request.params
  const { competitionId } = request.query
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt
  await db.query('INSERT INTO carts SET id =?, competitionId = (SELECT id FROM competitions WHERE id =?), pricePerItem = (SELECT pricePerItem FROM competitions WHERE id =?), quantity = (SELECT COUNT(userId) FROM orders WHERE userId =?), total = pricePerItem * quantity, createdAt =?, updatedAt =?', [id, competitionId, competitionId, userId, createdAt, updatedAt])
}

module.exports = getTotalPriceHandler
