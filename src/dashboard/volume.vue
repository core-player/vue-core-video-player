<template>
  <div class="vue-core-video-player-control volume-control">
    <div class="btn-control btn-volume">
      <svg xmlns="http://www.w3.org/2000/svg" width="23.542" height="23" viewBox="0 0 23.542 23"><path data-name="15" fill="#fff" d="M0 5.5h7v12H0z"/><path data-name="3" d="M.5 11.5L12.5 0v23z" fill="#fff"/><g data-name="12 1" fill="none" stroke="#fff" stroke-width="1.5"><path data-name="2" d="M15.787 8.349a2.89 2.89 0 0 1 3.04 3.126 2.763 2.763 0 0 1-3.142 2.833" stroke-width="1.50021"/><path data-name="3" d="M16.052 4.807s6.917-.147 6.61 6.796-6.83 6.16-6.83 6.16" stroke-width="1.50021"/></g></svg>
      <span class="tips">音量</span>
    </div>
    <div class="btn-control btn-mute">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48"><g transform="translate(-950 -398)"><rect width="12" height="48" transform="translate(950 398)" fill="#fff"/><rect width="12" height="48" transform="translate(974 398)" fill="#ff6060"/></g></svg>
      <span class="tips">静音</span>
    </div>

    <div class="btn-control-panel" style="display:block;">
      <div class="progress">
        <div class="volume-current">
          <div class="thumb-drag"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Volume',
  props: {
    visible: Boolean
  }
}
</script>

<style lang="less">
.vue-core-video-player-control {
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  .btn-mute{
    display: none;
  }
  svg{
    width: 20px;
  }
}
.volume-control{
  .btn-control-panel{
    display: block;
    width: 40px;
    height: 150px;
    .progress{
      position: absolute;
      width: 4px;
      height: 100px;
      left: 50%;
      top: 50%;
      margin-left: -2px;
      margin-top: -50px;
      background-color: rgba(255, 255, 255, .7);
      .volume-current{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 50%;
        width: 100%;
        background-color: #ff6060;
        .thumb-drag{
          opacity: 0;
          position: absolute;
          left: 50%;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #fff;
          transform: translateY(-50%) translateX(-50%);
          transition: height .05s ease .15s;
          &:before{
            content: '';
            display: inline-block;
            position: absolute;
            top: -2px;
            left: -2px;
            width: 14px;
            height: 14px;
            border-radius: 7px;
            background-color: rgba(255, 255, 255, .3);
          }
        }
      }
      &:hover{
        .thumb-drag{
          opacity: 1;
        }
      }
    }
  }
}
</style>
