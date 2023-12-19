const moment = require("moment");
const { nanoid } = require("nanoid");
const db = require("./database");

// createOrganizer
const createOrganizerHandler = async (request, h) => {
  const { userId } = request.params;
  const { organizerName } = request.payload;
  const id = nanoid(16);
  const createdAt = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  const updatedAt = createdAt;

  await db.query(
    "INSERT INTO organizers SET id =?, userId = (SELECT id FROM users WHERE id =?), username = (SELECT username FROM users WHERE id =?), organizerName =?, createdAt =?, updatedAt =?",
    [id, userId, userId, organizerName, createdAt, updatedAt]
  );
  const isSuccess = await db.query("SELECT * FROM organizers WHERE id =?", [
    id,
  ]);
  const inputed = isSuccess.results;
  if (inputed.length > 0) {
    const response = h.response({
      status: "success",
      data: inputed[0],
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal membuat penyelenggara",
  });
  response.code(400);
  return response;
};

// getAllOrganizer
const getAllOrganizerHandler = async (request, h) => {
  const { results } = await db.query("SELECT * FROM organizers");
  if (results.length > 0) {
    const response = h.response({
      status: "success",
      data: results,
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Gagal menampilkan penyelenggara",
  });
  response.code(400);
  return response;
};

// getOrganizerById
const getOrganizerByIdHandler = async (request, h) => {
  const { organizerId } = request.params;
  const { results } = await db.query("SELECT * FROM organizers WHERE id =?", [
    organizerId,
  ]);
  if (results.length > 0) {
    const response = h.response({
      status: "success",
      data: results[0],
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Penyelanggara tidak ditemukan",
  });
  response.code(404);
  return response;
};

// updateOrganizerById
const updateOrganizerByIdHandler = async (request, h) => {
  const updatedAt = moment(Date.now()).format("YYYY-MM-SS HH:mm:ss");
  const { organizerName } = request.payload;
  const { organizerId } = request.params;
  const avail = await db.query("SELECT * FROM organizers WHERE id =?", [
    organizerId,
  ]);
  if (avail.results.length > 0) {
    if (organizerName) {
      await db.query(
        "UPDATE organizers SET organizerName =?, updatedAt =? WHERE id =?",
        [organizerName, updatedAt, organizerId]
      );
      const { results } = await db.query(
        "SELECT * FROM organizers WHERE id =?",
        [organizerId]
      );
      const response = h.response({
        status: "success",
        data: results[0],
      });
      response.code(201);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "Gagal melakukan perubahan pada penyelenggara",
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Penyelenggara tidak ditemukan",
  });
  response.code(404);
  return response;
};

// deleteOrganizerById
const deleteOrganizerById = async (request, h) => {
  const { organizerId } = request.params;
  const avail = await db.query("SELECT * FROM organizers WHERE id =?", [
    organizerId,
  ]);
  if (avail.results.length > 0) {
    await db.query("DELETE FROM organizers WHERE id =?", [organizerId]);
    const isSuccess = await db.query("SELECT * FROM organizers WHERE id =?", [
      organizerId,
    ]);
    if (isSuccess.results.length === 0) {
      const response = h.response({
        status: "success",
        message: "Penyelenggara berhasil dihapus",
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "Gagal menghapus penyelenggara",
    });
    response.code(400);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Penyelenggara tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  createOrganizerHandler,
  getAllOrganizerHandler,
  getOrganizerByIdHandler,
  updateOrganizerByIdHandler,
  deleteOrganizerById,
};
