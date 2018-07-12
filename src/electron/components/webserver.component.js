const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const io = require('socket.io')(webServer);
const storage = require('electron-json-storage');

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
        if(pin && !connections[socket.id].properties.approved) {
            socket.emit('pin_required');
            return;
        }

        socket.emit('client_accepted');

        client = {socket};
        checkHostClient();
        console.log('Client signed in!');

        require('./virtual-cursor.component').watch(socket);
    });

    socket.on('pin', (receivedPin) => {
        console.log('Gonna check pin', pin, receivedPin);
        if (pin === receivedPin) {
            connections[socket.id].properties.approved = true;
            socket.emit('pin_correct');
        } else {
            socket.emit('pin_incorrect');
        }
    });

    socket.on('cursor-position', (message) => {
        socket.broadcast.emit('cursor-position', message);
    });

    socket.on('webrtc-message', (message) => {
        socket.broadcast.emit('webrtc-message', message);
    });
});


module.exports = function(global) {
    global.getPinFromStorage = function(cb) {
        storage.get('pin', (error, data) => {
            if (error) {
                return;
            }

            pin = data.pin;
            cb(data.pin);
        });
    };

    global.setPin = function(newPin) {
        console.log('Setting pin to', newPin);
        pin = newPin;

        storage.set('pin', { pin }, (error) => {
            console.log(error);
        });
    };

    global.setWebServerActive = function(active) {
        if (active) {
            webServerHandler = webServer.listen(24242);
        } else {
            webServerHandler.close();
        }
    };
};