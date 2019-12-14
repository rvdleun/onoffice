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
        },
        created() {
            const scene = document.querySelector('a-scene');
            scene.addEventListener('peer-disconnected', this.onPeerDisconnected);
        },
        destroyed() {
            const scene = document.querySelector('a-scene');
            scene.removeEventListener('peer-disconnected', this.onPeerDisconnected);
        },
        methods: {
            onPeerDisconnected() {
                this.$router.push('disconnected');
            }
        }
    }
</script>
