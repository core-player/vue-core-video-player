import ee from 'event-emitter'
import EVENTS from './constants/EVENTS'
import * as types from './helper/type'
import { addClass, removeClass, registerFullScreenChangeListener } from './helper/dom'
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
    this.on(EVENTS.LIFECYCLE_INITING, ($player) => {
      this.$player = $player
      this.$container = this.$player.$el
    })
    this.on(EVENTS.PLAY, () => {
      this.isPlaying = true
    })
    this.on(EVENTS.PAUSE, () => {
      this.isPlaying = false
    })
    registerFullScreenChangeListener((isFullScreen) => {
      if (isFullScreen) {
        addClass(this.$container, 'fullscreen')
        this.emit('fullscreen', true)
      } else {
        removeClass(this.$container, 'fullscreen')
        this.emit('fullscreen', false)
      }
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
      const el = this.$container
      if (el.mozRequestFullScreen) {
        el.mozRequestFullScreen()
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
      } else if (el.requestFullScreen) {
        el.requestFullscreen()
      }
      this.fullscreen = true
    },
    cancelFullscreen (isManual) {
      // if (isManual) {
      //   this.emit('fullscreen', false)
      //   removeClass(el, 'fullscreen')
      //   this.fullscreen = false
      //   return
      // }
      if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.cancelFullScreen) {
        document.cancelFullScreen()
      }
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
    },
    off (event, callback) {
      _ee.off(event, callback)
    },
    removeAllEvents () {
      for (let item in this._events) {
        _ee.off(item, this._events[item])
      }
    },
    addClass (cls) {
      this.$container.classList.remove(cls)
    },
    removeClass (cls) {
      this.$container.classList.remove(cls)
    }
  },
  beforeDestroy () {
    this.removeAllEvents()
  }
}

export default mixins
