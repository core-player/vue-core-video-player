<template>
  <div class="vcp-dashboard" autoplay v-show="show" ref="dashboard">
    <Progress :playerKey="playerKey"/>
    <Controls :muted="muted"  :playerKey="playerKey"/>
  </div>
</template>

<script>
import { DEFAULT_CONFIG, EVENTS } from '../constants'
import { isDescendant } from '../helper/dom'
import { isMobile } from '../helper/util'
import Progress from './progress'
import Controls from './controls'
import coreMixins from '../mixins'

const pageCoor = {
  x: null,
  y: null
}

export default {
  name: 'Dashboard',
  components: {
    Progress,
    Controls
  },
  props: {
    controls: [Boolean, String],
    muted: Boolean,
    playerKey: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      show: true
    }
  },
  mixins: [coreMixins],
  created () {
    this._playerKey = this.playerKey
  },
  methods: {
    showDashboard (delay) {
      window.clearTimeout(this._hideTimeout)
      this.show = true
      this.emit(EVENTS.UI_DASHBOARD_SHOW)
      if (delay === 0) {
        // TODO handle force show
      } else {
        this._hideTimeout = setTimeout(() => {
          this.hideDashboard()
        }, delay || DEFAULT_CONFIG.dashboardHideDelay)
      }
    },
    hideDashboard () {
      this.show = false
      this.emit(EVENTS.UI_DASHBOARD_HIDE)
    },
    _initAutoMode () {
      const $parent = this.$refs['dashboard'].parentNode
      if (isMobile) {
        $parent.addEventListener('touchend', this._onTouchend.bind(this), true)
      } else {
        $parent.addEventListener('mousemove', this._onMousemove.bind(this))
        $parent.addEventListener('mouseleave', this._onMouseleave.bind(this))
        $parent.addEventListener('mouseover', this._onMouseover.bind(this), true)
      }
      // first render delay
      this.showDashboard(4000)
    },
    _onMousemove (e) {
      if (e.pageX === pageCoor.x && e.pageY === pageCoor.y) {
        pageCoor.x = e.pageX
        pageCoor.y = e.pageY
        return
      }
      pageCoor.x = e.pageX
      pageCoor.y = e.pageY
      if (isDescendant(this._el, e.target)) {
        return this.showDashboard(0)
      }
      this.showDashboard()
    },

    _onMouseleave () {
      this.showDashboard()
    },
    _onMouseover () {
      this.showDashboard(0)
    },
    _onTouchend () {
      this.showDashboard()
    }
  },
  mounted () {
    const { controls } = this
    if (!controls) {
      this.show = false
    } else if (controls === 'fixed') {
      this.show = true
    } else {
      this._initAutoMode()
    }
  }
}
</script>

<style>
.vcp-dashboard {
  z-index: 11;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 59px;
  background: rgba(0,0,0,.5);
}
.fullscreen .vcp-dashboard {
  bottom: 60px;
  width: 1182px;
  left: 50%;
  margin-left: -591px;
}
.small  .vcp-dashboard{
  height: 49px;
}
.settings-open .vcp-dashboard {
  display: block !important;
}
.small  .vcp-dashboard .vcp-controls {
  height: 40px;
}
</style>
