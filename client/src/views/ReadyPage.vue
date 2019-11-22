<template>
    <div>
        <p>Status: Active</p>
        <EnterVirtualRealityButton />
    </div>
</template>

<script>
    import EnterVirtualRealityButton from "../components/EnterVirtualRealityButton";

    export default {
        name: 'ReadyPage',
        components: {
            EnterVirtualRealityButton
        }
    }
</script>
