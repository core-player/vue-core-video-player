<template>
  <div class="vue-core-video-player-progress">
    <div class="vue-core-video-player-progress-loaded"></div>
    <div class="vue-core-video-player-progress-played">
      <div class="thumb-drag"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Progress',
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less">
.vue-core-video-player-progress {
  position: absolute;
  bottom: 100%;
  left: 0;
  height: 4px;
  width: 100%;
  background-color: rgba(255, 255, 255, .3);
  transition: height .2s ease .05s;
  &:hover{
    height: 6px;
    .thumb-drag{
      opacity: 1;
    }
  }
}
.vue-core-video-player-progress-loaded,
.vue-core-video-player-progress-played{
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, .7);
}
.vue-core-video-player-progress-played{
  width: 30%;
  background-color: #ff6060;
  .thumb-drag{
    opacity: 0;
    position: absolute;
    right: 0;
    top: 50%;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: #fff;
    transform: translateY(-50%) translateX(50%);
    transition: height .05s ease .15s;
    &:before{
      content: '';
      display: inline-block;
      position: absolute;
      top: -2px;
      left: -2px;
      width: 16px;
      height: 16px;
      border-radius: 7px;
      background-color: rgba(255, 255, 255, .3);
    }
  }
}
</style>
