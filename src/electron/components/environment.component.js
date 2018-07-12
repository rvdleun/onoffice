'use strict';

let sky = require('./environment/default-image');

module.exports.init = function(global) {
    global.getSky = function(cb) {
        cb(sky);
    };
}

module.exports.setupSocket = function(socket) {
    socket.on('get-sky', () => {
        socket.emit('sky', sky);
    });
};
