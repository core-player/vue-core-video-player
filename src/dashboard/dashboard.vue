<template>
  <div class="vue-core-video-player-dashboard">
    <Progress />
    <Controls />
  </div>
</template>

<script>
import Progress from './progress'
import Controls from './controls'

export default {
  name: 'Dashboard',
  components: {
    Progress,
    Controls
  },
  props: {
    visible: Boolean
  }
}
</script>

<style>
.vue-core-video-player-dashboard {
  z-index: 11;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 59px;
  background: rgba(0,0,0,.5);
}
</style>
