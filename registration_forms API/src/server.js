const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const db = require('./database')

let server

const init = async () => {
  server = Hapi.server({
    port: 5002,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  server.route(routes)

  db.connect()

  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

process.on('SIGINT', async () => {
  console.log('Stopping server...')
  await server.stop({ timeout: 10000 })
  db.end()
  console.log('Server stopped')
  process.exit(0)
})

init()
