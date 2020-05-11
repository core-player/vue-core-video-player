### HLS

[playcore-hls](https://github.com/core-player/playcore-hls) is an plugin for HLS decoding.


#### Get Started

``` bash
$ npm install @core-player/playcore-hls --save
```

``` vue
<template>
  <div id="app">
    <div class="player-container">
      <vue-core-video-player :core="HLSCore" src="your_file.m3u8"></vue-core-video-player>
    </div>
  </div>
</template>
<script>
import VueCoreVideoPlayer from 'vue-core-video-player'
import HLSCore from '@core-player/playcore-hls

Vue.use(VueCoreVideoPlayer)

export default {
  name: 'App',
  data () {
    return {
      HLSCore
    }
  }
}

</script>
```

[Demo](https://github.com/core-player/playcore-hls/blob/master/example/src/App.vue)