<template>
  <div class="vue-core-video-player-containers">
    <video ref="vcp-video" :src="src"></video>
    <Layers />
    <Dashboard />
  </div>
</template>

<script>
import './directives'
import EVENTS from './constants/EVENTS'
import { i18n } from './helper'
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
    src: String,
    lang: String,
    controls: Boolean
  },
  beforeCreate() {
    // console.log(this.lang)
    i18n.setLocale()
  },
  mounted() {
    this.$player = this.videoCore = initVideoCore({
      ...this.$props,
      videoEl: this.$refs['vcp-video']
    })
    this._coreID = this.videoCore.id;
    console.log(11111);
    this.emit(EVENTS.LIFECYCYLE_INITING, this.$player);
  }

}
</script>

<style>
.vue-core-video-player-containers {
  position: relative;
  width: 1088px;
  height: 600px;
  background-color: #000;
}
.vue-core-video-player-containers video{
  background-color: #000;
  width: 100%;
  height: 100%;
}
</style>
