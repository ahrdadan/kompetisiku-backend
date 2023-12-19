const moment = require('moment')
const db = require('./database')
const { nanoid } = require('nanoid')

// inputCategories
const inputCategoriesHandler = async (request, h) => {
  const { category } = request.payload
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  await db.query('INSERT INTO categories SET id =?, category =?, createdAt =?, updatedAt =?', [id, category, createdAt, updatedAt])

  const { results } = await db.query('SELECT * FROM categories WHERE id =?', [id])
  if (results.length > 0) {
    const response = h.response({
      status: 'success',
      data: results[0]
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menambahkan kategori'
  })
  response.code(400)
  return response
}

// getAllCategories
const getAllCategoriesHandler = async (request, h) => {
  const { results } = await db.query('SELECT * FROM categories')
  if (results.length > 0) {
    const response = h.response({
      status: 'success',
      data: results
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal menampilkan kategori'
  })
  response.code(400)
  return response
}

// getCategoryById
const getCategoryByIdHandler = async (request, h) => {
  const { categoryId } = request.params
  const { results } = await db.query('SELECT * FROM categories WHERE id =?', [categoryId])

  if (results.length > 0) {
    const response = h.response({
      status: 'success',
      data: results[0]
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Kategori tidak ditemukan'
  })
  response.code(404)
  return response
}

// deleteCategory
const deleteCategoryHandler = async (request, h) => {
  const { categoryId } = request.params
  const { results } = await db.query('SELECT * FROM categories WHERE id =?', [categoryId])

  if (results.length > 0) {
    await db.query('DELETE FROM categories WHERE id =?', [categoryId])
    const deleted = await db.query('SELECT * FROM categories WHERE id =?', [categoryId])
    if (deleted.results.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Berhasil menghapus kategori'
      })
      response.code(200)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menghapus kategori'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Kategori tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  inputCategoriesHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  deleteCategoryHandler
}
