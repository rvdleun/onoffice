const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const storage = require('electron-json-storage');
const uniqid = require('uniqid');

const signalResponses = [];
let onClose;
let onSignal;
let createPeerFunc;
let global;
let sendPeerMessageFunc;
let peerListeners = [];
let pin = '';
let webServerHandler;

webApp.use(express.json());
webApp.use(express.static(__dirname + '/../client'));

webApp.post('/connect', (request, response) => {
    const responseData = {
        result: '',
    };

    if (pin) {
        if (!request.body.pin) {
            responseData.result = 'pin-required';
        } else if(request.body.pin !== pin) {
            responseData.result = 'pin-incorrect';
        }
    }

    if (!responseData.result) {
        const sessionId = uniqid();
        responseData.result = 'success';
        responseData.sessionId = sessionId;
        signalResponses.push({ sessionId, responses: []});

        createPeerFunc(sessionId);
    }

    response.send(responseData);
});

webApp.post('/signal/:sessionId', (request, response) => {
    const sessionId = request.params.sessionId;
    const signalResponse = getSignalResponse(sessionId);

    if (!signalResponse) {
        return;
    }

    signalResponse.responses.push(response);
    onSignal(sessionId, request.body);
});

function getSignalResponse(sessionId) {
    return signalResponses.find((signalResponse) => signalResponse.sessionId === sessionId);
}

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

    global.getPinFromStorage = function(cb) {
        storage.get('pin', (error, data) => {
            if (error) {
                return;
            }

            pin = data.pin;
            cb(data.pin);
        });
    };

    global.onCreatePeerFunc = function(cb) {
        createPeerFunc = cb;
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

    global.sendSignal = function(sessionId, signal) {
        const signalResponse = getSignalResponse(sessionId);

        const response = signalResponse.responses.pop();
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
