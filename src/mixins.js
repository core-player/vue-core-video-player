import * as types from './helper/type'
import { getVideoCore } from './core'

const mixins = {
  data () {
    return {
      show: false
    }
  },

  created () {
    if (!this.$player) {
      this.$player = this.player = getVideoCore(this._coreID)
    }
  },

  _events: {},

  methods: {
    play () {
      this.$player.play()
    },

    on (event, callback) {
      if (types.isString(event)) {
        this._events[event] = callback
        this.player.on(event, callback)
      } else if (Array.isArray(event)) {
        event.forEach((item) => {
          this._events[item] = callback
          this.player.on(item, callback)
        })
      }
    },
    fire (event, callback) {
      if (types.isString(event)) {
        delete this._events[event]
        this.player.fire(event, callback)
      } else if (Array.isArray(event)) {
        event.forEach((item) => {
          delete this._events[item]
          this.player.fire(item, callback)
        })
      }
    },
    emit (event, res) {
      this.player.emit(event, res)
    },
    once (event, callback) {
      this.player.once(event, callback)
    },

  }
}

export default mixins
