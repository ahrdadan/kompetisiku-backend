// src/routes.js
const {
  getAllTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  getAllCart,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
} = require('./handler');

const routes = [{
    method: 'GET',
    path: '/carts',
    handler: getAllCart,
  },
  {
    method: 'GET',
    path: '/carts/{id}',
    handler: getCartById,
  },
  {
    method: 'POST',
    path: '/carts',
    handler: addCart,
  },
  {
    method: 'PUT',
    path: '/carts/{participantId}',
    handler: updateCart,
  },
  {
    method: 'DELETE',
    path: '/carts/{participantId}/{cartId}',
    handler: deleteCart,
  },
  {
    method: 'GET',
    path: '/transactions',
    handler: getAllTransactions,
  },
  {
    method: 'GET',
    path: '/transactions/{orderId}',
    handler: getTransactionById,
  },
  {
    method: 'POST',
    path: '/transactions',
    handler: addTransaction,
  },
  {
    method: 'PUT',
    path: '/transactions/{orderId}',
    handler: updateTransaction,
  },
  {
    method: 'DELETE',
    path: '/transactions/{participantId}/{id}',
    handler: deleteTransaction,
  },
];

module.exports = routes;