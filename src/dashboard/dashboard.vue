<template>
  <div class="vcp-dashboard" ref="dashboard">
    <Progress />
    <Controls />
  </div>
</template>

<script>
import Progress from './progress'
import Controls from './controls'
import coreMixins from '../mixins'

export default {
  name: 'Dashboard',
  components: {
    Progress,
    Controls
  },
  props: {
    visible: Boolean
  },
  mixins: [coreMixins],
  mounted () {
    console.log(this.$refs['dashboard'].offsetWidth)
  }
}
</script>

<style>
.vcp-dashboard {
  z-index: 11;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 59px;
  background: rgba(0,0,0,.5);
}
.fullscreen .vcp-dashboard {
  bottom: 60px;
  width: 1182px;
  left: 50%;
  margin-left: -591px;
}
.small  .vcp-dashboard{
  height: 49px;
}
.small  .vcp-dashboard .vcp-controls {
  height: 40px;
}
</style>
