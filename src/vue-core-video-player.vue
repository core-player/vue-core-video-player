<template>
  <div class="vcp-container" ref="vcp-el">
    <video ref="vcp-video" :title="title" :cover="cover" :src="source"></video>
    <Layers />
    <Dashboard :controls="controls" />
  </div>
</template>

<script>
import './directives'
import { EVENTS, DEFAULT_CONFIG } from './constants'
import { i18n } from './helper'
import { parseMediaList } from './helper/media'
import { initVideoCore } from './core'
import coreMixins from './mixins'
import Dashboard from './dashboard/dashboard.vue'
import Layers from './layers/layers.vue'

export default {
  name: 'VueCoreVideoPlayer',
  mixins: [coreMixins],
  components: {
    Dashboard,
    Layers
  },
  props: {
    src: [String, Array],
    lang: String,
    autoplay: {
      type: Boolean,
      default: false
    },
    title: String,
    cover: String,
    logo: String,
    controls: {
      type: [String, Boolean],
      default: true
    }
  },
  beforeCreate () {
    i18n.setLocale()
  },
  computed: {
    source: function () {
      const { src } = this
      let resolution = this.resolution || DEFAULT_CONFIG.resolution
      const medias = parseMediaList(src)
      let url
      medias.forEach((media) => {
        if (media.resolution === resolution) {
          url = media.src
        }
      })
      if (!url) {
        url = medias[0]
      }
      return url
    }
  },
  mounted () {
    this.$player = this.videoCore = initVideoCore({
      ...this.$props,
      videoEl: this.$refs['vcp-video'],
      el: this.$refs['vcp-el'],
      eventEmitter: {
        on: this.on,
        emit: this.emit
      }
    })
    this._coreID = this.videoCore.id
    this.emit(EVENTS.LIFECYCLE_INITING, this.$player)
  }

}
</script>

<style>
.vcp-container {
  position: relative;
  width: 720px;
  height: 400px;
  margin: 0 auto;
  background-color: #000;
}
.vcp-container  video{
  background-color: #000;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
