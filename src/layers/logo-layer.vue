<template>
  <div class="vcp-layer logo-layer">
    <div class="logo-wrap">
      <img alt="logo" :src="src" />
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
      src: '/logo-white.png'
    }
  }
}
</script>

<style lang="less">
.logo-layer {
  z-index: 11;
  text-align: left;
  .logo-wrap{
    position: absolute;
    top: 15px;
    right: 15px;
    opacity: .7;
    text-align: right;
    img {
      max-width: 160px;
      height: 48px;
    }
  }
}
</style>
