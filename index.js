'use strict';

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const db = require('./db');

const init = async () => {

    await db.setup();

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    await server.register(Vision);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        layout: true,
        layoutPath: 'templates/layout',
        path: 'templates',
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: async (request, h) => {
          const title = "Hello Man";
          let users = (await db.User.findAll()).map( user => user.dataValues );
          console.log("users", users);
          return h.view('users', { title, users })
        }
    });

    server.route({
        method: 'GET',
        path: '/users.json',
        handler: async (request, h) => {
          const users = await db.User.findAll();
          return users;
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
