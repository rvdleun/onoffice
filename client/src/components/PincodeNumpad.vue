<template>
    <table>
        <tr>
            <td><PincodeButton input="1" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="2" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="3" @pressed="addDigit($event)"></PincodeButton></td>
        </tr>
        <tr>
            <td><PincodeButton input="4" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="5" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="6" @pressed="addDigit($event)"></PincodeButton></td>
        </tr>
        <tr>
            <td><PincodeButton input="7" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="8" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="9" @pressed="addDigit($event)"></PincodeButton></td>
        </tr>
        <tr>
            <td></td>
            <td><PincodeButton input="0" @pressed="addDigit($event)"></PincodeButton></td>
            <td><PincodeButton input="<" @pressed="removeDigit()"></PincodeButton></td>
        </tr>
    </table>
</template>

<script>
    import PincodeButton from './PincodeButton';

    export default {
        name: "PincodeNumpad",
        components: {
            PincodeButton,
        },
        created() {
            document.body.addEventListener('keydown', this.onKeyDown);
        },
        destroyed() {
            document.body.removeEventListener('keydown', this.onKeyDown);
        },
        methods: {
            onKeyDown(e) {
                if (e.code.substring(0, 5) === 'Digit') {
                    this.addDigit(e.key);
                }

                if (e.key === 'Backspace' || e.key === '<') {
                    this.removeDigit();
                }
            },
            addDigit(digit) {
                this.$emit('addDigit', digit);
            },
            removeDigit() {
                this.$emit('removeDigit');
            }
        }
    }
</script>

<style scoped>
    table {
        clear: left;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        padding-top: 20px;
    }

    table td {
        padding: 10px;
    }
</style>
