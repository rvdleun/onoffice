AFRAME.registerComponent('sky', {
    socket: null,

    init: function() {
        const socket = this.el.sceneEl.systems['socket'];
        socket.on('sky', (image) => {
            this.el.setAttribute('src', image);
        });

        socket.emit('get-sky');
    },
});