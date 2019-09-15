<template>
  <div id="app">
    <vue-core-video-player controls src="/videos/the_garden_of_words_trailer_english__1080p.mp4"></vue-core-video-player>
  </div>
</template>

<script>
import VueCoreVideoPlayer from './vue-core-video-player.vue'

export default {
  name: 'app',
  components: {
    VueCoreVideoPlayer
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
#app .vue-core-video-player-containers {
  margin: 60px auto;
}
</style>
