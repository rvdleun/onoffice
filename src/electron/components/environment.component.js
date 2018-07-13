'use strict';

const storage = require('electron-json-storage');

let sky = require('./environment/default-image');

module.exports.init = function(global) {
    global.getSky = function(cb) {
        storage.get('sky', (error, data) => {
            if (error) {
                cb(sky);
                return;
            }

            if (data.sky) {
                sky = data.sky;
            }

            cb(sky);
        });
    };

    global.setSky = function(newSky) {
        sky = newSky;

        storage.set('sky', { sky }, (error) => {
            console.log(error);
        });
    }
}

module.exports.setupSocket = function(socket) {
    socket.on('get-sky', () => {
        socket.emit('sky', sky);
    });
};
