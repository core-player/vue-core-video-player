<template>
  <div class="vcp-layer play-pause-layer" v-show="show">
    <a href="javascript:;" v-if="!isPlaying" class="btn-control btn-play" @click="play">
      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="35" viewBox="0 0 41 47"><path d="M23.5,0,47,41H0Z" transform="translate(41) rotate(90)" fill="#ff6060"/></svg>
      <div class="tips tips--loose">{{$t('dashboard.btn.play')}}</div>
    </a>
    <a href="javascript:;" v-if="isPlaying" class="btn-control btn-pause" @click="pause">
      <svg xmlns="http://www.w3.org/2000/svg" width="27" height="36" viewBox="0 0 36 48"><g transform="translate(-950 -398)"><rect width="12" height="48" transform="translate(950 398)" fill="#ff6060"/><rect width="12" height="48" transform="translate(974 398)" fill="#ff6060"/></g></svg>
      <div class="tips tips--loose">{{$t('dashboard.btn.pause')}}</div>
    </a>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import { isMobile } from '../helper/util.js'
import coreMixins from '../mixins'

export default {
  name: 'PlayPauseLayer',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  data () {
    return {
      show: isMobile
    }
  },
  mounted () {
    this.on(EVENTS.UI_DASHBOARD_SHOW, () => {
      this.show = true
    })
    this.on(EVENTS.UI_DASHBOARD_HIDE, () => {
      this.show = false
    })
  }
}
</script>

<style>
.play-pause-layer {
  z-index: 12;
  background: rgba(0,0,0, .25);
}
.play-pause-layer .btn-control{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  margin-top: -30px;
  background-color: #fff;
  border-radius: 30px;
}
.play-pause-layer .btn-control:before{
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 72px;
  height: 72px;
  margin-left: -36px;
  margin-top: -36px;
  border-radius: 36px;
  background-color: rgba(255,255,255, .25);
}
.play-pause-layer .btn-play svg{
  margin-left: 10px;
}
</style>
