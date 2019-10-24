const express = require('express');
const fs = require('fs');
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
let ssl;
let webServer;

const webApp = express();
webApp.use(express.json());
webApp.use(express.static(__dirname + '/../client'));
webApp.post('/connect', postConnect);
webApp.post('/signal/:sessionId', postSignal);

function postConnect(request, response) {
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
}

function postSignal(request, response) {
    const sessionId = request.params.sessionId;
    const signalResponse = getSignalResponse(sessionId);

    if (!signalResponse) {
        return;
    }

    signalResponse.responses.push(response);
    onSignal(sessionId, request.body);
}

function createServer() {
    if (ssl) {
        return require('https').Server({
            cert: fs.readFileSync(__dirname + '/webserver/server.cert'),
            key: fs.readFileSync(__dirname + '/webserver/server.key'),
        }, webApp)
    } else {
        return require('http').Server(webApp);
    }
}

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

    global.getSslFromStorage = function(cb) {
        storage.get('ssl', (error, data) => {
            if (error) {
                return;
            }

            if (data.ssl === undefined) {
                data.ssl = true;
            }

            ssl = data.ssl;
            cb(data.ssl);
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

    global.clearResponses = function(sessionId) {
        const signalResponse = getSignalResponse(sessionId);
        if (!signalResponse) {
            return;
        }

        while(signalResponse.responses.length > 0) {
            const response = signalResponse.responses.pop();
            response.send({});
        }
    };

    global.sendSignal = function(sessionId, signal) {
        const signalResponse = getSignalResponse(sessionId);

        const response = signalResponse.responses.pop();
        if (!response) {
            return;
        }

        response.send({ signal });
    };

    global.setPin = function(newPin) {
        pin = newPin;

        storage.set('pin', { pin }, (error) => {
            if (error) {
                console.error('Error while storing pin', error);
            }
        });
    };

    global.setSsl = function(newSsl) {
        ssl = newSsl;

        storage.set('ssl', { ssl }, (error) => {
            if (error) {
                console.error('Error while storing ssl', error);
            }
        });
    };

    global.setWebServerActive = function(active) {
        if (active) {
            if (webServer) {
                global.setWebServerActive(false);
            }

            webServer = createServer();
            webServer.listen(24242);
        } else {
            webServer.close();
            onClose();
        }
    };
};

module.exports.webApp = webApp;
