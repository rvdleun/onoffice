/*
    This system connects to the socket.io server running on the desktop
 */
AFRAME.registerSystem('socket', {
    socket: null,

    init_old: function() {
        this.socket = io();
        this.on('disconnect', this.onDisconnect.bind(this));
        this.data.connectionLostText.setAttribute('visible', 'false');
    },

    emit: function(event, data) {
        // this.socket.emit(event, data);
    },

    on: function(event, func) {
        // this.socket.on(event, func);
    },

    onDisconnect: function() {
        this.el.systems['source'].hideAll();
        this.data.connectionLostText.setAttribute('visible', 'true');
        this.el.dispatchEvent(new Event('socket-disconnected'));
    },
});
