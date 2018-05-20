const socket = io();

const pc = new RTCPeerConnection({  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:global.stun.twilio.com:3478?transport=udp' }] });

pc.onaddstream = (event) => {
    alert('Got a stream!');
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

let cursor;
socket.on('cursor-position', (position) => {
    console.log('Position', position);
    if(!cursor) {
        cursor = document.querySelector('#cursor');
    }

    const x = position.x;
    const y = position.y;
    const posX = -.5 + (1 * x);
    const posY = .5 - (1 * y);
    cursor.setAttribute('position', `${posX} ${posY} .001`);
});

socket.on('message', (message) => {
    console.log(message);
    if(message.sdp) {
        pc.setRemoteDescription(new RTCSessionDescription(message.sdp), () => {
            if(message.sdp.type === 'offer') {
                pc.createAnswer((description) => {
                    pc.setLocalDescription(description, () => {
                        socket.emit('message', {'sdp': description});
                    }, () => {
                        console.log('set description error')
                    });
                }, (error) => {
                    console.log(error);
                });
            }
        });
    } else if(message.ice) {
        pc.addIceCandidate(new RTCIceCandidate(message.ice));
    }
});

socket.emit('client');