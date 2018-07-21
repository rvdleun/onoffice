const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const io = require('socket.io')(webServer);
const storage = require('electron-json-storage');
const uniqid = require('uniqid');

webApp.use(express.static(__dirname + '/../client'));

let global = null;
let connections = {};

let host = null;
let client = null;

let webServerHandler;
let pin = '';

let sessionId = null;

function checkHostClient() {
    if (!host || !client) {
        return;
    }

    host.socket.emit('start');
}

io.on('connect', (socket) => {
    require('./environment.component').setupSocket(socket);

    connections[socket.id] = { properties: { approved: false }, socket };

    socket.on('host', (id) => {
        console.log('Host trying to connect with ', id);
        if (sessionId === id) {
            console.log('Host signed in!');
            host = {socket};
            checkHostClient();

            socket.emit('host_accepted');
        }
    });

    socket.on('client', (id) => {
        if (id && id !== sessionId) {
            socket.emit('session_expired', sessionId);
            return;
        }

        if(pin && !connections[socket.id].properties.approved) {
            socket.emit('pin_required');
            return;
        }

        socket.emit('client_accepted', sessionId);

        client = {socket};
        checkHostClient();

        require('./virtual-cursor.component').watch(socket);
    });

    socket.on('pin', (receivedPin) => {
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


module.exports = function(currentGlobal) {
    global = currentGlobal;

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
            sessionId = uniqid();
            global.sessionId = sessionId;
            webServerHandler = webServer.listen(24242);
        } else {
            sessionId = null;
            global.sessionId = null;
            webServerHandler.close();
        }
    };
};