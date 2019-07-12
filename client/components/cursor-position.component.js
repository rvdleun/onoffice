/*
    This component tracks the cursor position and updates the position of the entity accordingly
 */
AFRAME.registerSystem('cursor-position', {
    schema: {
        cursor: { type: 'selector', default: '#cursor' }
    },

    streamId: '',

    init: function() {
        setTimeout(() => {
            this.el.systems['socket'].on('cursor-position', (data) => {
                if (this.streamId !== data.streamId) {
                    this.streamId = data.streamId;

                    if (data.streamId === false) {
                        this.data.cursor.setAttribute('visible', 'false');
                        return;
                    }

                    const screen = document.querySelector('#screen-' + data.streamId);
                    if (!screen) {
                        return;
                    }

                    this.data.cursor.setAttribute('visible', 'true');
                    screen.appendChild(cursor);
                }

                const x = data.x;
                const y = data.y;
                const posX = -.5 + (1 * x) + .01;
                const posY = .5 - (1 * y) - .015;
                this.data.cursor.setAttribute('position', `${posX} ${posY} .001`);
            });
        });
    }
});
