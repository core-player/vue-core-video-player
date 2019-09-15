<template>
  <div class="vue-core-video-player-layers">
    <cover-layer></cover-layer>
    <play-pause-layer></play-pause-layer>
  </div>
</template>

<script>
import PlayPauseLayer from './play-pause-layer.vue';
import CoverLayer from './cover-layer';

export default {
  name: 'Layers',
  components: {
    PlayPauseLayer,
    CoverLayer
  },
  props: {
    visible: Boolean
  }
}
</script>

<style>
.vue-core-video-player-layers {
  z-index: 11;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
}
</style>
