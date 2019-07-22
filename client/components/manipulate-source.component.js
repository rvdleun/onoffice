/*
    This component will allow the user to move and resize the screen
 */
AFRAME.registerSystem('manipulate-source', {
    controls: null,
    dragging: false,
    target: null,
    touchStartData: null,

    tick: function() {
        if(!this.controls) {
            this.controls = document.querySelector('#controls');

            if(this.controls) {
                this.controls.addEventListener('axismove', (event) => this.onAxisMove(event));
                this.controls.addEventListener('touchend', (event) => this.onTouchEnd(event));
            }
        }

        if(this.target && this.dragging) {
            const rot = this.controls.getAttribute('rotation');
            this.target.setAttribute('rotation', `0 ${rot.y} 0`);
        }
    },

    onAxisMove: function(event) {
        if(!this.target) {
            return;
        }

        const axis = event.detail.axis;
        if(axis[0] === 0 && axis[1] === 0) {
            return;
        }

        if(this.touchStartData) {
            const startAxisZ = this.touchStartData.startAxis[1];
            const axisZ = axis[1];
            const changeZ = startAxisZ - axisZ;
            const newZ = Math.min(-.5, this.touchStartData.startZ - changeZ);

            this.target.querySelector('a-plane').setAttribute('position', `0 1.6 ${newZ}`);
        } else {
            this.touchStartData = {
                startAxis: [axis[0], axis[1]],
                startZ: this.target.querySelector('a-plane').getAttribute('position').z
            };
        }
    },

    onTouchEnd: function() {
        this.touchStartData = null;
    },

    setTarget: function(target) {
        this.target = target;

        if(!target) {
            this.touchStartData = null;
        }
    },

    setDragging: function(dragging) {
        this.dragging = dragging;
    },

    centerAllScreens: function() {
        const sources = document.querySelectorAll('[manipulate-source]');
        for(let i = 0; i <sources.length; i++) {
            const source = sources[i];
            source.components['manipulate-source'].center({}, true);
        }
    },
});

AFRAME.registerComponent('manipulate-source', {
    schema: {
        streamId: { type: 'string' },
    },

    initialScale: null,

    init: function() {
        const initialScale = this.el.getAttribute('scale');
        this.initialScale = {
            x: initialScale.x,
            y: initialScale.y,
            z: initialScale.z,
        };

        this.el.addEventListener('mouseenter', () => {
            this.system.setTarget(this.el.parentElement);
        });

        this.el.addEventListener('mouseleave', () => {
            this.system.setTarget();
        });

        this.el.addEventListener('mousedown', () => {
            this.system.setDragging(true);
        });

        this.el.addEventListener('mouseup', () => {
            this.system.setDragging(false);
        });

        this.el.sceneEl.systems['socket'].on('center-screen', (data) => this.center(data) );
        this.el.sceneEl.systems['socket'].on('source-scale', (data) => this.setScale(data) );
    },

    center: function(data, force) {
        const { streamId } = data;
        if (streamId !== this.data.streamId && !force) {
            return;
        }

        const activeCamera = this.el.sceneEl.camera.el;
        const position = activeCamera.getAttribute('position');
        const rotation = activeCamera.getAttribute('rotation');

        this.el.parentElement.setAttribute('animation__position', `property: position; to: ${position.x} ${position.y} ${position.z}; dur: 500; easing: linear`);
        this.el.parentElement.setAttribute('animation__rotation', `property: rotation; to: ${rotation.x} ${rotation.y} 0; dur: 500; easing: linear`);
    },

    setScale: function(data) {
        const { scale, streamId } = data;
        if (streamId !== this.data.streamId) {
            return;
        }

        this.el.setAttribute('scale', `${this.initialScale.x * scale} ${this.initialScale.y * scale} ${this.initialScale.z * scale}`);
    }
});
