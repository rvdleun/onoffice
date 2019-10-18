const Electron = require('electron');

const displays = Electron.screen.getAllDisplays().map((display) => {
    return { streamId: '', display };
});

module.exports.registerDisplay = function(displayId, streamId) {
    const display = displays.find((display) => { return displayId == 'screen:0:0' ||  'screen:' + display.display.id === displayId });
    if (display) {
        display.streamId = streamId;
    } else {
        console.error('Could not find display');
    }
};

module.exports.init = function(global) {
    let watchInterval;
    global.watchVirtualCursor = function() {
        let prevX = -1;
        let prevY = -1;

        const webserverComponent = require('./webserver.component');
        webserverComponent.onPeerEvent('watch-cursor-position', () => {
            watchInterval = setInterval(() => {
                const mouse = Electron.screen.getCursorScreenPoint();
                if (prevX !== mouse.x || prevY !== mouse.y) {
                    const x = mouse.x;
                    const y = mouse.y;

                    prevX = x;
                    prevY = y;

                    const display = displays.find((display) =>
                        x >= display.display.bounds.x &&
                        x <= display.display.bounds.x + display.display.bounds.width &&
                        y >= display.display.bounds.y &&
                        y <= display.display.bounds.y + display.display.bounds.height);

                    if (display) {
                        if (display.streamId === '') {
                            webserverComponent.sendPeerMessage('cursor-position', {streamId: false});
                            return;
                        }

                        const posX = (x - display.display.bounds.x) / display.display.bounds.width;
                        const posY = (y - display.display.bounds.y) / display.display.bounds.height;

                        webserverComponent.sendPeerMessage('cursor-position', {streamId: display.streamId, x: posX, y: posY});
                    }
                }
            }, 50);
        });

        webserverComponent.onPeerEvent('stop-streaming', () => {
            displays.forEach((display) => display.streamId = '');

            clearInterval(watchInterval);
        });
    };
};
