<template>
  <div class="vcp-progress-hover" ref="input" @click="seek">
    <div class="vcp-progress" ref="container">
      <div class="vcp-progress-loaded" :style="{width: bufferProgress + '%'}"></div>
      <div class="vcp-progress-played" :style="{width: progress + '%'}">
        <div class="thumb-drag" @touchstart="startDrag" @mousedown="startDrag" ref="thumb"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { getElementOffsets, isMobile } from '../helper/util'
import { drag } from '../helper/dom'

export default {
  name: 'Progress',
  props: {
    visible: Boolean,
    playerKey: {
      type: String,
      default: ''
    }
  },
  mixins: [coreMixins],
  created () {
    this._playerKey = this.playerKey
  },
  data () {
    return {
      progress: 0.00,
      bufferProgress: 0.00
    }
  },
  beforeMount () {
    this.on(EVENTS.TIMEUPDATE, () => {
      if (this._dragEl) {
        return
      }
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
    })
    this.on(EVENTS.LOADSTART, () => {
      const bufferTime = this.$player.getBufferTime()
      const duration = this.$player.getDuration()
      this.bufferProgress = (bufferTime / duration * 100).toFixed(2)
    })
  },
  methods: {
    seek (e) {
      const offsets = getElementOffsets(e.currentTarget)
      if (this.getFullscreen()) {
        offsets.left = 0
      }
      const _clientRect = e.currentTarget.getBoundingClientRect()
      const left = e.pageX - _clientRect.left
      const maxVal = e.currentTarget.offsetWidth
      const val = (left / maxVal * 100).toFixed(2)
      this.progress = val
      const duration = this.$player.getDuration()
      this.$player.seek(left / maxVal * duration)
    },

    startDrag (e) {
      this.initDrag(e)
      this.startSeek = true
    },

    initDrag (e) {
      e.preventDefault()
      const self = this
      this._dragEl = this.$refs['thumb']
      const maxVal = this.$refs['input'].offsetWidth
      let marginLeft = getComputedStyle(this._dragEl, null).marginLeft
      if (marginLeft) {
        marginLeft = parseFloat(marginLeft)
      }
      const coor = {
        x: (isMobile ? e.touches[0].clientX : e.pageX) - this._dragEl.offsetLeft + marginLeft,
        y: (isMobile ? e.touches[0].clientX : e.clientY) - this._dragEl.offsetTop,
        maxLeft: maxVal
      }
      if (this.getFullscreen()) {
        coor.x = e.pageX - this._dragEl.offsetLeft
      }
      const move = function (ev) {
        if (!self._dragEl) {
          return
        }
        const newCoor = drag(ev, self._dragEl, coor)
        if (newCoor) {
          const left = newCoor.left
          const val = (left / maxVal * 100).toFixed(2)
          self.progress = val
          const duration = self.$player.getDuration()
          self.$player.seek(left / maxVal * duration)
        }
      }
      const stopMove = function () {
        self._dragEl = null
        if (isMobile) {
          self.$refs['container'].removeEventListener('touchmove', move, false)
          document.removeEventListener('touchend', stopMove, false)
          return
        }
        document.removeEventListener('mousemove', move, false)
        document.removeEventListener('mouseup', stopMove, false)
      }
      if (isMobile) {
        self.$refs['container'].addEventListener('touchmove', move, false)
        document.addEventListener('touchend', stopMove, false)
        return
      }
      document.addEventListener('mousemove', move, false)
      document.addEventListener('mouseup', stopMove, false)
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
  cursor: pointer;
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
.vcp-m-dashboard .vcp-progress-hover {
  bottom: 0px;
  .vcp-progress {
    height: 3px;
  }
  .vcp-progress-played{
    .thumb-drag{
      background-color: #ff6060;
      &:before{
        background-color: #ff6060;
        opacity: 0.25;
      }
    }
  }
}
</style>
