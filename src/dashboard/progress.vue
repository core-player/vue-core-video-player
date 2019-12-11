<template>
  <div class="vcp-progress-hover" @click="seek">
    <div class="vcp-progress">
      <div class="vcp-progress-loaded" :style="{width: bufferProgress + '%'}"></div>
      <div class="vcp-progress-played" :style="{width: progress + '%'}">
        <div class="thumb-drag"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { getElementOffsets } from '../helper/util'

export default {
  name: 'Progress',
  props: {
    visible: Boolean
  },
  mixins: [coreMixins],
  data () {
    return {
      progress: 0.00,
      bufferProgress: 0.00
    }
  },
  created () {
    this.on(EVENTS.TIMEUPDATE, () => {
      const time = this.$player.getCurrentTime()
      const duration = this.$player.getDuration()
      // this.setProgressPlayedPercent();
      this.progress = (time / duration * 100).toFixed(2)
      // this.setRangeValue((time / duration * 100).toFixed(1));
    })
    this.on(EVENTS.PROGRESS, () => {
      const bufferTime = this.$player.getBufferTime()
      const duration = this.$player.getDuration()
      if (bufferTime > 0 && duration > 0) {
        this.bufferProgress = (bufferTime / duration * 100).toFixed(2)
      }
    });
    const initTime = Date.now()
    this.on(EVENTS.LOADSTART, () => {
      const currentTime = Date.now() - initTime
      const bufferTime = this.$player.getBufferTime()
      const duration = this.$player.getDuration()
      this.bufferProgress = (bufferTime / duration * 100).toFixed(2)
    });
  },
  methods: {
    seek(e) {
      const offsets = getElementOffsets(e.currentTarget);
      if (this.getFullscreen()) {
        offsets.left = 0;
      }
      const _clientRect = e.currentTarget.getBoundingClientRect();
      const left = e.pageX - _clientRect.left;
      const maxVal = e.currentTarget.offsetWidth;
      const val = (left / maxVal * 100).toFixed(2);
      this.progress = val;
      const duration = this.$player.getDuration();
      this.$player.seek(left / maxVal *  duration);
    }
  }
}
</script>

<style lang="less">
.vcp-progress-hover {
  position: absolute;
  bottom: 100%;
  left: 0;
  height: 12px;
  width: 100%;
  .vcp-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    background-color: rgba(255, 255, 255, .3);
    transition: height .2s ease .05s;
  }

  &:hover {
    .vcp-progress {
      height: 6px;
      .thumb-drag{
        opacity: 1;
      }
    }
  }

}

.vcp-progress-loaded,
.vcp-progress-played{
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: rgba(255, 255, 255, .7);
}
.vcp-progress-loaded {
  transition: width .1s cubic-bezier(0.4,0.0,1,1);
}
.vcp-progress-played{
  width: 0;
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
