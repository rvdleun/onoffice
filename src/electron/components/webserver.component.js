const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const io = require('socket.io')(webServer);

webServer.listen(24242);

webApp.use(express.static(__dirname + '/../client'));

let host = null;
let client = null;

function checkHostClient() {
    if (!host || !client) {
        return;
    }

    console.log('Host and client are available. Initiate connection.');

    host.socket.emit('start');
}

io.on('connect', (socket) => {
    console.log('User connected');

    socket.on('host', (signal) => {
        console.log('Client signed in!');
        host = {signal, socket};
        checkHostClient();
    });

    socket.on('client', () => {
        client = {socket};
        checkHostClient();
        console.log('Client signed in!');
    });

    socket.on('cursor-position', (message) => {
        socket.broadcast.emit('cursor-position', message);
    });

    socket.on('webrtc-message', (message) => {
        socket.broadcast.emit('webrtc-message', message);
    });

    const Robot = require('robotjs');
    let prevX = -1;
    let prevY = -1;

    setInterval(() => {
        const mouse = Robot.getMousePos();
        if (prevX !== mouse.x || prevY !== mouse.y) {
            prevX = mouse.x;
            prevY = mouse.y;

            socket.emit('cursor-position', {x: mouse.x / 1440, y: mouse.y / 900});
        }
    }, 50);
});
