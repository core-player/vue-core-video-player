<template>
  <div id="app">
    <vue-core-video-player loop :cover="cover" title="《Your Name》OST Sparkle" autoplay :src="source"></vue-core-video-player>
  </div>
</template>

<script>
import VueCoreVideoPlayer from './vue-core-video-player.vue'

// const videoSource2 = [
//   {
//     src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20Sparkle%20_%20Your%20Name%20AMV_K_7To_y9IAM_240p.mp4',
//     resolution: '240p'
//   },
//   {
//     src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20Sparkle%20_%20Your%20Name%20AMV_K_7To_y9IAM_360p.mp4',
//     resolution: '360p'
//   }, {
//     src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
//     resolution: '720p'
//   }, {
//     src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
//     resolution: '1080p'
//   }
// ]

const videoSource = [
  {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.webm',
    type: 'video/webm'
  },
  {
    src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
    type: 'video/mp4'
  }
]

// const videoSource2 = 'https://media.vued.vanthink.cn/the_garden_of_words_trailer_english__1080p.mp4'

const cover = 'https://img1.wxzxzj.com/maxresdefault.jpg'

export default {
  name: 'app',
  data () {
    return {
      source: videoSource,
      cover: cover
    }
  },
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
