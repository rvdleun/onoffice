<template>
    <button @click="onClick()">Enter Virtual Reality</button>
</template>

<script>
    export default {
        name: 'EnterVirtualRealityButton',
        methods: {
            onClick() {
                this.$store.dispatch('enterVR');
            }
        }
    }
</script>
