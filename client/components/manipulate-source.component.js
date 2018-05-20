AFRAME.registerSystem('manipulate-source', {
    controls: null,
    dragging: false,
    target: null,

    tick: function() {
        if(!this.controls) {
            this.controls = document.querySelector('#controls');
        }

        if(this.target && this.dragging) {
            const rot = this.controls.getAttribute('rotation');
            this.target.setAttribute('rotation', `0 ${rot.y} 0`);
        }
    },

    setTarget: function(target) {
        this.target = target;
    },

    setDragging: function(dragging) {
        this.dragging = dragging;
    },
});

AFRAME.registerComponent('manipulate-source', {
    init: function() {
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
    }
});
