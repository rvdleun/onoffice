AFRAME.registerSystem('source', {
    assets: null,
    sources: null,

    id: 0,

    init: function() {
        window.setTimeout(() => {
            this.el.systems['webrtc'].onAddStreamFunc = this.onAddStream.bind(this);
        });
    },

    onAddStream: function(event) {
        if(!this.assets) {
            this.assets = document.querySelector('a-assets');
        }

        if(!this.sources) {
            this.sources = document.querySelector('#sources');
        }

        const videoId = `video-${this.id}`;
        this.id++;

        const videoEl = document.createElement('video');
        videoEl.setAttribute('autoplay', '');
        videoEl.setAttribute('id', videoId);
        videoEl.setAttribute('muted', '');

        videoEl.src = window.URL.createObjectURL(event.stream)
        videoEl.onloadedmetadata = () => {
            this.assets.appendChild(videoEl);

            const width = videoEl.videoWidth / 2;
            const height = videoEl.videoHeight / 2;

            const sizeX = width / height;
            const sizeY = 1;

            const screen = document.createElement('a-plane');
            screen.setAttribute('id', `screen-${event.stream.id}`);
            screen.setAttribute('manipulate-source', '');
            screen.setAttribute('position', '0 1.6 -1');
            screen.setAttribute('material', 'shader: flat');
            screen.setAttribute('scale', `${sizeX} ${sizeY} 1`);

            if (location.search && location.search.indexOf('no-source') >= 0) {
                screen.setAttribute('color', 'lightgreen');
            } else {
                screen.setAttribute('src', `#${videoId}`);
            }

            const entity = document.createElement('a-entity');
            entity.appendChild(screen);
            this.sources.appendChild(entity);

            // <!--a-plane manipulate-source id="screen" position="0 1.6 -1" scale="1 1 1" material="shader: flat" src="#remote">
        };
    }
});

AFRAME.registerComponent('source', {
    schema: {
        videoSrc: { type: 'string' }
    },

    init: function() {

    }
});
