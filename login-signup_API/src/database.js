const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kompetisiku'
})

const db = {
  connect: () => connection.connect(),
  query: (queryString, escapedValues) =>
    new Promise((resolve, reject) => {
      connection.query(queryString, escapedValues, (error, results, fields) => {
        if (error) reject(error)
        resolve({ results, fields })
      })
    }),
  end: () => connection.end()
}

module.exports = db
