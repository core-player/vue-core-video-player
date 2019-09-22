<template>
  <div class="vue-core-video-player-containers">
    <video autoplay :src="src"></video>
    <Layers />
    <Dashboard />
  </div>
</template>

<script>
import './directives'
import { i18n } from './helper'

import Dashboard from './dashboard/dashboard.vue'
import Layers from './layers/layers.vue'

export default {
  name: 'VueCoreVideoPlayer',
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
