const db = require('./database')
const { nanoid } = require('nanoid')
const moment = require('moment')

// inputCompetition
const inputCompetitionHandler = async (request, h) => {
  const { organizerId } = request.params
  const { title, categoryId, image, eventStart, eventEnd, location, reward, registrationOpen, registrationClose, capacity, pricePerItem, description, attachedFile } = request.payload
  if (eventStart > eventEnd) {
    const response = h.response({
      status: 'fail',
      message: 'Tanggal mulai harus sama atau lebih awal daripada tanggal berakhir'
    })
    response.code(400)
    return response
  }
  if (registrationOpen > registrationClose) {
    const response = h.response({
      status: 'fail',
      message: 'Tanggal pendaftaran harus sama atau lebih awal daripada tanggal berakhir'
    })
    response.code(400)
    return response
  }
  if (!title) {
    const response = h.response({
      status: 'fail',
      message: 'Judul kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!image) {
    const response = h.response({
      status: 'fail',
      message: 'Gambar/poster kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!eventStart || !eventEnd) {
    const response = h.response({
      status: 'fail',
      message: 'Tanggal mulai dan berakhir kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!location) {
    const response = h.response({
      status: 'fail',
      message: 'Lokasi kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!reward) {
    const response = h.response({
      status: 'fail',
      message: 'Hadiah kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!registrationOpen || !registrationClose) {
    const response = h.response({
      status: 'fail',
      message: 'Tanggal mulai dan berakhir pendaftaran kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!capacity) {
    const response = h.response({
      status: 'fail',
      message: 'Kapasitas kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!pricePerItem) {
    const response = h.response({
      status: 'fail',
      message: 'Harga tiket tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  if (!description) {
    const response = h.response({
      status: 'fail',
      message: 'Deskripsi kompetisi tidak boleh kosong'
    })
    response.code(400)
    return response
  }
  const id = nanoid(16)
  const createdAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const updatedAt = createdAt

  const { results } = await db.query('SELECT * FROM organizers WHERE id =?', [organizerId])
  if (results.length > 0) {
    await db.query('INSERT INTO competitions SET id =?, title =?, categoryId =?, category = (SELECT category FROM categories WHERE id =?), organizerId =?, organizerName = (SELECT organizerName FROM organizers WHERE id =?), image =?, eventStart =?, eventEnd =?, location =?, reward =?, registrationOpen =?, registrationClose =?, capacity =?, pricePerItem =?, description =?, attachedFile =?, createdAt =?, updatedAt =?', [id, title, categoryId, categoryId, organizerId, organizerId, image, eventStart, eventEnd, location, reward, registrationOpen, registrationClose, capacity, pricePerItem, description, attachedFile, createdAt, updatedAt])

    const isSuccess = await db.query('SELECT * FROM competitions WHERE id =?', [id])
    if (isSuccess.results.length > 0) {
      const response = h.response({
        status: 'success',
        data: isSuccess.results[0]
      })
      response.code(201)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahakan kompetisi'
    })
    response.code(400)
    return response
  }
  const response = h.response({
    status: 'fail',
    message: 'Penyelenggara tidak ditemukan'
  })
  response.code(404)
  return response
}

// getAllCompetitions
const getAllCompetitionsHandler = async (request, h) => {
  const { competitionId } = request.params
  const { title, category } = request.query
  const titles = `%${title}%`
  const categories = `%${category}%`
  if (competitionId) {
    const { results } = await db.query('SELECT * FROM competitions WHERE id =?', [competitionId])
    if (results[0]) {
      const response = h.response({
        status: 'success',
        data: results[0]
      })
      response.code(200)
      return response
    } else {
      const response = h.response({
        status: 'fail',
        message: 'Kompetisi tidak ditemukan'
      })
      response.code(404)
      return response
    }
  } else if (title || category) {
    if (title && !category) {
      const { results } = await db.query('SELECT * FROM competitions WHERE title LIKE ?', [titles])
      if (results) {
        const response = h.response({
          status: 'success',
          data: results
        })
        response.code(200)
        return response
      }
    } else if (category && !title) {
      const { results } = await db.query('SELECT * FROM competitions WHERE category LIKE ?', [categories])
      if (results) {
        const response = h.response({
          status: 'success',
          data: results
        })
        response.code(200)
        return response
      }
    } else if (category && title) {
      const { results } = await db.query('SELECT * FROM competitions WHERE title LIKE ? OR category LIKE ?', [titles, categories])
      if (results) {
        const response = h.response({
          status: 'success',
          data: results
        })
        response.code(200)
        return response
      }
    }
    const response = h.response({
      status: 'fail',
      message: 'Kata kunci tidak ditemukan'
    })
    response.code(404)
    return response
  } else {
    const { results } = await db.query('SELECT * FROM competitions')
    if (results[0]) {
      const response = h.response({
        status: 'success',
        data: results
      })
      response.code(200)
      return response
    }
    const response = h.response({
      status: 'fail',
      message: 'Kompetisi tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

// updateCompetition
const updateCompetitionHandler = async (request, h) => {
  const { competitionId } = request.params
  const { title, categoryId, image, eventStart, eventEnd, location, reward, registrationOpen, registrationClose, capacity, pricePerItem, description, attachedFile } = request.payload
  if (eventStart > eventEnd) {
    const response = h.response({
      status: 'fail',
      message: 'Tanggal mulai harus sama atau lebih awal daripada tanggal berakhir'
    })
    response.code(400)
    return response
  }
  if (registrationOpen > registrationClose) {
    const response = h.response({
      status: 'fail',
      message: 'Tanggal pendaftaran harus sama atau lebih awal daripada tanggal berakhir'
    })
    response.code(400)
    return response
  }
  const updatedAt = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const isCorrect = await db.query('SELECT * FROM competitions WHERE id =?', [competitionId])
  const correct = isCorrect.results
  if (correct.length > 0) {
    await db.query('UPDATE competitions SET updatedAt =? WHERE id =?', [updatedAt, competitionId])
    if (title) {
      await db.query('UPDATE competitions SET title =? WHERE id =?', [title, competitionId])
    }
    if (categoryId) {
      await db.query('UPDATE competitions SET categoryId =?, category = (SELECT category FROM categories WHERE id =?) WHERE id =?', [categoryId, categoryId, competitionId])
    }
    if (image) {
      await db.query('UPDATE competitions SET image =? WHERE id =?', [image, competitionId])
    }
    if (eventStart) {
      await db.query('UPDATE competitions SET eventStart =? WHERE id =?', [eventStart, competitionId])
    }
    if (eventEnd) {
      await db.query('UPDATE competitions SET eventEnd =? WHERE id =?', [eventEnd, competitionId])
    }
    if (location) {
      await db.query('UPDATE competitions SET location =? WHERE id =?', [location, competitionId])
    }
    if (reward) {
      await db.query('UPDATE competitions SET reward =? WHERE id =?', [reward, competitionId])
    }
    if (registrationOpen) {
      await db.query('UPDATE competitions SET registrationOpen =? WHERE id =?', [registrationOpen, competitionId])
    }
    if (registrationClose) {
      await db.query('UPDATE competitions SET registrationClose =? WHERE id =?', [registrationClose, competitionId])
    }
    if (capacity) {
      await db.query('UPDATE competitions SET capacity =? WHERE id =?', [capacity, competitionId])
    }
    if (pricePerItem) {
      await db.query('UPDATE competitions SET pricePerItem =? WHERE id =?', [pricePerItem, competitionId])
    }
    if (description) {
      await db.query('UPDATE competitions SET description =? WHERE id =?', [description, competitionId])
    }
    if (attachedFile) {
      await db.query('UPDATE competitions SET attachedFile =? WHERE id =?', [attachedFile, competitionId])
    }
    const updated = await db.query('SELECT * FROM competitions WHERE id =?', [competitionId])
    const update = updated.results
    const response = h.response({
      status: 'success',
      message: 'Data kompetisi berhasil diubah',
      data: update[0]
    })
    response.code(201)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Kompetisi tidak ditemukan'
    })
    response.code(404)
    return response
  }
}

// deleteCompetition
const deleteCompetitionHandler = async (request, h) => {
  const { competitionId } = request.params
  const isCorrect = await db.query('SELECT * FROM competitions WHERE id =?', [competitionId])
  const deleted = isCorrect.results
  if (deleted.length > 0) {
    await db.query('DELETE FROM competitions WHERE id =?', [competitionId])
    const isSuccess = await db.query('SELECT * FROM competitions WHERE id =?', [competitionId])
    if (isSuccess.results.length === 0) {
      const response = h.response({
        status: 'success',
        message: 'Kompetisi berhasil dihapus'
      })
      response.code(200)
      return response
    }
  }
  const response = h.response({
    status: 'fail',
    message: 'Kompetisi tidak ditemukan'
  })
  response.code(404)
  return response
}

module.exports = {
  inputCompetitionHandler,
  getAllCompetitionsHandler,
  updateCompetitionHandler,
  deleteCompetitionHandler
}
