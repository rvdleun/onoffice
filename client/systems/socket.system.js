AFRAME.registerSystem('socket', {
    socket: null,

    init: function() {
        this.socket = io();
        this.on('disconnect', this.onDisconnect.bind(this));
    },

    emit: function(event, data) {
        this.socket.emit(event, data);
    },

    on: function(event, func) {
        this.socket.on(event, func);
    },

    onDisconnect: function() {
        console.log('Disconnected!!!');
    },
});