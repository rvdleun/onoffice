/*
    This system takes care of all the communication required to get WebRTC setup
 */
AFRAME.registerSystem('webrtc', {
    pc: null,
    onAddStreamFunc: null,

    setup: function() {
        const peer = new Peer(null, {
            host: window.location.hostname,
            port: 24242,
            path: 'peerjs'
        });

        peer.on('open', (id) => {
            peer.on('call', (mediaConnection) => {
                mediaConnection.on('stream', (stream) => {
                    this.onAddStreamFunc({stream});
                });

                mediaConnection.answer();
            });
        });

        peer.on('error', (error) => {
            console.error('Peer error', error);
        });
    },
});
