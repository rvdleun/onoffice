import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aframeInitialised: false,
    pincode: null,
    pinMessage: null,
    sessionId: null,
    vrActive: false,
  },
  mutations: {
    AFRAME_IS_INITIALIZED(state) {
      state.aframeInitialised = true;
    },
    ENTER_VIRTUAL_REALITY(state) {
      state.vrActive = true;
    },
    EXIT_VIRTUAL_REALITY(state) {
      state.vrActive = false;
    },
    SET_PINCODE(state, pin) {
      state.pincode = pin;
    },
    SET_PIN_MESSAGE(state, message) {
      state.pinMessage = message;
    },
    SET_SESSION_ID(state, sessionId) {
      state.sessionId = sessionId;
    },
  },
  actions: {
    aframeIsInitialised(context) {
      context.commit('AFRAME_IS_INITIALIZED');
    },
    enterVR(context) {
      context.commit('ENTER_VIRTUAL_REALITY');
    },
    exitVR(context) {
      context.commit('EXIT_VIRTUAL_REALITY');
    },
    setPinIncorrectMessage(context) {
      context.commit('SET_PIN_MESSAGE', 'Incorrect pin')
    },
    setPinRequiredMessage(context) {
      context.commit('SET_PIN_MESSAGE', 'Enter PIN')
    },
    setPincode(context, pin) {
      context.commit('SET_PINCODE', pin);
    },
    setSessionId(context, sessionId) {
      context.commit('SET_SESSION_ID', sessionId);
    },
  },
})
