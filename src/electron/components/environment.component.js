'use strict';

const storage = require('electron-json-storage');

let sky = require('./environment/default-image');

storage.get('sky', (error, data) => {
    if (error || !data || !data.sky) {
        return;
    }

    sky = data.sky;
});

module.exports.init = function(global) {
    global.revertSky = function(cb) {
        storage.remove('sky', () => {
            sky = require('./environment/default-image');
            cb();
        });
    };

    global.getSky = function(cb) {
        storage.get('sky', (error, data) => {
            if (error) {
                cb({default: true, sky});
                return;
            }

            if (data.sky) {
                cb({default: false, sky: data.sky});
                return;
            }

            cb({default: true, sky});
        });
    };

    global.setSky = function(newSky) {
        sky = newSky;

        storage.set('sky', { sky }, (error) => {
            if (error) {
                console.error('Error while storing sky', error);
            }
        });
    };

    require('./webserver.component').webApp.get('/sky', (req, res) => {
        const base64Data = sky.replace(/^data:image\/png;base64,/, '');
        const img = Buffer.from(base64Data, 'base64');

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    });
};
