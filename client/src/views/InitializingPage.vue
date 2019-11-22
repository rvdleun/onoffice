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

                this.$router.push('pincode');
            }
        }
    }
</script>
