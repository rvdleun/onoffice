AFRAME.registerSystem('socket', {
    schema: {
        connectionLostText: {type: 'selector', default: '#connection-lost'}
    },

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
        this.el.systems['source'].hideAll();
        this.el.dispatchEvent(new Event('socket-disconnected'));
    },
});