<template>
  <div class="vcp-switch" :class="{ open: isOpen}" @click="toggle"></div>
</template>

<script>

export default {
  name: 'switch',
  props: {
    change: Function
  },

  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    toggle () {
      this.isOpen = !this.isOpen
      if (typeof this.change === 'function') {
        this.change(this.isOpen)
      }
    }
  }
}
</script>

<style lang="less">
.vcp-switch{
  display: inline-block;
  position: relative;
  width: 40px;
  height: 16px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  &:after{
    content: '';
    display: inline-block;
    position: absolute;
    top: 1px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #ff6060;
    transition: left .2s ease-in .05s;
  }
  &.open{
    &:after{
      left: 23px;
    }
  }
}
</style>
