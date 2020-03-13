<template>
  <div id="vue-core-video-player-box" class="player">
    <vue-core-video-player cover="https://img1.wxzxzj.com/maxresdefault.jpg" src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"></vue-core-video-player>
  </div>
</template>

<script>
import Vue from 'vue'
import VueCoreVideoPlayer from 'vue-core-video-player'
Vue.use(VueCoreVideoPlayer)

export default {
  data() {
    return {
      dynamicComponent: null
    }
  },
  mounted () {
    import('vue-core-video-player').then(module => {
      this.dynamicComponent = module.default
    })
  }
}


</script>

<style>
.player {
  width: 655px;
  height: 370px;
  background-color: #f4f4f4;
}
</style>