'use strict';
const Hapi = require('hapi');
const inert = require('inert');


const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

/*
 * server.register is a function for registering hapi plugins that simplify our work.
 *
 * There are two ways of doing so.
 */
// server.register(inert, function(err) {
//     if (err) {
//         throw err;
//     }
//
//     server.route({
//         method: 'GET',
//         path: '/static',
//         handler: function (request, reply) {
//             reply.file('./index.html');
//         }
//     });
// });

//
server.register(inert, function(err) {
    if (err) {
        throw err;
    }
});

server.route({
    method: 'GET',
    path: '/static',
    handler: function (request, reply) {
        reply.file('./index.html');
    }
});
//

server.start(function(err) {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});