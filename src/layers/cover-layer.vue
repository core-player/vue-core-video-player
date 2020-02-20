<template>
  <div class="vcp-layer cover-layer" v-show="show">
    <img alt="video cover" :src="cover" />
  </div>
</template>

<script>
import { EVENTS } from '../constants'
import coreMixins from '../mixins'

export default {
  name: 'CoverLayer',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  },
  data () {
    return {
      cover: 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACwAAAAAAQABAAACAkQBADs=',
      show: false
    }
  },
  mounted () {
    this.on(EVENTS.LIFECYCLE_INITING, () => {
      const { cover } = this.$player.config
      if (cover) {
        this.cover = cover
      }
    })
    this.on(EVENTS.ERROR_AUTO_PLAY, () => {
      this.show = true
    })
    this.on(EVENTS.PLAY, () => {
      this.show = false
    })
  }
}
</script>

<style lang="less">
.cover-layer {
  z-index: 11;
  background-color: #333;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
