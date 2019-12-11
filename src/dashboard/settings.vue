<template>
  <div class="vue-core-video-player-control settings-control">
    <div class="btn-control btn-settings" @click="toggle">
      <svg xmlns="http://www.w3.org/2000/svg" width="31.971" height="31.971" viewBox="0 0 31.971 31.971"><g data-name="7" transform="translate(6.985 6.985)" fill="none" stroke="#fff" stroke-width="5"><circle cx="9" cy="9" r="9" stroke="none"/><circle cx="9" cy="9" r="6.5"/></g><g data-name="15 10" fill="#fff"><g data-name="14 1"><g data-name="13 1"><path data-name="17" d="M13.985 3.985h4v3h-4z"/><path data-name="4" d="M15.985 3.985l3 4h-6z"/></g><g data-name="13 2"><path data-name="17" d="M17.985 27.985h-4v-3h4z"/><path data-name="4" d="M15.985 27.985l-3-4h6z"/></g></g><g data-name="14 2"><g data-name="13 1"><path data-name="17" d="M23.056 6.085l2.829 2.829-2.122 2.12-2.828-2.828z"/><path data-name="4" d="M24.47 7.5l-.707 4.95-4.242-4.244z"/></g><g data-name="13 2"><path data-name="17" d="M8.914 25.884l-2.828-2.828 2.12-2.122 2.83 2.829z"/><path data-name="4" d="M7.5 24.47l.707-4.95 4.243 4.243z"/></g></g></g><g data-name="15 11" fill="#fff"><g data-name="14 1"><g data-name="13 1"><path data-name="17" d="M23.056 6.086l2.828 2.828-2.12 2.122-2.83-2.829z"/><path data-name="4" d="M24.47 7.5l-.707 4.95-4.242-4.243z"/></g><g data-name="13 2"><path data-name="17" d="M8.914 25.885l-2.828-2.828 2.12-2.122 2.83 2.829z"/><path data-name="4" d="M7.5 24.47l.707-4.949 4.242 4.243z"/></g></g><g data-name="14 2"><g data-name="13 1"><path data-name="17" d="M27.985 13.985v4h-3v-4z"/><path data-name="4" d="M27.985 15.985l-4 3v-6z"/></g><g data-name="13 2"><path data-name="17" d="M3.985 17.985v-4h3v4z"/><path data-name="4" d="M3.985 15.985l4-3v6z"/></g></g></g><g data-name="15 12" fill="#fff"><g data-name="14 1"><g data-name="13 1"><path data-name="17" d="M27.985 13.985v4h-3v-4z"/><path data-name="4" d="M27.985 15.985l-4 3v-6z"/></g><g data-name="13 2"><path data-name="17" d="M3.985 17.985v-4h3v4z"/><path data-name="4" d="M3.985 15.985l4-3v6z"/></g></g><g data-name="14 2"><g data-name="13 1"><path data-name="17" d="M25.885 23.056l-2.829 2.829-2.12-2.122 2.828-2.828z"/><path data-name="4" d="M24.47 24.47l-4.95-.707 4.244-4.242z"/></g><g data-name="13 2"><path data-name="17" d="M6.086 8.914l2.828-2.828 2.122 2.12-2.829 2.83z"/><path data-name="4" d="M7.5 7.5l4.95.707-4.243 4.243z"/></g></g></g></svg>
    </div>
    <div class="btn-control-panel" v-show="panelShow">
      <ul>
        <li>
          <span class="item-name">
            {{$t('dashboard.settings.autoplay')}}
          </span>
          <div class="item-control">
            <widgets-switch></widgets-switch>
          </div>
        </li>
        <li>
          <span class="item-name" >{{$t('dashboard.settings.loop')}}</span>
          <div class="item-control">
            <widgets-switch></widgets-switch>
          </div>
        </li>
        <li>
          <span class="item-name">Speed</span>
          <div></div>
        </li>
        <li>
          <span class="item-name">Resolution</span>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Switch from '../widgets/switch.vue'
import coreMixins from '../mixins'

export default {
  name: 'Settings',
  props: {
    visible: Boolean
  },
  mixins: [coreMixins],
  components: {
    'widgets-switch': Switch
  },
  data() {
    return {
      panelShow: false
    }
  },

  methods: {
    toggle() {
      this.panelShow = !this.panelShow;
    }
  }
}
</script>

<style lang="less">
.settings-control {
  .btn-mute{
    display: none;
  }
  .btn-settings{
    svg{
      width: 24px;
      margin-top: -2px;
    }
  }
  .btn-control-panel{
    left: -180px;
    width: 220px;
    height: 160px;
    transform: translateX(0);
  }
}
</style>
