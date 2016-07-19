const Hapi = require('hapi');
const SocketIO = require('socket.io');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3000
});

const io = SocketIO.listen(server.listener);
io.sockets.on('connection', function(socket) {

    socket.emit({ msg: 'welcome' });
});