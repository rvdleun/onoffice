AFRAME.registerSystem('webrtc', {
    pc: null,

    init: function() {
        this.pc = new RTCPeerConnection({  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] });
        window.setTimeout(() => {
            this.connect();
        }, 50);
    },

    connect: function() {
        const socket = this.el.systems['socket'];
        socket.on('webrtc-message', (message) => {
            if(message.sdp) {
                this.pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
                    if(message.sdp.type === 'offer') {
                        this.pc.createAnswer((description) => {
                            this.pc.setLocalDescription(description, () => {
                                socket.emit('webrtc-message', {'sdp': description});
                            }, () => {
                                console.log('set description error')
                            });
                        }, (error) => {
                            console.log(error);
                        });
                    }
                });
            } else if(message.ice) {
                this.pc.addIceCandidate(new RTCIceCandidate(message.ice));
            }
        });

        this.pc.onaddstream = (event) => {
            const video = document.createElement('video');
            video.src = window.URL.createObjectURL(event.stream)
            video.onloadedmetadata = () => {
                const width = video.videoWidth / 2;
                const height = video.videoHeight / 2;

                const videoEl = document.querySelector('#remote');
                videoEl.src = window.URL.createObjectURL(event.stream);
                videoEl.play();

                const screen = document.querySelector('#screen');
                const sizeX = width / height;
                const sizeY = 1;
                screen.setAttribute('scale', `${sizeX} ${sizeY} 1`);
            };
        };

        socket.emit('client');
    }
});
