const {
  inputDataFormsHandler,
  getAllFormsHandler
} = require('./handler')

const routes = [
  // inputDataForms
  {
    method: 'POST',
    path: '/forms/{userId}',
    handler: inputDataFormsHandler
  },
  // getAllForms
  {
    method: 'GET',
    path: '/forms',
    handler: getAllFormsHandler
  }
]
module.exports = routes
