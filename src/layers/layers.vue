<template>
  <div class="vue-core-video-player-layers">
  </div>
</template>

<script>

export default {
  name: 'Layers',
  props: {
    visible: Boolean,
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
