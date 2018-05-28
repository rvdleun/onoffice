AFRAME.registerSystem('cursor-position', {
    streamId: '',

    init: function() {
        setTimeout(() => {
            let cursor;

            this.el.systems['socket'].on('cursor-position', (data) => {
                if(!cursor) {
                    cursor = document.querySelector('#cursor');
                }

                if (this.streamId !== data.streamId) {
                    console.log('--->', this.streamId, data.streamId, ' <---');
                    const screen = document.querySelector('#screen-' + data.streamId);
                    if (!screen) {
                        return;
                    }

                    console.log('Appending cursor to display');

                    screen.appendChild(cursor);
                    this.streamId = data.streamId;
                }

                const x = data.x;
                const y = data.y;
                const posX = -.5 + (1 * x);
                const posY = .5 - (1 * y);
                cursor.setAttribute('position', `${posX} ${posY} .001`);
            });
        }, 50);
    }
});
