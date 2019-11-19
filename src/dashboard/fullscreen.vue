<template>
  <div class="vue-core-video-player-control">
    <div v-if="!fullscreen" class="btn-control btn-fullscreen" @click="enterFullscreen">
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="20" viewBox="0 0 28 20"><g fill="#fff"><g data-name="6 7"><g data-name="4 1"><path data-name="7" d="M16 0h10v2H16z"/><path data-name="8" d="M26 0h2v6h-2z"/></g><g data-name="5 1"><path data-name="9" d="M18 18h10v2H18z"/><path data-name="10" d="M26 14h2v6h-2z"/></g></g><g data-name="6 8"><g data-name="4 1"><path data-name="7" d="M12 20H2v-2h10z"/><path data-name="8" d="M2 20H0v-6h2z"/></g><g data-name="5 1"><path data-name="9" d="M10 2H0V0h10z"/><path data-name="10" d="M2 6H0V0h2z"/></g></g></g></svg>
      <div class="tips">进入全屏</div>
    </div>
    <div class="btn-control btn-off-fullscreen" @click="cancelFullscreen">
      <svg v-if="fullscreen"  xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18"><g fill="#fff"><g data-name="6 9"><g data-name="4 1"><path data-name="7" d="M15 5h10v2H15z"/><path data-name="8" d="M15 0h2v6h-2z"/></g><g data-name="5 1"><path data-name="9" d="M15 12h10v2H15z"/><path data-name="10" d="M15 12h2v6h-2z"/></g></g><g data-name="6 10"><g data-name="4 1"><path data-name="7" d="M10 14H0v-2h10z"/><path data-name="8" d="M10 18H8v-6h2z"/></g><g data-name="5 1"><path data-name="9" d="M10 6H0V4h10z"/><path data-name="10" d="M10 6H8V0h2z"/></g></g></g></svg>
      <span class="tips">退出全屏</span>
    </div>
  </div>
</template>

<script>
import EVENTS from '../constants/EVENTS'
import coreMixins from '../mixins'

export default {
  name: 'Fullscreen',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less">
.vue-core-video-player-control {
  .btn-fullscreen {
    svg{
      width: 20px;
    }
  }
}
</style>
