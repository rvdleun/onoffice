const IP = require('ip');
const storage = require('electron-json-storage');

const STORAGE_KEY = 'url-redirect-token';

module.exports.init = function(global) {
    global.getRedirectData = function(cb) {
        storage.get(STORAGE_KEY, (error, data) => {
            const result = {
                ip: IP.address() + ':24242',
                token: data.token
            };
            console.log(result);
            cb(result);
        });
    };

    global.setRedirectToken = function(token) {
        storage.set(STORAGE_KEY, { token }, (error) => {
            console.log(error);
        });
    }

    global.clearRedirectToken = function() {
        storage.clear(STORAGE_KEY);
    }
};