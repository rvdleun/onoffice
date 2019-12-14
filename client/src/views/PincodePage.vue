<template>
    <div>
        <p>{{ message }}</p>
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
        computed: {
            message() {
                return this.$store.state.pinMessage;
            }
        },
        methods: {
            onPincode(pin) {
                this.$store.dispatch('setPincode', pin);
                this.$router.push('connecting-to-client');
            }
        }
    }
</script>
