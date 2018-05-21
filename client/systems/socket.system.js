AFRAME.registerSystem('socket', {
    socket: null,

    init: function() {
        this.socket = io();
    },

    emit: function(event, data) {
        this.socket.emit(event, data);
    },

    on: function(event, func) {
        this.socket.on(event, func);
    }
});