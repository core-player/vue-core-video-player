<template>
  <div class="vcp-layer error-layer" v-show="show">
   <div class="error-icon">
     <svg xmlns="http://www.w3.org/2000/svg" width="194" height="194" viewBox="0 0 194 194"><g data-name="组 4" transform="translate(-850 -223)"><circle data-name="椭圆 11" cx="97" cy="97" r="97" transform="translate(850 223)" fill="#ff6060"/><g data-name="矩形 47" fill="#fff" stroke="#ccc"><path stroke="none" d="M864 310h17v13h-17z"/><path fill="none" d="M864.5 310.5h16v12h-16z"/></g><g data-name="组 5" fill="#fff" stroke="#707070"><g data-name="矩形 48" transform="translate(870 313)"><path stroke="none" d="M0 0h1v2H0z"/><rect x=".5" y=".5" height="1" fill="none"/></g><g data-name="矩形 49" transform="translate(874 313)"><path stroke="none" d="M0 0h1v2H0z"/><rect x=".5" y=".5" height="1" fill="none"/></g></g><g data-name="矩形 50" transform="translate(872 317)" fill="#fff" stroke="#707070"><path stroke="none" d="M0 0h1v2H0z"/><rect x=".5" y=".5" height="1" fill="none"/></g><g data-name="矩形 51" transform="translate(875 319)" fill="#fff" stroke="#707070"><path stroke="none" d="M0 0h1v2H0z"/><rect x=".5" y=".5" height="1" fill="none"/></g><path data-name="路径 10" d="M879.5 328.5s8.228 10.764 0 17.566 11.856 7.948 11.856 7.948 1.681 6.365-5.264 15.856 20.577-1.755 20.577-1.755l19.186 9.7L939.97 357.3" fill="none" stroke="#000" stroke-width="2"/><g data-name="矩形 52" transform="translate(869 319)" fill="#fff" stroke="#707070"><path stroke="none" d="M0 0h1v2H0z"/><rect x=".5" y=".5" height="1" fill="none"/></g><g data-name="矩形 53" fill="#fff" stroke="#000" stroke-width="2"><path stroke="none" d="M910 297h112v70H910z"/><path fill="none" d="M911 298h110v68H911z"/></g><g data-name="组 6"><path data-name="矩形 54" d="M932 372h67v3h-67z"/><path data-name="矩形 56" d="M939 367h2v5h-2z"/><path data-name="矩形 57" d="M990 367h2v5h-2z"/></g><g data-name="组 8"><path data-name="矩形 58" d="M876.117 329.526l6.344-2.958 1.268 2.719-6.344 2.958z"/><path data-name="矩形 59" fill="#ccc" d="M876.178 327.291l.906-.423.845 1.813-.906.423z"/><path data-name="路径 9" d="M879.803 325.6l.906-.422.846 1.813-.907.422z" fill="#ccc"/></g><text data-name="Error !" transform="translate(923 322)" fill="#ff6060" font-size="18" font-family="ArialMT, Arial"><tspan x="0" y="16">Error !</tspan></text></g></svg>
   </div>
   <div class="error-msg-wrap">
     <h2>{{$t('layers.error.title')}}</h2>
     <p class="error-msg">{{errMsg}}</p>
   </div>
  </div>
</template>

<script>

export default {
  name: 'CoverLayer',
  props: {
    visible: Boolean
  },
  data () {
    return {
      errMsg: 'Cannot find video source',
      show: false
    }
  }
}
</script>

<style lang="less">
.error-layer {
  z-index: 12;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: url(data:image/png;base64,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);
  background-color:#333;
  background-repeat: repeat;
  .error-icon {
    width: 194px;
    margin: -40px auto 0;
  }
  .error-msg{
    color: rgba(255, 255, 255, .7);
  }
}
</style>
