AFRAME.registerSystem('manipulate-source', {
    touchStartData: null,
    controls: null,
    dragging: false,
    target: null,

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

    setTarget: function(target) {
        this.target = target;

        if(!target) {
            this.touchStartData = null;
        }
    },

    setDragging: function(dragging) {
        this.dragging = dragging;
    },

    onAxisMove: function(event) {
        if(!this.target) {
            return;
        }

        const axis = event.detail.axis;
        if(axis[0] === 0 && axis[1] === 0) {
            console.log('This was no thang');
            return;
        }

        if(this.touchStartData) {
            const startAxisZ = this.touchStartData.startAxis[1];
            const axisZ = axis[1];
            const changeZ = startAxisZ - axisZ;
            const newZ = Math.min(-1, this.touchStartData.startZ - changeZ);

            this.target.querySelector('a-plane').setAttribute('position', `0 1.6 ${newZ}`);
            console.log(startAxisZ, axisZ, changeZ);
        } else {
            this.touchStartData = {
                startAxis: [axis[0], axis[1]],
                startZ: this.target.querySelector('a-plane').getAttribute('position').z
            };
            console.log(event, event.detail.axis);
        }
    },

    onTouchEnd: function() {
        console.log('Cleaning up');
        this.touchStartData = null;
    }
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
