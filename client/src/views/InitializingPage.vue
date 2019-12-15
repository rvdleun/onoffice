<template>
    <p>Initializing scene</p>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        name: 'InitializingPage',
        computed: mapState(['aframeInitialised']),
        watch: {
            aframeInitialised(initialised) {
                if (!initialised) {
                    return;
                }

                if (typeof DeviceOrientationEvent === 'undefined' || !DeviceOrientationEvent.requestPermission) {
                    this.$router.push('connecting-to-client');
                } else {
                    DeviceOrientationEvent.requestPermission().catch(() => {
                        window.console.log('Gonna ask permission');
                        this.$router.push('device-orientation-access');
                    }).then((response) => {
                        window.console.log('We already have permission?', response);
                        if (response === 'granted') {
                            this.$router.push('connecting-to-client');
                        } else {
                            this.$router.push('device-orientation-access');
                        }
                    });
                }
            }
        }
    }
</script>
