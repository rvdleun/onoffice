<template>
    <button @click="emitInput()">{{ input }}</button>
</template>

<script>
    export default {
        name: 'PincodeButton',
        props: {
            input: String,
        },
        methods: {
            emitInput() {
                this.$emit('pressed', this.input);
            }
        }
    }
</script>

<style scoped>
    button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-weight: 100;
        font-size: 20px;
    }
</style>
