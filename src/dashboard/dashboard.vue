<template>
  <div class="vue-core-video-player-dashboard">
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  props: {
    visible: Boolean,
  }
}
</script>

<style>
.vue-core-video-player-dashboard {
  z-index: 10;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 65px;
  background: rgba(0,0,0,.5);
}
</style>
