const Hapi = require('@hapi/hapi');
const routes = require('./routes');

let server;

const init = async () => {
  server = Hapi.server({
    port: 5002,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
