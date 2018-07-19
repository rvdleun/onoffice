const Electron = require('electron');
// const Robot = require('robot-js');
let prevX = -1;
let prevY = -1;

const displays = Electron.screen.getAllDisplays().map((display) => {
    return { streamId: '', display };
});

module.exports.registerDisplay = function(displayId, streamId) {
    console.log('Gonna map', streamId, ' to ', displayId, displays);

    const display = displays.find((display) => { console.log(display.display.id, displayId, ' <---'); return 'screen:' + display.display.id === displayId });
    if (display) {
        console.log('Display ', displayId, ' has been registered as ', streamId);
        display.streamId = streamId;
    } else {
        console.log('Could not find display');
    }
};

module.exports.watch = function(socket) {
    setInterval(() => {
        const mouse = Electron.screen.getCursorScreenPoint();
        console.log(mouse);
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

            if (display && display.streamId !== '') {
                const posX = (x - display.display.bounds.x) / display.display.bounds.width;
                const posY = (y - display.display.bounds.y) / display.display.bounds.height;

                socket.emit('cursor-position', {streamId: display.streamId, x: posX, y: posY});
            }
        }
    }, 50);
};
