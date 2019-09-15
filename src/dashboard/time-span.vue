<template>
  <div class="vue-core-video-player-control timespan">
    <span class="time-current">00:00</span>
    <span class="time-split"> / </span>
    <span class="time-duration">00:00</span>
  </div>
</template>

<script>

export default {
  name: 'TimeSpan',
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less">
.vue-core-video-player-control.timespan {
  line-height: 30px;
  width: 90px;
}
</style>
