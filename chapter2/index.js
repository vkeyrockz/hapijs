'use strict';
//Create a Hapi variable that will contain all the methods/functions of
// 'hapi' library
const Hapi = require('hapi');

//Create a new server object.
const server = new Hapi.Server();

//Configure server connection.
server.connection({
    host: 'localhost',
    port: 3000
});

/*
 * Here are the ways routes are defined in Hapi.js
 *
 * 1. You can directly pass an JSON object to server.route function.
 * 2. You can also pass an array of JSON objects which defines routes for server.route function
 */

//This is basic home route.
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route([
    //This route will open as "localhost:3000/happy"
    {
        method: 'GET',
        path: '/happy',
        handler: function (request, reply) {
            reply('Hello, I\'m Hapi.js\n!');
        }
    },
    //This is a bit different from previous one. Here route is a variable.
    //It will also give reply accordingly.
    //eg. "localhost:3000/Himank"
    //eg. "localhost:3000/Barve"
    //eg. "localhost:3000/Mayash"
    {
        method: 'GET',
        path: '/{name}',
        handler: function (request, reply) {
            reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
        }
    }
]);

server.start(function(err) {
    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});