/*
    This component displays a source. (a source being a screen)
 */
AFRAME.registerSystem('source', {
    assets: null,
    sources: null,

    id: 0,

    init: function() {
        window.setTimeout(() => {
            this.el.systems['webrtc'].onAddStreamFunc = this.onAddStream.bind(this);

            this.el.addEventListener('enter-vr', () => this.showAll());
            this.el.addEventListener('exit-vr', () => this.hideAll());

            this.el.addEventListener('socket-disconnected', () => this.hideAll());
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
        videoEl.setAttribute('class', 'video-source');
        videoEl.setAttribute('id', videoId);
        videoEl.setAttribute('muted', '');

        videoEl.srcObject = event.stream;
        videoEl.onloadedmetadata = () => {
            this.assets.appendChild(videoEl);

            videoEl.onplay = () => {
                this.playing = true;

                const width = videoEl.videoWidth / 2;
                const height = videoEl.videoHeight / 2;

                const sizeX = width / height;
                const sizeY = 1;

                const screen = document.createElement('a-plane');
                screen.setAttribute('id', `screen-${event.stream.id}`);
                screen.setAttribute('manipulate-source', '');
                screen.setAttribute('position', '0 0 -1');
                screen.setAttribute('material', 'shader: flat; height: ' + videoEl.videoHeight + '; width: ' + videoEl.videoWidth);
                screen.setAttribute('scale', `${sizeX} ${sizeY} 1`);
                screen.setAttribute('source', '');

                if (location.search && location.search.indexOf('no-source') >= 0) {
                    screen.setAttribute('color', 'lightgreen');
                } else {
                    screen.setAttribute('src', `#${videoId}`);
                }

                const entity = document.createElement('a-entity');
                entity.setAttribute('scale', '0 0 1');
                entity.appendChild(screen);
                this.sources.appendChild(entity);
            };

            videoEl.play();
            setTimeout(() => {
                if (this.playing) {
                    this.el.sceneEl.dispatchEvent(new Event('source-added'));
                } else {
                    this.el.sceneEl.dispatchEvent(new Event('need-interaction'));
                }
            });
        };
    },

    showAll: function() {
        for (let i = 0; i < this.sources.children.length; i++) {
            this.sources.children[i].setAttribute('animation', 'property: scale; to: 1 1 1');
            setTimeout(() => this.sources.children[i].setAttribute('visible', 'true'), 5000);
        }
    },

    hideAll: function() {
        for (let i = 0; i < this.sources.children.length; i++) {
            this.sources.children[i].setAttribute('animation', 'property: scale; to: 0.0001 1 1');
            setTimeout(() => this.sources.children[i].setAttribute('visible', 'false'), 5000);
        }
    }
});

AFRAME.registerComponent('source', {
    init: function() {
        const initialScale = this.el.getAttribute('scale');
        const x = initialScale.x;
        const y = initialScale.y;
        const z = initialScale.z;

        this.el.sceneEl.systems['socket'].on('source-scale', (scale) => {
            this.el.setAttribute('scale', `${x * scale} ${y * scale} ${z * scale}`);
            console.log(this.el.getAttribute('scale'));
        });
    }
});
