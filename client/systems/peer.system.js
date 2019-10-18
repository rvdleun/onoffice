AFRAME.registerSystem('peer', {
    onAddStreamFunc: null,

    connect: function() {
        console.log(this.onAddStreamFunc);
        const peer = new SimplePeer({ initiator: true, streams: [] });

        peer.on('connect', () => {
            console.log('Got a connection, yo');
        });

        peer.on('data', (data) => {
            console.log(peer._pc);
            console.log('Data', data.toString());
        });

        peer.on('signal', async (signal) => {
            const response = await fetch('/signal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signal),
            });

            const returnSignal = await response.json();
            peer.signal(returnSignal);
        });

        peer.on('stream', (stream) => {
            console.log('Got a stream');
            this.onAddStreamFunc(stream);
        });
    }
});
