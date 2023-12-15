const {
  inputDataFormsHandler,
  getAllFormsHandler,
  getFormsByIdHandler,
  updateFormsByIdHandler,
  deleteFormsHandler
} = require('./handler')

const routes = [
  // inputDataForms
  {
    method: 'POST',
    path: '/competitions/forms/{userId}',
    handler: inputDataFormsHandler
  },
  // getAllForms
  {
    method: 'GET',
    path: '/competitions/forms',
    handler: getAllFormsHandler
  },
  // getFormsById
  {
    method: 'GET',
    path: '/competitions/forms/{formsId}',
    handler: getFormsByIdHandler
  },
  // updateFormsById
  {
    method: 'PATCH',
    path: '/competitions/forms/{formsId}',
    handler: updateFormsByIdHandler
  },
  // deleteForms
  {
    method: 'DELETE',
    path: '/competitions/forms/{formsId}',
    handler: deleteFormsHandler
  }
]
module.exports = routes
