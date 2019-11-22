import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aframeInitialised: false,
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
    }
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
  },
})
