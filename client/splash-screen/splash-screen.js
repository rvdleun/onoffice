
Vue.component('pincode-input', {
    template: `
        <div id="pincode">
            <div id="input">
                <div><span v-if="pin[0]">*</span></div>
                <div><span v-if="pin[1]">*</span></div>
                <div><span v-if="pin[2]">*</span></div>
                <div><span v-if="pin[3]">*</span></div>
            </div>
            <div id="buttons">
                <div>
                    <span v-on:click="addDigit('1')">1</span>
                    <span v-on:click="addDigit('2')">2</span>
                    <span v-on:click="addDigit('3')">3</span>
                </div>
                <div>
                    <span v-on:click="addDigit('4')">4</span>
                    <span v-on:click="addDigit('5')">5</span>
                    <span v-on:click="addDigit('6')">6</span>
                </div>
                <div>
                    <span v-on:click="addDigit('7')">7</span>
                    <span v-on:click="addDigit('8')">8</span>
                    <span v-on:click="addDigit('9')">9</span>
                </div>
                <div>
                    <span style="color: green">0</span>
                    <span v-on:click="addDigit('0')">0</span>
                    <span v-on:click="removeDigit()"><</span>
                </div>
            </div>
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
        message: '',
        insertPin: false,
        pincodeRequired: false,
        scene: null,
        readyToEnterVR: false,
        socket: null,
    },
    created: function() {
        this.message = 'Initializing scene';

        this.scene = document.querySelector('a-scene');
        this.scene.addEventListener('renderstart', () => {
            this.message = 'Connecting to client';

            this.socket = this.scene.systems.socket.socket;

            this.socket.on('client_accepted', this.onClientAccepted.bind(this));
            this.socket.on('pin_required', this.onPinRequired.bind(this));
            this.socket.on('pin_correct', this.onPinCorrect.bind(this));
            this.socket.on('pin_incorrect', this.onPinIncorrect.bind(this));

            this.socket.emit('client');
        });
    },
    methods: {
        onClientAccepted: function() {
            this.message = '';
            this.readyToEnterVR = true;
        },

        onPinRequired: function() {
            this.message = 'Enter PIN';
            this.pincodeRequired = true;
        },

        onPinCorrect: function() {
            this.message = 'Pin accepted';
            this.socket.emit('client');
            this.pincodeRequired = false;
        },

        onPinIncorrect: function() {
            this.message = 'Incorrect pin';
        },

        startVirtualReality: function() {
            this.scene.enterVR();
        },

        onSendPin: function(pin) {
            console.log(pin);
            this.message = 'Sending pin';
            this.socket.emit('pin', pin);
        }
    },
});
