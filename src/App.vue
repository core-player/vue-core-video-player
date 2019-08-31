<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <vue-core-video-player src="/videos/5-cm.mp4"></vue-core-video-player>
  </div>
</template>

<script>
import VueCoreVideoPlayer from './vue-core-video-player.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
