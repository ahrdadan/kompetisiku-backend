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
    path: '/{organizerId}/competitions',
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
    path: '/{organizerId}/competitions/{competitionId}',
    handler: updateCompetitionHandler
  },
  // deleteCompetition
  {
    method: 'DELETE',
    path: '/{organizerId}/competitions/{competitionId}',
    handler: deleteCompetitionHandler
  }
]

module.exports = routes
