AFRAME.registerComponent('source-border', {
    schema: {
        streamId: { type: 'string' },
    },

    timeout: null,

    init: function() {
        this.el.sceneEl.systems['socket'].on('center-screen', (data) => this.highlight(data) );
        this.el.sceneEl.systems['socket'].on('source-scale', (data) => this.highlight(data) );
        this.el.sceneEl.systems['socket'].on('source-select', (data) => this.highlight(data) );
    },

    highlight: function(data) {
        if (data.streamId !== this.data.streamId) {
            return;
        }

        clearTimeout(this.timeout);

        this.el.setAttribute('visible', true);
        this.timeout = setTimeout(() => {
            this.el.setAttribute('visible', false);
        }, 1000);
    }
});
