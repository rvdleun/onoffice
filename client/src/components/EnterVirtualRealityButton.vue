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

<style scoped>
    button {
        background-color: white;
        border: solid 1px black;
        color: #262261;
        font-size: 16px;
        margin-top: 20px;
        padding: 20px;
        width: 80%;
        letter-spacing: 6px;
        text-transform: uppercase;
    }
</style>
