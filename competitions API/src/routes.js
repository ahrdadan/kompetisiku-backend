const {
  inputCompetitionHandler,
  getAllCompetitionsHandler,
  updateCompetitionHandler,
  deleteCompetitionHandler
} = require('./handler')

const routes = [
  // inputCompetition
  {
    method: 'POST',
    path: '/competitions/{userId}',
    handler: inputCompetitionHandler
  },
  // getAllCompetitions
  {
    method: 'GET',
    path: '/competitions/{competitionId?}',
    handler: getAllCompetitionsHandler
  },
  // updateCompetition
  {
    method: 'PATCH',
    path: '/competitions/{competitionId}',
    handler: updateCompetitionHandler
  },
  // deleteCompetition
  {
    method: 'DELETE',
    path: '/competitions/{competitionId}',
    handler: deleteCompetitionHandler
  }
]

module.exports = routes
