AFRAME.registerComponent('moveable', {
    controller: null,
    moving: false,

    init: function() {
        console.log('!initalized');
        this.el.addEventListener('mouseenter', () => {
            this.el.setAttribute('color', '#fdd');
            this.el.setAttribute('opacity', '1');
        });

        this.el.addEventListener('mouseleave', () => {
            this.el.setAttribute('color', '#fff');
            if(this.el.classList.contains('text')) {
                this.el.setAttribute('opacity', '0');
            }
        });

        this.el.addEventListener('mouseup', () => {
            if (!this.moving) {
                return;
            }

            THREE.SceneUtils.detach(this.el.parentElement.object3D, this.controller.object3D, this.el.sceneEl.object3D);
            this.moving = false;

            setTimeout(() => document.querySelector('a-scene').components.screenshot.capture('perspective'), 1500);
        });

        this.el.addEventListener('mousedown', (e) => {
            console.log('mousedown');
            if (this.moving) {
                return;
            }

            this.controller = e.detail.cursorEl;
            this.moving = true;
            THREE.SceneUtils.attach(this.el.parentElement.object3D, this.el.sceneEl.object3D, this.controller.object3D);
        });
    },
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
