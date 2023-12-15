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
    path: '/competitions/forms/{formId}',
    handler: getFormsByIdHandler
  },
  // updateFormsById
  {
    method: 'PATCH',
    path: '/competitions/forms/{formId}',
    handler: updateFormsByIdHandler
  },
  // deleteForms
  {
    method: 'DELETE',
    path: '/competitions/forms/{formId}',
    handler: deleteFormsHandler
  }
]
module.exports = routes
