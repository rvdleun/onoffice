/*
    This component will allow the user to move and resize the screen
 */
AFRAME.registerSystem('manipulate-source', {
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

        this.el.sceneEl.systems['socket'].on('center-screen', (data) => this.center(data) );
        this.el.sceneEl.systems['socket'].on('source-scale', (data) => this.setScale(data) );
    },

    center: function(data, force) {
        const { streamId } = data;
        if (streamId !== this.data.streamId && !force) {
            return;
        }

        const activeCamera = this.el.sceneEl.camera.el;
        const position = activeCamera.object3D.getWorldPosition(new THREE.Vector3());
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
