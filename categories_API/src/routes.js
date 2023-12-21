const {
  inputCategoriesHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  deleteCategoryHandler
} = require('./handler')

const routes = [
  // inputCategories
  {
    method: 'POST',
    path: '/categories',
    handler: inputCategoriesHandler
  },
  // getAllCategories
  {
    method: 'GET',
    path: '/categories',
    handler: getAllCategoriesHandler
  },
  // getCategoryById
  {
    method: 'GET',
    path: '/categories/{categoryId}',
    handler: getCategoryByIdHandler
  },
  // deleteCategort
  {
    method: 'DELETE',
    path: '/categories/{categoryId}',
    handler: deleteCategoryHandler
  }
]

module.exports = routes
