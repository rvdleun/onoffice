/*
    Handles the pincode input, if the user has one setup
 */
Vue.component('pincode-input', {
    template: `
        <div id="pincode">
            <div id="input">
                <div><span v-if="pin[0]">*</span></div>
                <div><span v-if="pin[1]">*</span></div>
                <div><span v-if="pin[2]">*</span></div>
                <div><span v-if="pin[3]">*</span></div>
            </div>
            <table id="buttons">
                <tr>
                    <td v-on:click="addDigit('1')">1</td>
                    <td v-on:click="addDigit('2')">2</td>
                    <td v-on:click="addDigit('3')">3</td>
                </tr>
                <tr>
                    <td v-on:click="addDigit('4')">4</td>
                    <td v-on:click="addDigit('5')">5</td>
                    <td v-on:click="addDigit('6')">6</td>
                </tr>
                <tr>
                    <td v-on:click="addDigit('7')">7</td>
                    <td v-on:click="addDigit('8')">8</td>
                    <td v-on:click="addDigit('9')">9</td>
                </tr>
                <tr>
                    <td></td>
                    <td v-on:click="addDigit('0')">0</td>
                    <td v-on:click="removeDigit()"><</td>
                </tr>
            </table>
        </div>`,

    data: function() {
        return {
            pin: [],
        };
    },

    methods: {
        addDigit: function(digit) {
            if(this.pin.length >= 4) {
                return;
            }

            this.pin.push(digit);

            if(this.pin.length === 4) {
                const pin = this.pin.join('');
                this.pin = [];
                this.$emit('send', pin);
            }
        },

        removeDigit: function() {
            this.pin.pop();
        }
    }
});

new Vue({
    el: '#splash-screen',
    data: {
        connectionLost: false,
        message: '',
        insertPin: false,
        peerSystem: null,
        pincodeRequired: false,
        scene: null,
        sessionId: '',
        readyToEnterVR: false,
        vrActive: false,
    },
    created: function() {
        this.message = 'Initializing scene';

        this.scene = document.querySelector('a-scene');
        this.peerSystem = this.scene.systems['peer'];
        this.scene.addEventListener('renderstart', () => {
            this.message = 'Connecting to client';

            this.connect();

            const scene = document.querySelector('a-scene');
            scene.addEventListener('need-interaction', this.onNeedInteraction);
            scene.addEventListener('source-added', this.onSourceAdded);
        });

        this.scene.addEventListener('enter-vr', () => {
            setTimeout(() => this.scene.systems['manipulate-source'].centerAllScreens(), 1000);
            this.vrActive = true;
        });

        this.scene.addEventListener('exit-vr', () => {
            this.vrActive = false;
        });

        this.scene.addEventListener('peer-disconnected', () => {
            this.message = 'Status: Disconnected';
            this.connectionLost = true;
            this.readyToEnterVR = false;
        });
    },

    methods: {
        connect: async function(pin) {
            const response = await fetch(`/connect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pin }),
            });

            const data = await response.json();
            switch(data.result) {
                case 'pin-correct':
                    this.onPinIncorrect(data.sessionId);
                    break;

                case 'pin-incorrect':
                    this.onPinIncorrect();
                    break;

                case 'pin-required':
                    this.onPinRequired();
                    break;

                case 'success':
                    this.onClientAccepted(data.sessionId);
                    break;
            }
        },

        onClientAccepted: function(sessionId) {
            if (!sessionId) {
                return;
            }

            this.message = 'Waiting for source';
            this.peerSystem.connect(sessionId);
        },

        onNeedInteraction: function() {
            document.addEventListener('mousedown', () => {
                Array.from(document.querySelectorAll('.video-source')).forEach((source) => source.play() );

                document.querySelector('a-scene').dispatchEvent(new Event('source-added'));
            });
            this.message = 'Please click / tap anywhere on the screen';
        },

        onSourceAdded: function() {
            this.message = 'Requesting virtual cursor';

            const scene = document.querySelector('a-scene');
            scene.removeEventListener('source-added', this.onSourceAdded);

            const onCursorPosition = () => {
                this.message = 'Status: Active';
                this.readyToEnterVR = true;
            };
            this.peerSystem.on('cursor-position', onCursorPosition);
            this.peerSystem.emit('watch-cursor-position');
        },

        onPinRequired: function() {
            this.message = 'Enter PIN';
            this.pincodeRequired = true;
        },

        onPinCorrect: function(sessionId) {
            if (!sessionId) {
                return;
            }

            this.message = 'Pin accepted';
            this.peerSystem.connect(sessionId);
            this.pincodeRequired = false;
        },

        onPinIncorrect: function() {
            this.message = 'Incorrect pin';
        },

        startVirtualReality: function() {
            this.scene.enterVR();
        },

        exitVirtualReality: function() {
            this.scene.exitVR();
        },

        onSendPin: function(pin) {
            this.message = 'Sending pin';
        },

        onSessionExpired: function() {
            alert('Your session has expired. Please refresh to try again.');
        }
    },
});
