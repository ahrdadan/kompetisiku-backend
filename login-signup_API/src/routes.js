const {
  loginHandler,
  signupHandler,
  updateProfileHandler,
  getProfileHandler,
  deleteProfileHandler,
  getAllProfileHandler
} = require('./handler')

const routes = [
  // registration
  {
    method: 'POST',
    path: '/signup',
    handler: signupHandler
  },
  // login
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler
  },
  {
    method: 'GET',
    path: '/profile',
    handler: getAllProfileHandler
  },
  // getProfile
  {
    method: 'GET',
    path: '/profile/{userId}',
    handler: getProfileHandler
  },
  // updateProfile
  {
    method: 'PATCH',
    path: '/profile/{userId}',
    handler: updateProfileHandler
  },
  // deleteProfile
  {
    method: 'DELETE',
    path: '/profile/{userId}',
    handler: deleteProfileHandler
  }
]

module.exports = routes
