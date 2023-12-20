const {
  getAllFormsHandler,
  getFormsByIdHandler,
  updateFormsByIdHandler,
  deleteFormsHandler,
  createFormsHandler
} = require('./handler')

const routes = [
  // createForms
  {
    method: 'POST',
    path: '/{organizerId}/competitions/{competitionId}/forms',
    handler: createFormsHandler
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
    path: '/{organizerId}/competitions/forms/{formId}',
    handler: updateFormsByIdHandler
  },
  // deleteForms
  {
    method: 'DELETE',
    path: '/{organizerId}/competitions/forms/{formId}',
    handler: deleteFormsHandler
  }
]
module.exports = routes
