const {
  createOrganizerHandler,
  getAllOrganizerHandler,
  getOrganizerByIdHandler,
  updateOrganizerByIdHandler,
  deleteOrganizerById
} = require('./handler')

const routes = [
  // createOrganzizer
  {
    method: 'POST',
    path: '/profile/{userId}/organizers',
    handler: createOrganizerHandler
  },
  // getAllOrganizer
  {
    method: 'GET',
    path: '/profile/organizers',
    handler: getAllOrganizerHandler
  },
  // getOrganizerById
  {
    method: 'GET',
    path: '/profile/organizers/{organizerId}',
    handler: getOrganizerByIdHandler
  },
  // updateOrganizer
  {
    method: 'PATCH',
    path: '/profile/organizers/{organizerId}',
    handler: updateOrganizerByIdHandler
  },
  // deleteOrganizer
  {
    method: 'DELETE',
    path: '/profile/organizers/{organizerId}',
    handler: deleteOrganizerById
  }
]

module.exports = routes