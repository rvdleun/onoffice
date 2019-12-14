<template>
    <a-scene ref="scene" :class="{ active: vrActive }" device-orientation-permission-ui="enabled: false" @renderstart="this.onRenderStart" @enter-vr="onEnterVR" @exit-vr="onExitVR()">
        <a-assets ref="assets">
            <img id="cursorImg" src="../assets/images/cursor.svg" />
            <video id="remote" muted autoplay></video>
        </a-assets>

        <a-entity position="0 0 0" camera look-controls>
            <a-text id="connection-lost" align="center" value="Connection lost\nPlease refresh your browser" position="0 0 -.5" scale=".2 .2 .2"></a-text>
        </a-entity>
        <a-entity id="leftHand" laser-controls="hand: left" raycaster="objects: .interactable" line="color: #118A7E"></a-entity>
        <a-entity id="rightHand" laser-controls="hand: right" raycaster="objects: .interactable" line="color: #118A7E"></a-entity>

        <a-entity id="sources"></a-entity>
        <a-plane id="cursor" src="#cursorImg" color="#ff3c4b" position="-.5 0 .001" material="shader: flat; opacity: .5; transparent: true" scale=".02 .03 .01"></a-plane>

        <a-sky :src="skySrc" rotation="0 270 0"></a-sky>
    </a-scene>
</template>

<script>
    import 'aframe';
    import 'simple-peer';
    import '../aframe/cursor-position.system';
    import '../aframe/manipulate-source.component';
    import '../aframe/peer.system';
    import '../aframe/source.system';
    import '../aframe/source-border.component';

    export default {
        name: 'AFrameScene',
        data() {
            return {
                vrActive: false,
            }
        },
        computed: {
            skySrc() {
                return `${process.env.VUE_APP_APPLICATION_URL}/sky`
            }
        },
        created() {
            this.$store.subscribeAction((data) => {
                const { type } = data;
                if (type === 'enterVR') {
                    this.$refs.scene.enterVR();
                }
            });
        },
        methods: {
            onEnterVR() {
                Array.from(this.$refs.assets.querySelectorAll('.video-source')).forEach((source) => source.play() );
                setTimeout(() => this.$refs.scene.systems['manipulate-source'].centerAllScreens(), 500);

                this.vrActive = true;
            },
            onExitVR() {
                this.vrActive = false;
            },
            onRenderStart() {
                this.$store.dispatch('aframeIsInitialised');
            },
        }
    }
</script>

<style scoped>
    a-scene {
        display: none;
    }

    a-scene.active {
        display: block;
    }
</style>
