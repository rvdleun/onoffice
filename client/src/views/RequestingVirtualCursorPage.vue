<template>
    <p>Requesting virtual cursor</p>
</template>

<script>
    export default {
        name: 'RequestingVirtualCursorPage',
        created() {
            const scene = document.querySelector('a-scene');
            const peerSystem = scene.systems['peer'];

            peerSystem.on('cursor-position', this.onCursorPosition);
            peerSystem.emit('watch-cursor-position');
        },
        destroyed() {
            const scene = document.querySelector('a-scene');
            const peerSystem = scene.systems['peer'];

            peerSystem.removeListener('cursor-position', this.onCursorPosition);
        },
        methods: {
            onCursorPosition() {
                this.$router.push('ready');
            }
        }
    }
</script>

<style scoped>

</style>
