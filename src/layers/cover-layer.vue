<template>
  <div class="vcp-layer cover-layer">
    <img alt="video cover" src="/cover01.jpg" />
  </div>
</template>

<script>

export default {
  name: 'CoverLayer',
  props: {
    visible: Boolean
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
