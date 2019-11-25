<template>
    <p>Waiting for source</p>
</template>

<script>
    export default {
        name: 'WaitingForSourcePage',
        created() {
            const scene = document.querySelector('a-scene');

            scene.addEventListener('source-added', this.onSourceAdded);

            const peerSystem = scene.systems['peer'];
            const sessionId = this.$store.state.sessionId;
            peerSystem.connect(sessionId);
        },

        destroyed() {
            const scene = document.querySelector('a-scene');
            scene.removeEventListener('source-added', this.onSourceAdded);
        },

        methods: {
            onSourceAdded() {
                this.$router.push('requesting-virtual-cursor');
            },
        }
    }
</script>
