<template>
  <div class="vue-core-video-player-control timespan">
    <span class="time-current">{{currentTime}}</span>
    <span class="time-split"> / </span>
    <span class="time-duration">{{duration}}</span>
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'
import { secondsToTime } from '../helper/util'

export default {
  name: 'TimeSpan',
  props: {
    visible: Boolean
  },
  mixins: [coreMixins],
  data () {
    return {
      currentTime: '00:00:00',
      duration: '--:--:--'
    }
  },
  created () {
    this.on(EVENTS.TIMEUPDATE, () => {
      const currentTime = this.$player.getCurrentTime()
      if (!currentTime) {
        return
      }
      this.currentTime = secondsToTime(currentTime)
      const newDuration = this.$player.getDuration()
      if (newDuration !== this.duration) {
        this.duration = secondsToTime(newDuration)
      }
    })
    this.on(EVENTS.DURATIONCHANGE, () => {
      const newDuration = this.$player.getDuration()
      this.duration = secondsToTime(newDuration)
    })
  }
}
</script>

<style lang="less">
.vue-core-video-player-control.timespan {
  line-height: 30px;
  width: 140px;
  font-family: Arial !important;
}
</style>
