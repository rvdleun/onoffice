AFRAME.registerComponent('source-border', {
    schema: {
        streamId: { type: 'string' },
    },

    timeout: null,

    init: function() {
        this.el.parentElement.addEventListener('mouseenter', () => {
            clearTimeout(this.timeout);
            this.setVisible(true);
        });

        this.el.parentElement.addEventListener('mouseleave', () => {
            clearTimeout(this.timeout);
            this.setVisible(false);
        });

        this.el.sceneEl.systems['peer'].on('center-screen', (data) => this.highlight(data) );
        this.el.sceneEl.systems['peer'].on('source-scale', (data) => this.highlight(data) );
        this.el.sceneEl.systems['peer'].on('source-select', (data) => this.highlight(data) );
    },

    highlight: function(data) {
        if (data.streamId !== this.data.streamId) {
            return;
        }

        clearTimeout(this.timeout);

        this.setVisible(true);
        this.timeout = setTimeout(() => {
            this.setVisible(false);
        }, 1000);
    },

    setVisible: function(visible) {
        this.el.setAttribute('visible', visible);
    }
});
