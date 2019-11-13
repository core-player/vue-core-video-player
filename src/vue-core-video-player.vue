<template>
  <div class="vcp-container" ref="vcp-el">
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
      videoEl: this.$refs['vcp-video'],
      el: this.$refs['vcp-el']
    })
    this._coreID = this.videoCore.id;
    console.log(this.$player);
    this.emit(EVENTS.LIFECYCYLE_INITING, this.$player);
  }

}
</script>

<style>
.vcp-container {
  position: relative;
  width: 1180px;
  height: 600px;
  background-color: #000;
}
.vcp-container  video{
  background-color: #000;
  width: 100%;
  height: 100%;
}
</style>
