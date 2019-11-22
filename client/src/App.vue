<template>
  <div id="app">
    <div id="body">
      <LogoImage />
      <router-view />
      <AFrameScene />
    </div>
  </div>
</template>

<script>
  import AFrameScene from './components/AFrameScene';
  import LogoImage from './components/LogoImage';

  import './assets/css/global.css';

  export default {
    name: 'app',
    components: {
      LogoImage,
      AFrameScene,
    },
    watch: {
      // $route() {
      //   history.pushState("", document.title, window.location.pathname);
      // }
    }
  }
</script>
