<template>
    <div>
        <PincodeScreen :pincode="pincode" />
        <PincodeNumpad @addDigit="addDigit($event)" @removeDigit="removeDigit()" />
    </div>
</template>

<script>
    import PincodeScreen from './PincodeScreen';
    import PincodeNumpad from './PincodeNumpad';

    export default {
        name: 'PincodeForm',
        components: {
            PincodeScreen,
            PincodeNumpad,
        },
        data() {
            return {
                pincode: []
            }
        },
        methods: {
            addDigit(digit) {
                this.pincode.push(digit);

                if (this.pincode.length === 4) {
                    this.$emit('pincode', this.pincode.join(''));
                    this.pincode = [];
                }
            },
            removeDigit() {
                this.pincode.pop();
            }
        }
    }
</script>
