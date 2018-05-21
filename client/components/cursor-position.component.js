AFRAME.registerComponent('cursor-position', {
   init: function() {
        this.el.sceneEl.systems['socket'].on('cursor-position', (position) => {
           const x = position.x;
           const y = position.y;
           const posX = -.5 + (1 * x);
           const posY = .5 - (1 * y);
           this.el.setAttribute('position', `${posX} ${posY} .001`);
       });
   }
});