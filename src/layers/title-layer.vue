<template>
  <div class="vue-core-video-player-layer title-layer" style="display:block;">
    <div class="video-title">{{title}}</div>
  </div>
</template>

<script>

export default {
  name: 'CoverLayer',
  props: {
    visible: Boolean
  },

  data () {
    return {
      title: '《5 Centimeters per Second 》--- Makoto Shinkai'
    }
  }
}
</script>

<style lang="less">
.title-layer {
  z-index: 11;
  text-align: left;
  .video-title{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 16px 20px;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
    background-image: linear-gradient(to bottom ,rgba(0,0,0, .7), rgba(0,0,0, 0));
  }
}
</style>
