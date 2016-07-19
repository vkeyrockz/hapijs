'use strict';

const Hapi = require('hapi');
const Boom = require('boom');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});
const scheme = function (server, options) {

    return {
        authenticate: function (request, reply) {

            const req = request.raw.req;
            const authorization = req.headers.authorization;
            if (!authorization) {
                return reply(Boom.unauthorized(null, 'Custom'));
            }

            return reply.continue({ credentials: { user: 'john' } });
        }
    };
};

server.auth.scheme('custom', scheme);
server.auth.strategy('default', 'custom');
server.auth.default('default');

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply(request.auth.credentials.user);
    }
});


/*
 * Here one object has been passed to register 'good' plugin
 */
server.register({
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout']
        }
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }
});

server.start(function (err) {
    if (err) {
        throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
});