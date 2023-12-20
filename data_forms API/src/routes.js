const {
  insertQuestionHandler,
  getAllQustionsHandler,
  updateQuestionHandler,
  deleteQuestionHandler
} = require('./handler')

const routes = [
  // insertQuestion
  {
    method: 'POST',
    path: '/{organizerId}/competitions/{competitionId}/forms/data',
    handler: insertQuestionHandler
  },
  // getAllQuestionsByCompetitions
  {
    method: 'GET',
    path: '/competitions/{competitionId}/forms/data',
    handler: getAllQustionsHandler
  },
  // updateQuestion
  {
    method: 'PATCH',
    path: '/{organizerId}/competitions/{competitionId}/forms/data/{dataId}',
    handler: updateQuestionHandler
  },
  // deleteQuestion
  {
    method: 'DELETE',
    path: '/{organizerId}/competitions/{competitionId}/forms/data/{dataId}',
    handler: deleteQuestionHandler
  }
]

module.exports = routes
