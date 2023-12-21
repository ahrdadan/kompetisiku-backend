const {
  createOrdersHandler,
  getOrdersByUserId,
  updateOrdersById,
  deleteOrderById
} = require('./handler')

const routes = [
  // createOrder
  {
    method: 'POST',
    path: '/{userId}/orders',
    handler: createOrdersHandler
  },
  // getOrderByUserId
  {
    method: 'GET',
    path: '/{userId}/orders',
    handler: getOrdersByUserId
  },
  // updateOrderById
  {
    method: 'PATCH',
    path: '/{userId}/orders/{orderId}',
    handler: updateOrdersById
  },
  // deleteOrderById
  {
    method: 'DELETE',
    path: '/{userId}/orders/{orderId}',
    handler: deleteOrderById
  }
]

module.exports = routes
