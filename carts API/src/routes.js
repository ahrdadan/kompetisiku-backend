const getTotalPriceHandler = require('./handler')

const routes = [
  // getTotalPrice
  {
    method: 'GET',
    path: '/{userId}/carts',
    handler: getTotalPriceHandler
  }
]

module.exports = routes
