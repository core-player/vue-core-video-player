<template>
  <div class="vue-core-video-player-layer play-pause-layer">
    <div class="btn-control btn-play">
      <svg xmlns="http://www.w3.org/2000/svg" width="41" height="47" viewBox="0 0 41 47"><path d="M23.5,0,47,41H0Z" transform="translate(41) rotate(90)" fill="#ff6060"/></svg>
    </div>
    <div class="btn-control btn-pause">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48"><g transform="translate(-950 -398)"><rect width="12" height="48" transform="translate(950 398)" fill="#ff6060"/><rect width="12" height="48" transform="translate(974 398)" fill="#ff6060"/></g></svg>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PlayPauseLayer',
  props: {
    visible: Boolean
  }
}
</script>

<style>
.vue-core-video-player-layers {
  z-index: 11;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
}
.play-pause-layer .btn-control{
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 96px;
  height: 96px;
  margin-left: -48px;
  margin-top: -48px;
  background-color: #fff;
  border-radius: 48px;
}
.play-pause-layer .btn-control:before{
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 120px;
  height: 120px;
  margin-left: -60px;
  margin-top: -60px;
  border-radius: 60px;
  background-color: rgba(255,255,255, .25);
}
.play-pause-layer .btn-play svg{
  margin-left: 10px;
}
.play-pause-layer .btn-pause{
  display: none;
}
</style>
