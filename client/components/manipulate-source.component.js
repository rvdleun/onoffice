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

        this.el.sceneEl.systems['peer'].on('center-screen', (data) => this.center(data) );
        this.el.sceneEl.systems['peer'].on('source-scale', (data) => this.setScale(data) );

        this.el.addEventListener('mouseup', () => {
            if (!this.moving) {
                return;
            }

            THREE.SceneUtils.detach(this.el.parentElement.object3D, this.controller.object3D, this.el.sceneEl.object3D);
            this.moving = false;
        });

        this.el.addEventListener('mousedown', (e) => {
            if (this.moving) {
                return;
            }

            this.controller = e.detail.cursorEl;
            this.moving = true;
            THREE.SceneUtils.attach(this.el.parentElement.object3D, this.el.sceneEl.object3D, this.controller.object3D);
        });
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

/**
 * @author alteredq / http://alteredqualia.com/
 */

THREE.SceneUtils = {

    createMultiMaterialObject: function ( geometry, materials ) {

        var group = new THREE.Group();

        for ( var i = 0, l = materials.length; i < l; i ++ ) {

            group.add( new THREE.Mesh( geometry, materials[ i ] ) );

        }

        return group;

    },

    detach: function ( child, parent, scene ) {

        child.applyMatrix( parent.matrixWorld );
        parent.remove( child );
        scene.add( child );

    },

    attach: function ( child, scene, parent ) {

        child.applyMatrix( new THREE.Matrix4().getInverse( parent.matrixWorld ) );

        scene.remove( child );
        parent.add( child );

    }

};
