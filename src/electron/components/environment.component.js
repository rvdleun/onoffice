'use strict';

const storage = require('electron-json-storage');

let sky = require('./environment/default-image');

storage.get('sky', (error, data) => {
    if (error) {
        cb({default: true, sky});
        return;
    }

    if (data.sky) {
        sky = data.sky;
    }
});

module.exports.init = function(global) {
    global.revertSky = function(cb) {
        storage.remove('sky', () => {
            sky = require('./environment/default-image');
            cb();
        });
    };

    global.getSky = function(cb) {
        storage.get('sky', (error, data) => {
            if (error) {
                cb({default: true, sky});
                return;
            }

            if (data.sky) {
                cb({default: false, sky: data.sky});
                return;
            }

            cb({default: true, sky});
        });
    };

    global.setSky = function(newSky) {
        sky = newSky;

        storage.set('sky', { sky }, (error) => {
            if (error) {
                console.error('Error while storing sky', error);
            }
        });
    }
};

module.exports.setupSocket = function(socket) {
    ['center-screen', 'source-scale', 'source-select'].forEach((message) => {
        socket.on(message, (data) => {
            socket.broadcast.emit(message, data);
        });
    });

    socket.on('get-sky', () => {
        socket.emit('sky', sky);
    });

    socket.on('setup-environment', (scale) => {
        setTimeout(() => {
            socket.broadcast.emit('center-screen');
            socket.broadcast.emit('source-scale', scale);
        }, 500);
    });
};
