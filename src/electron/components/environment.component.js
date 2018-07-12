'use strict';

module.exports = function(socket) {
    socket.on('get-sky', () => {
        const image = require('./environment/default-image');
        socket.emit('sky', image);
    });
};
