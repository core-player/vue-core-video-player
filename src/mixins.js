import ee from 'event-emitter'
import EVENTS from './constants/EVENTS'
import * as types from './helper/type'
import { addClass, removeClass } from './helper/dom'
// import eventBus from './helper/eve'
// import { getVideoCore } from './core'
const _ee = ee()

const mixins = {
  data () {
    return {
      show: false,
      fullscreen: false,
      isPlaying: false,
      _coreID: ''
    }
  },

  created () {
    this.on(EVENTS.LIFECYCYLE_INITING, ($player) => {
      this.$player = $player
      this.$el = this.$player.$el
    })
    this.on(EVENTS.PLAY, () => {
      console.log('play!')
      this.isPlaying = true
    })
    this.on(EVENTS.PAUSE, () => {
      console.log('pause!')
      this.isPlaying = false
    })
  },

  _events: {},

  methods: {
    play () {
      this.$player.play()
    },

    pause () {
      this.$player.pause()
    },

    enterFullscreen () {
      const el = this.$el
      if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
      } else if (el.requestFullScreen) {
        el.requestFullscreen()
      }
      addClass(el, 'fullscreen')
      this.emit('fullscreen', true)
      this.fullscreen = true
    },

    cancelFullscreen (isManual) {
      const el = this.$el
      // if (isManual) {
      //   this.emit('fullscreen', false)
      //   removeClass(el, 'fullscreen')
      //   this.fullscreen = false
      //   return
      // }
      console.log(444)
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.cancelFullScreen) {
        document.cancelFullScreen()
      }
      removeClass(el, 'fullscreen')
      this.emit('fullscreen', false)
      this.fullscreen = false
    },

    getFullscreen () {
      return (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement)
    },

    on (event, callback) {
      if (types.isString(event)) {
        this._events[event] = callback
        _ee.on(event, callback)
      } else if (Array.isArray(event)) {
        event.forEach((item) => {
          this._events[item] = callback
          _ee.on(item, callback)
        })
      }
    },
    emit (event, res) {
      _ee.emit(event, res)
    }

  }
}

export default mixins
