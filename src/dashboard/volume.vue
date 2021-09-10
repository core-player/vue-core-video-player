<template>
  <div class="vue-core-video-player-control volume-control">
    <div class="btn-control btn-volume" v-if="!isMuted" @click="toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="23.542" height="23" viewBox="0 0 23.542 23"><path data-name="15" fill="#fff" d="M0 5.5h7v12H0z"/><path data-name="3" d="M.5 11.5L12.5 0v23z" fill="#fff"/><g data-name="12 1" fill="none" stroke="#fff" stroke-width="1.5"><path data-name="2" d="M15.787 8.349a2.89 2.89 0 0 1 3.04 3.126 2.763 2.763 0 0 1-3.142 2.833" stroke-width="1.50021"/><path data-name="3" d="M16.052 4.807s6.917-.147 6.61 6.796-6.83 6.16-6.83 6.16" stroke-width="1.50021"/></g></svg>
    </div>
    <div class="btn-control btn-mute" v-if="isMuted" @click="toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="24.485" height="23" viewBox="0 0 24.485 23"><g fill="#fff"><path data-name="矩形 15" d="M0 5.5h7v12H0z"/><path data-name="多边形 3" d="M.5 11.5L12.5 0v23z"/><g data-name="组 3"><path data-name="矩形 39" d="M23.071 7.257l1.414 1.414-7.07 7.071L16 14.328z"/><path data-name="矩形 40" d="M16 8.672l1.414-1.414 7.071 7.07-1.414 1.415z"/></g></g></svg>
    </div>

    <div class="btn-control-panel">
      <div class="progress" @click="seek">
        <div class="volume-current" :style="{height: volume + '%'}">
          <div class="thumb-drag"></div>
        </div>
      </div>
      <div class="volume-info">{{volume}}%</div>
    </div>
  </div>
</template>

<script>
import coreMixins from '../mixins'
// import { hasClass } from '../helper/dom'

export default {
  name: 'Volume',
  props: {
    visible: Boolean,
    muted: Boolean,
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
      panelShow: false,
      volume: 50,
      isMuted: this.muted
    }
  },

  methods: {
    seek (e) {
      let top = e.offsetY
      if (e.target.className === 'volume-current') {
        top += e.target.offsetTop
      }
      const maxVal = e.currentTarget.offsetHeight
      const volume = 1 - top / maxVal
      if (this.isMuted) {
        this.$player.setMuted(false)
      }
      this.$player.setVolume(volume, true)
      this.setRangeValue(volume)
    },

    setRangeValue (value) {
      this.volume = parseInt(value * 100)
    },

    toggle () {
      this.isMuted = !this.isMuted
      if (this.isMuted) {
        this.$player.setMuted(true)
        this.volume = 0
      } else {
        this.$player.setMuted(false)
        this.volume = parseInt(this.$player.getVolume() * 100)
      }
    }

  }
}
</script>

<style lang="less">
.vue-core-video-player-control {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  svg{
    width: 20px;
  }
}
.volume-control{
  &:hover {
   .btn-control-panel {
     display: block;
   }
  }
  .btn-control-panel{
    display: none;
    width: 40px;
    height: 150px;
    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: -30px;
      left: 0;
      width: 100%;
      height: 35px;
    }
    .progress{
      position: absolute;
      width: 4px;
      height: 100px;
      left: 50%;
      top: 50%;
      margin-left: -2px;
      margin-top: -50px;
      background-color: rgba(255, 255, 255, .7);
      cursor: pointer;
      .volume-current{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0;
        width: 100%;
        background-color: #ff6060;
        .thumb-drag{
          opacity: 0;
          position: absolute;
          left: 50%;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #fff;
          transform: translateY(-50%) translateX(-50%);
          transition: height .05s ease .15s;
          &:before{
            content: '';
            display: inline-block;
            position: absolute;
            top: -2px;
            left: -2px;
            width: 14px;
            height: 14px;
            border-radius: 7px;
            background-color: rgba(255, 255, 255, .3);
          }
        }
      }
      &:hover{
        .thumb-drag{
          opacity: 1;
        }
      }
    }
    .volume-info {
      position: absolute;
      top: -30px;
      left: 0;
      width: 40px;
      height: 20px;
      background-color: rgba(0,0,0, .7);
      border-radius: 4px;
      font-size: 12px;
      line-height: 20px;
    }
  }
}
.settings-open .volume-control:hover .btn-control-panel {
  display: none;
}
</style>
