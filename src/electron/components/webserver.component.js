const express = require('express');
const webApp = express();
const webServer = require('http').Server(webApp);
const storage = require('electron-json-storage');

let onSignal;
let pin = '';
let webServerHandler;

webApp.use(express.urlencoded());
webApp.use(express.json());
webApp.use(express.static(__dirname + '/../client'));

webApp.post('/signal', (request, response) => {
    global.signalResponses.push(response);
    onSignal(request.body);
});

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
        }
    };
};
