const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const io = require('socket.io')(webServer);

webServer.listen(24242);

webApp.use(express.static(__dirname + '/../client'));

let host = null;
let client = null;

function checkHostClient() {
    console.log('Host', !!host);
    console.log('Client', !!client);
    console.log('---');

    if (!host || !client) {
        return;
    }

    host.socket.emit('start');
}

io.on('connect', (socket) => {
    console.log('User connected');

    socket.on('host', (signal) => {
        console.log('Host found!');
        host = {signal, socket};
        checkHostClient();
    });

    socket.on('client', (data) => {
        if (data) {
            host.socket.emit('clientSignal', data);
        } else {
            client = {socket};
            checkHostClient();
        }
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
