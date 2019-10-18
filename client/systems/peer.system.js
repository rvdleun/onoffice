AFRAME.registerSystem('peer', {
    schema: {
        connectionLostText: {type: 'selector', default: '#connection-lost'}
    },

    onAddStreamFunc: null,

    listeners: [],

    init: function() {
        this.data.connectionLostText.setAttribute('visible', 'false');
    },

    connect: function() {
        console.log(this.onAddStreamFunc);
        const peer = new SimplePeer({ initiator: true, streams: [] });

        peer._pc.onconnectionstatechange = () => {
            const state = peer._pc.connectionState;
            console.log(state);
            if (state === 'disconnected' || state === 'closed') {
                this.onDisconnect();
            }
        };

        peer.on('close', () => {
            this.onDisconnect();
        });

        peer.on('data', (message) => {
            const json = JSON.parse(message);

            const listener = this.listeners.find((search) => search.event === json.event);

            if (!listener) {
                return;
            }

            listener.callbacks.forEach((cb) => cb(json.data));
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

        this.peer = peer;
    },

    on: function(event, cb) {
        let listener = this.listeners.find((search) => search.event === event);
        if (!listener) {
            listener = {
                event,
                callbacks: [],
            };

            this.listeners.push(listener);
        }

        listener.callbacks.push(cb);
    },

    emit: function(event, data) {
        this.peer.send(JSON.stringify({event, data}));
    },

    onDisconnect: function() {
        this.el.systems['source'].hideAll();
        this.data.connectionLostText.setAttribute('visible', 'true');
        this.el.dispatchEvent(new Event('socket-disconnected'));
    },
});
