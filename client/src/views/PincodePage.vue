<template>
    <div>
        <p>Enter PIN</p>
        <PincodeForm @pincode="onPincode($event)" />
    </div>
</template>

<script>
    import PincodeForm from '../components/PincodeForm'

    export default {
        name: 'PincodePage',
        components: {
            PincodeForm,
        },
        methods: {
            onPincode() {
                this.$router.push('ready');
            }
        }
    }
</script>
