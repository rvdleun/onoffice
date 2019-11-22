import Vue from 'vue'
import VueRouter from 'vue-router'
import PincodePage from "../views/PincodePage";
import InitializingPage from "../views/InitializingPage";
import ReadyPage from "../views/ReadyPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'initializing',
    component: InitializingPage,
  },
  {
    path: '/pincode',
    name: 'pincode',
    component: PincodePage,
  },
  {
    path: '/ready',
    name: 'ready',
    component: ReadyPage,
  }
];

export default new VueRouter({
  routes
});
