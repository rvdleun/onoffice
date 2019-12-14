/*
    This component tracks the cursor position and updates the position of the entity accordingly
 */

import * as AFRAME from 'aframe';

AFRAME.registerSystem('cursor-position', {
    cursor: null,
    streamId: null,

    init: function() {
        setTimeout(() => {
            this.el.systems['peer'].on('cursor-position', (data) => {
                if (this.streamId === null || this.streamId !== data.streamId) {
                    this.streamId = data.streamId;

                    if (this.cursor) {
                        this.cursor.parentNode.removeChild(this.cursor);
                        this.cursor = null;
                    }

                    if (data.streamId === false) {
                        return;
                    }

                    const screen = document.querySelector('#screen-' + data.streamId);
                    if (!screen) {
                        this.streamId = null;
                        return;
                    }

                    this.createCursor();
                    screen.appendChild(this.cursor);
                }

                if (!this.cursor) {
                    return;
                }

                const x = data.x;
                const y = data.y;
                const posX = -.5 + (1 * x) + .01;
                const posY = .5 - (1 * y) - .015;
                this.cursor.setAttribute('position', `${posX} ${posY} .001`);
            });
        });
    },

    createCursor: function() {
        // <a-plane id="cursor" src="#cursorImg" color="#ff3c4b" position="-.5 0 .001" material="shader: flat; opacity: .5; transparent: true" scale=".02 .03 .01"></a-plane>
        const cursor = document.createElement('a-plane');
        cursor.setAttribute('id', 'cursir');
        cursor.setAttribute('src', '#cursorImg');
        cursor.setAttribute('color', '#ff3c4b');
        cursor.setAttribute('material', 'shader: flat; opacity: .5; transparent: true');
        cursor.setAttribute('scale', '.02 .03 .01');

        this.cursor = cursor;
    }
});
