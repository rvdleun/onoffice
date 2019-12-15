<template>
    <div>
        <p>On/Office requires access to your device motion sensors</p>
        <GrantDeviceOrientationAccessButton @accessGranted="onAccessGranted()" />
    </div>
</template>

<script>
    import GrantDeviceOrientationAccessButton from '../components/GrantDeviceOrientationAccessButton';

    export default {
        name: 'DeviceOrientationAccessPage',
        components: {
            GrantDeviceOrientationAccessButton
        },
        methods: {
            onAccessGranted() {
                this.$router.push('connecting-to-client');
            }
        }
    }
</script>
