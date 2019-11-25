<template>
    <p>Connecting to client...</p>
</template>

<script>
    export default {
        name: 'ConnectingToClientPage',
        created: async function() {
            const pin = this.$store.state.pincode;
            const response = await fetch(`http://localhost:24242/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pin }),
            });

            const data = await response.json();
            switch(data.result) {
                case 'pin-incorrect':
                    this.$store.dispatch('setPinIncorrectMessage');
                    this.$router.push('pincode');
                    break;

                case 'pin-required':
                    this.$store.dispatch('setPinRequiredMessage');
                    this.$router.push('pincode');
                    break;

                case 'pin-correct':
                case 'success':
                    this.$store.dispatch('setSessionId', data.sessionId);
                    this.$router.push('waiting-for-source');
                    break;
            }
        }
    }
</script>
