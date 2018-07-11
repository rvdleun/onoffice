const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const io = require('socket.io')(webServer);

webApp.use(express.static(__dirname + '/../client'));

let connections = {};

let host = null;
let client = null;

let webServerHandler;
let pin = '';

function checkHostClient() {
    if (!host || !client) {
        return;
    }

    console.log('Host and client are available. Initiate connection.');

    host.socket.emit('start');
}

io.on('connect', (socket) => {
    connections[socket.id] = { properties: { approved: false }, socket };

    socket.on('host', (signal) => {
        console.log('Host signed in!');
        host = {signal, socket};
        checkHostClient();
    });

    socket.on('client', () => {
        console.log('======> ', pin, !connections[socket.id].properties, ' <======');
        if(pin && !connections[socket.id].properties.approved) {
            console.log('I need a pin');
            socket.emit('pin_required');
            return;
        }

        client = {socket};
        checkHostClient();
        console.log('Client signed in!');

        require('./virtual-cursor.component').watch(socket);
    });

    socket.on('cursor-position', (message) => {
        socket.broadcast.emit('cursor-position', message);
    });

    socket.on('webrtc-message', (message) => {
        socket.broadcast.emit('webrtc-message', message);
    });
});


module.exports = function(global) {
    global.setPin = function(newPin) {
        console.log('Setting pin to', newPin);
        pin = newPin;
    };

    global.setWebServerActive = function(active) {
        if (active) {
            webServerHandler = webServer.listen(24242);
        } else {
            webServerHandler.close();
        }
    }
};