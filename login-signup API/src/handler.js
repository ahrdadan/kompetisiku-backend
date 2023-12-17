const { nanoid } = require('nanoid')
const db = require('./database')
const moment = require('moment')

// registration
const signupHandler = async (request, h) => {
  const { username, email, password, confirmedPassword, phone, firstName, lastName, gender, birth, statusId, latestEducationId } = request.payload
  if (password !== confirmedPassword) {
    const response = h.response({
      status: 'fail',
      message: 'Password yang dimasukkan tidak sesuai'
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
  const countStatusId = await db.query('SELECT COUNT(id) AS count FROM status')
  if (statusId > countStatusId.results[0].count) {
    const response = h.response({
      status: 'fail',
      message: 'Status tidak ditemukan'
    })
    response.code(404)
    return response
  }
  const countEducationId = await db.query('SELECT COUNT(id) AS count FROM latest_education')
  if (latestEducationId > countEducationId.results[0].count) {
    const response = h.response({
      status: 'fail',
      message: 'Tingkat pendidikan tidak ditemukan'
    })
    response.code(404)
    return response
  }
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  await db.query('INSERT INTO users SET id =?, username =?, email=?, password =?, phone =?, firstName =?, lastName =?, gender =?, birth =?, statusId =? , status = (SELECT status FROM status WHERE id =?), latestEducationId =?, latestEducation = (SELECT education FROM latest_education WHERE id =?), createdAt =?, updatedAt =?', [id, username, email, password, phone, firstName, lastName, gender, birth, statusId, statusId, latestEducationId, latestEducationId, createdAt, updatedAt])

  const isSuccess = await db.query('SELECT id FROM users WHERE id =?', [id])
  const inputed = isSuccess.results
  if (inputed.length > 0) {
    const { results } = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users WHERE id =?", [id])
    const response = h.response({
      status: 'success',
      data: results[0]
    })
    response.code(201)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal membuat profile'
  })
  response.code(400)
  return response
}

// login
const loginHandler = async (request, h) => {
  const { username, email, phone, password } = request.payload
  if (username) {
    const available = await db.query('SELECT * FROM users WHERE username =?', [username])
    if (available.results.length > 0) {
      const correct = await db.query('SELECT * FROM users WHERE username =? AND password = ?', [username, password])
      if (correct.results.length > 0) {
        const { results } = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users WHERE username =?", [username])
        const response = h.response({
          status: 'success',
          data: results[0]
        })
        response.code(200)
        return response
      }
      const response = h.response({
        status: 'fail',
        message: 'Password salah'
      })
      response.code(400)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Username tidak ditemukan'
    })
    response.code(404)
    return response
  }
  if (email) {
    const available = await db.query('SELECT * FROM users WHERE email =?', [email])
    if (available.results.length > 0) {
      const correct = await db.query('SELECT * FROM users WHERE email =? AND password = ?', [email, password])
      if (correct.results.length > 0) {
        const { results } = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users WHERE email =?", [email])
        const response = h.response({
          status: 'success',
          data: results[0]
        })
        response.code(200)
        return response
      }
      const response = h.response({
        status: 'fail',
        message: 'Password salah'
      })
      response.code(400)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Email tidak ditemukan'
    })
    response.code(404)
    return response
  }
  if (phone) {
    const available = await db.query('SELECT * FROM users WHERE phone =?', [phone])
    if (available.results.length > 0) {
      const correct = await db.query('SELECT * FROM users WHERE phone =? AND password = ?', [phone, password])
      if (correct.results.length > 0) {
        const { results } = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users WHERE phone =?", [phone])
        const response = h.response({
          status: 'success',
          data: results[0]
        })
        response.code(200)
        return response
      }
      const response = h.response({
        status: 'fail',
        message: 'Password salah'
      })
      response.code(400)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Phone tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

// getAllProfile
const getAllProfileHandler = async (request, h) => {
  const { results } = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users")
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
    message: 'Gagal menampilkan profile'
  })
  response.code(400)
  return response
}

// getProfile
const getProfileHandler = async (request, h) => {
  const { userId } = request.params
  const { results } = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users WHERE id =?", [userId])
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
  const { email, username, password, confirmedPassword, phone, firstName, lastName, gender, birth, statusId, latestEducationId } = request.payload
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
  const correct = isCorrect.results
  if (correct.length > 0) {
    await db.query('UPDATE users SET updatedAt =? WHERE id =?', [updatedAt, userId])
    if (email) {
      const uniqueEmail = await db.query('SELECT email FROM users WHERE email =?', [email])
      if (uniqueEmail.results.length > 0) {
        const response = h.response({
          status: 'fail',
          message: 'Email sudah digunakan'
        })
        response.code(400)
        return response
      }
      await db.query('UPDATE users SET email =? WHERE id =?', [email, userId])
    }
    if (username) {
      const uniqueUsername = await db.query('SELECT username FROM users WHERE username =?', [username])
      if (uniqueUsername.results.length > 0) {
        const response = h.response({
          status: 'fail',
          message: 'Username sudah digunakan'
        })
        response.code(400)
        return response
      }
      await db.query('UPDATE users SET username =? WHERE id =?', [username, userId])
    }
    if (password) {
      await db.query('UPDATE users SET password =? WHERE id =?', [password, userId])
    }
    if (phone) {
      const uniquePhone = await db.query('SELECT phone FROM users WHERE phone =?', [phone])
      if (uniquePhone.results.length > 0) {
        const response = h.response({
          status: 'fail',
          message: 'Nomor sudah digunakan'
        })
        response.code(400)
        return response
      }
      await db.query('UPDATE users SET phone =? WHERE id =?', [phone, userId])
    }
    if (firstName) {
      await db.query('UPDATE users SET firstName =? WHERE id =?', [firstName, userId])
    }
    if (lastName) {
      await db.query('UPDATE users SET lastName =? WHERE id =?', [lastName, userId])
    }
    if (gender) {
      await db.query('UPDATE users SET gender =? WHERE id =?', [gender, userId])
    }
    if (birth) {
      await db.query('UPDATE users SET birth =? WHERE id =?', [birth, userId])
    }
    if (statusId) {
      const countStatusId = await db.query('SELECT COUNT(id) AS count FROM status')
      if (statusId > countStatusId.results[0].count) {
        const response = h.response({
          status: 'fail',
          message: 'Status tidak ditemukan'
        })
        response.code(404)
        return response
      }
      await db.query('UPDATE users SET statusId =?, status = (SELECT status FROM status WHERE id=?) WHERE id =?', [statusId, statusId, userId])
    }
    if (latestEducationId) {
      const countEducationId = await db.query('SELECT COUNT(id) AS count FROM latest_education')
      if (statusId > countEducationId.results[0].count) {
        const response = h.response({
          status: 'fail',
          message: 'Status tidak ditemukan'
        })
        response.code(404)
        return response
      }
      await db.query('UPDATE users SET latestEducationId =?, latestEducation = (SELECT education FROM latest_education WHERE id =?) WHERE id =?', [latestEducationId, latestEducationId, userId])
    }
    const updated = await db.query("SELECT id, username, email, password, CONCAT(firstName, ' ', lastName) AS name, gender, birth, status, latestEducation AS 'latest education', createdAt AS 'created at', updatedAt AS 'updated at' FROM users WHERE id =?", [userId])
    const update = updated.results
    const response = h.response({
      status: 'success',
      message: 'Profile berhasil diubah',
      data: update[0]
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
