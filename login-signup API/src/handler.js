const { nanoid } = require('nanoid')
const db = require('./database')
const moment = require('moment')

// registration
const signupHandler = async (request, h) => {
  const { username, email, password, confirmedPassword, phone, firstName, lastName, gender, birth, status } = request.payload
  if (password !== confirmedPassword) {
    const response = h.response({
      status: 'fail',
      message: 'Password tidak boleh berbeda'
    })
    response.code(400)
    return response
  }
  const sameUsername = await db.query('SELECT username FROM users WHERE username =?', [username])
  const sameEmail = await db.query('SELECT email FROM users WHERE email =?', [email])
  const samePhone = await db.query('SELECT phone FROM users WHERE phone =?', [phone])
  if (sameUsername.results.length > 0) {
    const response = h.response({
      status: 'fail',
      message: 'Username sudah digunakan'
    })
    response.code(400)
    return response
  }
  if (sameEmail.results.length > 0) {
    const response = h.response({
      status: 'fail',
      message: 'Email sudah digunakan'
    })
    response.code(400)
    return response
  }
  if (samePhone.results.length > 0) {
    const response = h.response({
      status: 'fail',
      message: 'Nomor sudah digunakan'
    })
    response.code(400)
    return response
  }
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  await db.query('INSERT INTO users (id, username, email, password, phone, firstName, lastName, gender, birth, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, username, email, password, phone, firstName, lastName, gender, birth, status, createdAt, updatedAt])

  const isSuccess = await db.query('SELECT id FROM users WHERE id =?', [id])
  if (isSuccess.results.length > 0) {
    const response = h.response({
      status: 'success',
      data: {
        id, username, email, password, phone, firstName, lastName, gender, birth, status, createdAt, updatedAt
      }
    })
    response.code(201)
    return response
  }
}

// login
const loginHandler = async (request, h) => {
  const { email, password } = request.payload
  const result = await db.query('SELECT * FROM users WHERE email =? AND password =?', [email, password])
  const login = result.results[0]
  const wrongEmail = await db.query('SELECT * FROM users WHERE email =?', [email])
  const wrongPassword = wrongEmail.results[0]
  if (login) {
    const response = h.response({
      status: 'success',
      message: 'Login berhasil',
      data: {
        userId: login.id,
        username: login.username
      }
    })
    response.code(200)
    return response
  } else if (wrongEmail.results.length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'Email salah'
    })
    response.code(404)
    return response
  } else if (wrongPassword.password !== password) {
    const response = h.response({
      status: 'fail',
      message: 'Password salah'
    })
    response.code(404)
    return response
  }
}

// getAllProfile
const getAllProfileHandler = async (request, h) => {
  const { results } = await db.query('SELECT * FROM users')
  const response = h.response({
    status: 'success',
    data: results
  })
  response.code(200)
  return response
}

// getProfile
const getProfileHandler = async (request, h) => {
  const { userId } = request.params
  const { results } = await db.query('SELECT username, firstName, lastName FROM users WHERE id =?', [userId])
  if (results[0]) {
    const response = h.response({
      status: 'success',
      data: results[0]
    })
    response.code(200)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Profile tidak ditemukan'
  })
  response.code(404)
  return response
}

// updateProfile
const updateProfileHandler = async (request, h) => {
  const { userId } = request.params
  const { username, password, confirmedPassword, phone, firstName, lastName, gender, birth, status } = request.payload
  if (password !== confirmedPassword) {
    const response = h.response({
      status: 'fail',
      message: 'Password tidak boleh berbeda'
    })
    response.code(400)
    return response
  }
  const updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const isCorrect = await db.query('SELECT * FROM users WHERE id =?', [userId])
  if (isCorrect.results.length > 0) {
    await db.query('UPDATE users SET updatedAt =?', [updatedAt])
    if (username) {
      await db.query('UPDATE users SET username =?', [username])
    }
    if (password) {
      await db.query('UPDATE users SET password =?', [[password]])
    }
    if (phone) {
      await db.query('UPDATE users SET phone =?', [phone])
    }
    if (firstName) {
      await db.query('UPDATE users SET firstName =?', [firstName])
    }
    if (lastName) {
      await db.query('UPDATE users SET lastName =?', [lastName])
    }
    if (gender) {
      await db.query('UPDATE users SET gender =?', [gender])
    }
    if (birth) {
      await db.query('UPDATE users SET birth =?', [birth])
    }
    if (status) {
      await db.query('UPDATE users SET status =?', [status])
    }
    const updated = await db.query('SELECT * FROM users WHERE id =?', [userId])
    const response = h.response({
      status: 'success',
      message: 'Profile berhasil diubah',
      data: updated.results[0]
    })
    response.code(201)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Profile tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

// deleteProfile
const deleteProfileHandler = async (request, h) => {
  const { userId } = request.params
  const isCorrect = await db.query('SELECT * FROM users WHERE id =?', [userId])
  const deleted = isCorrect.results
  if (deleted.length > 0) {
    await db.query('DELETE FROM users WHERE id =?', [userId])
    const isSuccess = await db.query('SELECT * FROM users WHERE id =?', [userId])
    if (isSuccess.results.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Profile berhasil dihapus'
      })
      response.code(200)
      return response
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Profile tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  loginHandler,
  signupHandler,
  getAllProfileHandler,
  getProfileHandler,
  updateProfileHandler,
  deleteProfileHandler
}
