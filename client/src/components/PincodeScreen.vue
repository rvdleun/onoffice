<template>
    <div id="pincode-input">
        <div v-for="index in [0, 1, 2, 3]" v-bind:key="index"><span v-if="index < pincode.length">*</span></div>
    </div>
</template>

<script>
    export default {
        name: 'PincodeScreen',
        props: {
            pincode: Array,
        },
    }
</script>

<style scoped>
    #pincode-input {
        width: 120px;
        margin-left: auto;
        margin-right: auto;
    }

    #pincode-input div {
        float: left;
        margin-right: 10px;

        width: 20px;
        height: 20px;
        border-bottom: solid 1px lightgreen;
        font-size: 24px;
    }

    #pincode-input div:last-child {
        margin-right: 0;
    }
</style>
