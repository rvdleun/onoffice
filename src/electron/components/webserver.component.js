const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const storage = require('electron-json-storage');

let onClose;
let onSignal;
let sendPeerMessageFunc;
let peerListeners = [];
let pin = '';
let webServerHandler;

webApp.use(express.json());
webApp.use(express.static(__dirname + '/../client'));

webApp.post('/signal', (request, response) => {
    global.signalResponses.push(response);
    onSignal(request.body);
});

module.exports.onPeerEvent = function(event, cb) {
    let listener = peerListeners.find((search) => search.event === event);
    if (!listener) {
        listener = {
            event,
            callbacks: [],
        };

        peerListeners.push(listener);
    }

    listener.callbacks.push(cb);
};

module.exports.sendPeerMessage = function(event, data) {
    sendPeerMessageFunc(event, data);
};

module.exports.init = function(electronGlobal) {
    global = electronGlobal;

    global.signalResponses = [];

    global.getPinFromStorage = function(cb) {
        storage.get('pin', (error, data) => {
            if (error) {
                return;
            }

            pin = data.pin;
            cb(data.pin);
        });
    };

    global.onPeerMessage = function(message) {
        const listener = peerListeners.find((search) => search.event === message.event);
        if (!listener) {
            return;
        }

        listener.callbacks.forEach((cb) => {
            cb(message.data);
        });
    };

    global.onSendPeerMessageFunc = function(cb) {
        sendPeerMessageFunc = cb;
    };

    global.onClose = function(cb) {
        onClose = cb;
    };

    global.onSignal = function(cb) {
        onSignal = cb;
    };

    global.sendSignal = function(signal) {
        const response = global.signalResponses.pop();
        if (!response) {
            return;
        }

        response.send(signal);
    };

    global.setPin = function(newPin) {
        pin = newPin;

        storage.set('pin', { pin }, (error) => {
            if (error) {
                console.error('Error while storing pin', error);
            }
        });
    };

    global.setWebServerActive = function(active) {
        if (active) {
            webServerHandler = webServer.listen(24242);
        } else {
            webServerHandler.close();
            onClose();
        }
    };
};

module.exports.webApp = webApp;
