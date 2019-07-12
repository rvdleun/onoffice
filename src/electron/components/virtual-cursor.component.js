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

let watchInterval;
module.exports.watch = function(socket) {
    let prevX = -1;
    let prevY = -1;

    socket.on('watch-cursor-position', () => {
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
                        socket.emit('cursor-position', {streamId: false});
                        return;
                    }

                    const posX = (x - display.display.bounds.x) / display.display.bounds.width;
                    const posY = (y - display.display.bounds.y) / display.display.bounds.height;

                    socket.emit('cursor-position', {streamId: display.streamId, x: posX, y: posY});
                }
            }
        }, 50);
    });

    socket.on('stop-streaming', () => {
        this.displays.forEach((display) => display.streamId = '');

        clearInterval(watchInterval);
    });
};
