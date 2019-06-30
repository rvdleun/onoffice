/*
    This component retrieves and displays the panoramic image
 */
AFRAME.registerComponent('sky', {
    socket: null,

    init: function() {
        const socket = this.el.sceneEl.systems['socket'];
        socket.on('sky', (sky) => {
            this.el.setAttribute('src', sky);
        });

        socket.emit('get-sky');
    },
});
