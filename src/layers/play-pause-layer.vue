<template>
  <div class="vue-core-video-player-layer play-pause-layer">
    <div class="btn-control"></div>
  </div>
</template>

<script>

export default {
  name: 'PlayPauseLayer',
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
.play-pause-layer .btn-control{
  width: 96px;
  height: 96px;
  background-color: #fff;
  border: 5px solid rgba(255, 255, 255, .7);
}
</style>
