<template>
  <div class="vue-core-video-player-control">
    <div v-if="isPlaying" class="btn-control btn-pause" @click="pause">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48"><g transform="translate(-950 -398)"><rect width="12" height="48" transform="translate(950 398)" fill="#fff"/><rect width="12" height="48" transform="translate(974 398)" fill="#fff"/></g></svg>
      <span class="tips">{{$t('dashboard.btn.pause')}}</span>
    </div>
    <div v-else class="btn-control btn-play" @click="play" >
      <svg xmlns="http://www.w3.org/2000/svg" width="41" height="47" viewBox="0 0 41 47"><path d="M23.5,0,47,41H0Z" transform="translate(41) rotate(90)" fill="#fff"/></svg>
      <span class="tips">{{$t('dashboard.btn.play')}}</span>
    </div>
  </div>
</template>

<script>
import coreMixins from '../mixins'

export default {
  name: 'PlayPauseControl',
  mixins: [coreMixins],
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less">
.vue-core-video-player-control {
  .btn-pause{
    margin-left: 20px;
    svg{
      width: 16px;
    }
  }
  .btn-play{
    margin-left: 20px;
    svg{
      width: 16px;
    }
  }

}
</style>
