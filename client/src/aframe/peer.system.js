import * as AFRAME from 'aframe';
import * as SimplePeer from 'simple-peer';

AFRAME.registerSystem('peer', {
    schema: {
        connectionLostText: {type: 'selector', default: '#connection-lost'}
    },

    onAddStreamFunc: null,

    listeners: [],

    init: function() {
        this.data.connectionLostText.setAttribute('visible', 'false');
    },

    connect: function(sessionId) {
        const peer = new SimplePeer({ initiator: true, streams: [] });

        peer._pc.onconnectionstatechange = () => {
            const state = peer._pc.connectionState;
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
            const response = await fetch(`http://localhost:24242/signal/${sessionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signal),
            });

            const returnSignal = await response.json();
            if (returnSignal.signal) {
                peer.signal(returnSignal.signal);
            }
        });

        peer.on('stream', (stream) => {
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

    removeListener: function(event, cb) {
        let listener = this.listeners.find((search) => search.event === event);
        if (!listener) {
            return;
        }

        listener.callbacks = listener.callbacks.filter((search) => search !== cb);
    },

    emit: function(event, data) {
        this.peer.send(JSON.stringify({event, data}));
    },

    onDisconnect: function() {
        this.el.systems['source'].hideAll();
        this.data.connectionLostText.setAttribute('visible', 'true');
        this.el.dispatchEvent(new Event('peer-disconnected'));
    },
});
