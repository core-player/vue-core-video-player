<template>
  <div class="vcp-layer title-layer" v-show="show && title.length">
    <div class="video-title">{{title}}</div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'

export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  props: {
    playerKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      title: '',
      show: false
    }
  },
  created () {
    this._playerKey = this.playerKey
  },
  mounted () {
    this.on(EVENTS.LIFECYCLE_INITING, () => {
      const { title } = this.$player.config
      if (title) {
        this.title = title
      }
    })
    this.on(EVENTS.UI_DASHBOARD_SHOW, () => {
      this.show = true
    })
    this.on(EVENTS.UI_DASHBOARD_HIDE, () => {
      this.show = false
    })
  }
}
</script>

<style lang="less">
.title-layer {
  z-index: 11;
  text-align: left;
  .video-title{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 16px 20px;
    line-height: 32px;
    font-size: 14px;
    background-image: linear-gradient(to bottom ,rgba(0,0,0, .7), rgba(0,0,0, 0));
  }
}
.fullscreen .title-layer .video-title {
  font-size: 16px;
  font-weight: bold;
 }
</style>
