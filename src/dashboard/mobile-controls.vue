<template>
  <div class="vcp-controls">
    <div class="playback-control">
      <time-span />
    </div>
    <div class="setting-control">
      <picture-in-picture />
      <settings-control />
      <fullscreen-control />
    </div>
  </div>
</template>

<script>
import TimeSpan from './time-span'
import Fullscreen from './fullscreen'
import Settings from './settings'
import PictureInPicture from './picture-in-picture'

export default {
  name: 'Controls',
  components: {
    'time-span': TimeSpan,
    'fullscreen-control': Fullscreen,
    'settings-control': Settings,
    'picture-in-picture': PictureInPicture
  },
  props: {
    visible: Boolean,
    muted: Boolean
  }
}
</script>

<style land="less">
.vcp-controls {
  z-index: 10;
  position: absolute;
  left: 0;
  bottom: 5px;
  width: 100%;
  height: 50px;
  text-align: left;
}

.playback-control,
.setting-control{
  display: flex;
  position: absolute;
  top: 0;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
}
.playback-control {
  left: 0;
}
.setting-control{
  right: 0;
}
</style>
