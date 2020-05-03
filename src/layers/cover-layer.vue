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
      cover: 'data:image/gif;base64,R0lGODlhAgACAIAAADMzMwAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgNzkuMTY0MzUyLCAyMDIwLzAxLzMwLTE1OjUwOjM4ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjEuMSAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMEQ4MDk3RDgzRTUxMUVBOEFBNkNFRTA4ODA0RDY3OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMEQ4MDk3RTgzRTUxMUVBOEFBNkNFRTA4ODA0RDY3OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjIwRDgwOTdCODNFNTExRUE4QUE2Q0VFMDg4MDRENjc4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIwRDgwOTdDODNFNTExRUE4QUE2Q0VFMDg4MDRENjc4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkEAAAAAAAsAAAAAAIAAgAAAgKEUQA7',
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
    object-fit: cover;
  }
}
</style>
