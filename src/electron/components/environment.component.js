'use strict';

const storage = require('electron-json-storage');

let sky = require('./environment/default-image');

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
                cb({default: false, sky});
            }

            cb({default: true, sky});
        });
    };

    global.setSky = function(newSky) {
        sky = newSky;

        storage.set('sky', { sky }, (error) => {
            console.log(error);
        });
    }
};

module.exports.setupSocket = function(socket) {
    socket.on('center-screen', () => {
        socket.broadcast.emit('center-screen');
    });

    socket.on('get-sky', () => {
        socket.emit('sky', sky);
    });

    socket.on('source-scale', (scale) => {
        socket.broadcast.emit('source-scale', scale);
    });
};
