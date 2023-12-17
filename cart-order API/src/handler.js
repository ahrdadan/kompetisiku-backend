const db = require('./database');

const getAllCart = async (request, h) => {
  try {
    const {
      results,
    } = await db.query('select * from carts');
    if (results.length > 0) {
      const response = h.response({
        message: 'Data carts berhasil ditemukan',
        data: results,
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      message: 'Data carts Tidak Ditemukan',
    });
    response.code(404);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam mengambil data orders',
    });
    response.code(500);
    return response;
  }
};

const getCartById = async (request, h) => {
  try {
    const {
      id,
    } = request.params;
    const {
      results,
    } = await db.query('SELECT * FROM carts WHERE id = ?', [id]);
    if (results.length > 0) {
      const response = h.response({
        message: `Data cart ID ${id} berhasil ditemukan`,
        data: results,
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      message: `Data ${id} Tidak Ditemukan`,
    });
    response.code(404);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam mengambil data orders',
    });
    response.code(500);
    return response;
  }
};


const addCart = async (request, h) => {
  try {
    const {
      participantId,
      quantity,
      total,
    } = request.payload;

    const hargaTotal = quantity * total;
    const query = 'INSERT INTO carts (participant_id, quantity, total) VALUES (?, ?, ?)';
    const escapedValues = [participantId, quantity, hargaTotal];

    const {
      results,
    } = await db.query(query, escapedValues);

    const response = h.response({
      message: 'Data cart berhasil ditambahkan',
      data: results[0],
    });
    response.code(201);
    return response;
  } catch (error) {
    console.error('Error adding data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam menambahkan data cart',
    });
    response.code(500);
    return response;
  }
};


const updateCart = async (request, h) => {
  try {
    const {
      participantId,
    } = request.params;
    const {
      quantity,
      total,
    } = request.payload;

    const query = 'UPDATE carts SET quantity = ?, total = quantity * ? WHERE participant_id = ?';
    const escapedValues = [quantity, total, participantId];

    const {
      results,
    } = await db.query(query, escapedValues);

    if (results.affectedRows > 0) {
      const response = h.response({
        message: `Data cart dengan ID ${participantId} berhasil diperbarui`,
        data: results[0],
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      message: `Data cart dengan ID ${participantId} tidak ditemukan`,
    });
    response.code(404);
    return response;
  } catch (error) {
    console.error('Error updating data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam memperbarui data cart',
    });
    response.code(500);
    return response;
  }
};

const deleteCart = async (request, h) => {
  try {
    const {
      participantId,
      cartId
    } = request.params;

    // Hapus terlebih dahulu data dari tabel orders yang merujuk ke cart_id yang akan dihapus
    const deleteOrdersQuery = 'DELETE FROM orders WHERE cart_id = ?';
    await db.query(deleteOrdersQuery, [cartId]);

    // Hapus data dari tabel carts setelah data terkait di tabel orders dihapus
    const deleteQuery = 'DELETE FROM carts WHERE participant_id = ? AND id = ?';
    const deleteValues = [participantId, cartId];
    const {
      results
    } = await db.query(deleteQuery, deleteValues);

    if (results.affectedRows > 0) {
      // Data berhasil dihapus
      return h.response({
        message: `Data cart dengan ID ${cartId} dan participant ID ${participantId} berhasil dihapus`,
      }).code(200);
    } else {
      // Data tidak ditemukan
      return h.response({
        message: `Data cart dengan ID ${cartId} dan participant ID ${participantId} tidak ditemukan`,
      }).code(404);
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    return h.response({
      message: 'Terjadi kesalahan dalam menghapus data cart',
    }).code(500);
  }
};


// transactions handler
const getAllTransactions = async (request, h) => {
  try {
    const {
      results,
    } = await db.query('select * from orders');
    if (results.length > 0) {
      const response = h.response({
        message: 'Data transactions berhasil ditemukan',
        data: results,
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      message: 'Data transactions Tidak Ditemukan',
    });
    response.code(404);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam mengambil data orders',
    });
    response.code(500);
    return response;
  }
};

const getTransactionById = async (request, h) => {
  try {
    const {
      orderId,
    } = request.params;
    const {
      results,
    } = await db.query('SELECT * FROM orders WHERE cart_id = ?', [orderId]);
    if (results.length > 0) {
      const response = h.response({
        message: `Data transactions dari ${orderId} berhasil ditemukan`,
        data: results,
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      message: `Data ${orderId} Tidak Ditemukan`,
    });
    response.code(404);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam mengambil data orders',
    });
    response.code(500);
    return response;
  }
};

const addTransaction = async (request, h) => {
  try {
    const {
      cartId,
      paymentId,
      quantity,
      total,
    } = request.payload;
    const hargaTotal = quantity * total;
    const query = 'INSERT INTO orders (cart_id, payment_id, quantity, total) VALUES (?, ?, ?, ?)';
    const escapedValues = [cartId, paymentId, quantity, hargaTotal];

    const {
      results,
    } = await db.query(query, escapedValues);

    const response = h.response({
      message: 'Data transaksi berhasil ditambahkan',
      data: results[0],
    });
    response.code(201); // HTTP 201 Created
    return response;
  } catch (error) {
    console.error('Error adding data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam menambahkan data transaksi',
    });
    response.code(500);
    return response;
  }
};

const updateTransaction = async (request, h) => {
  try {
    const {
      orderId,
    } = request.params;
    const {
      quantity,
      total,
    } = request.payload;

    const query = 'UPDATE orders SET quantity = ?, total = quantity * ? WHERE id = ?';
    const escapedValues = [quantity, total, orderId];

    const {
      results,
    } = await db.query(query, escapedValues);

    if (results.affectedRows > 0) {
      const response = h.response({
        message: `Data transaksi dengan ID ${orderId} berhasil diperbarui`,
        data: results[0],
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      message: `Data transaksi dengan ID ${orderId} tidak ditemukan`,
    });
    response.code(404);
    return response;
  } catch (error) {
    console.error('Error updating data:', error);
    const response = h.response({
      message: 'Terjadi kesalahan dalam memperbarui data transaksi',
    });
    response.code(500);
    return response;
  }
};


const deleteTransaction = async (request, h) => {
  try {
    const {
      participantId,
      orderId
    } = request.params;

    const deleteQuery = 'DELETE FROM orders WHERE participant_id = ? AND id = ? ';
    const deleteValues = [participantId, orderId];

    const {
      results,
    } = await db.query(deleteQuery, deleteValues);

    if (results.affectedRows > 0) {
      return h.response({
        message: 'Data Transakassi successfully deleted',
      }).code(200);
    }
    return h.response({
      message: 'Data Transaksis gagal di hapus',
    }).code(404);
  } catch (error) {
    console.error('Error deleting data:', error);
    return h.response({
      message: 'Terjadi kesalahan dalam menghapus data transaksi',
    }).code(500);
  }
};

module.exports = {
  getAllCart,
  getCartById,
  addCart,
  updateCart,
  deleteCart,
  getAllTransactions,
  getTransactionById,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};