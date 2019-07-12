const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const storage = require('electron-json-storage');

webApp.use(express.static(__dirname + '/../client'));

webApp.get('/manifest.json', (req, res) => {
    const manifest = {
        "short_name": "On/Office",
        "name": "On/Office",
        "icon": "icon.png",
        "start_url": "http://" + global.IP + ':24242'
    };

    res.send(JSON.stringify(manifest));
});

webApp.get('/check-virtual-office-availability', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send('Available')
});

let global = null;
let connections = {};
let sockets = [];

let host = null;
let client = null;

let webServerHandler;
let pin = '';

let sessionId = null;

function checkHostClient() {
    console.log('Checking if host and client are connected', !!host, !!client);
    if (!host || !client) {
        return;
    }

    host.socket.emit('start');
}

function initializeSocket() {
    const io = require('socket.io')(webServer);

    io.on('connect', (socket) => {
        require('./environment.component').setupSocket(socket);

        connections[socket.id] = { properties: { approved: false }, socket };
        sockets.push(socket);

        socket.on('host', (id) => {
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

            console.log('Client signed in!');
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
}

module.exports.init = function(global) {
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
        pin = newPin;

        storage.set('pin', { pin }, (error) => {
            if (error) {
                console.error('Error while storing pin', error);
            }
        });
    };

    global.setWebServerActive = function(active) {
        if (active) {
            sessionId = '12345';
            global.sessionId = sessionId;
            initializeSocket();
            webServerHandler = webServer.listen(24242);
        } else {
            for(let id in connections) {
                const connection = connections[id];
                connection.socket.disconnect();
            }

            client = null;
            host = null;
            sessionId = null;
            global.sessionId = null;
            webServerHandler.close();
        }
    };
};
