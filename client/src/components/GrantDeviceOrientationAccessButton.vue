<template>
    <button @click="onClick()">Grant Access</button>
</template>

<script>
    export default {
        name: 'GrantDeviceOrientationAccessButton',
        methods: {
            onClick() {
                DeviceOrientationEvent.requestPermission().then((response) => {
                    window.console.log(response);
                    if (response === 'granted') {
                        this.$emit('accessGranted');
                    }
                });
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
