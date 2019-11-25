import Vue from 'vue'
import VueRouter from 'vue-router'
import PincodePage from "../views/PincodePage";
import InitializingPage from "../views/InitializingPage";
import ReadyPage from "../views/ReadyPage";
import ConnectingToClientPage from "../views/ConnectingToClientPage";
import WaitingForSourcePage from "../views/WaitingForSourcePage";
import RequestingVirtualCursorPage from "../views/RequestingVirtualCursorPage";
import DisconnectedPage from "../views/DisconnectedPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'initializing',
    component: InitializingPage,
  },
  {
    path: '/connecting-to-client',
    name: 'connecting-to-client',
    component: ConnectingToClientPage,
  },
  {
    path: '/disconnected',
    name: 'disconnected',
    component: DisconnectedPage,
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
  },
  {
    path: '/requesting-virtual-cursor',
    name: 'requesting-virtual-cursor',
    component: RequestingVirtualCursorPage,
  },
  {
    path: '/waiting-for-source',
    name: 'waiting-for-source',
    component: WaitingForSourcePage
  }
];

export default new VueRouter({
  routes
});
