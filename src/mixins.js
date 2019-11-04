import ee from 'event-emitter'
import EVENTS from './constants/EVENTS'
import * as types from './helper/type'
// import eventBus from './helper/eve'
// import { getVideoCore } from './core'
const _ee = ee()

const mixins = {
  data () {
    return {
      show: false,
      _coreID: ''
    }
  },

  created () {
    this.on(EVENTS.LIFECYCYLE_INITING, ($player) => {
      this.$player = $player
    })
  },

  _events: {},

  methods: {
    play () {
      console.log(this);
      this.$player.play()
    },

    pause () {
      this.$player.pause()
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
