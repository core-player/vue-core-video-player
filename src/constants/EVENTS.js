// import { HLS_EVENTS} from './module/hls';

const ERROR = {
  ERROR_NO_MEDIA: 'ERROR_NO_MEDIA',
  ERROR_AUTO_PLAY: 'ERROR_AUTO_PLAY'
}

const LIFE_CYCLE = {
  LIFECYCLE_INITING: 'lifecycle_initing',
  LIFECYCLE_INITED: 'lifecycle_inited',
  LIFECYCLE_PARSED: 'lifecycle_parse',
  LIFECYCLE_STOP: 'lifecycle_stop'
}

const SOURCE = {
  SOURCE_UPDATED: 'SOURCE_UPDATED'
}

const UI = {
  // UI
  UI_DASHBOARD_SHOW: 'ui_dashboard_show',
  UI_DASHBOARD_HIDE: 'ui_dashboard_hide',
  UI_PLAY: 'ui_play',
  UI_PAUSE: 'ui_pause'
}

const EVENTS = {
  ...ERROR,
  ...LIFE_CYCLE,
  ...SOURCE,
  ...UI,
  SERVICE_LOADING: 'service_loading',
  SERVICE_ENDED: 'service_ended',
  LOADING_START: 'loading_start',
  LOADING_END: 'loading_end',

  // PLUGIN AND CORE
  CORE_TO_MP4: 'core_to_mp4',
  // media events
  PLAY: 'play',
  PAUSE: 'pause',
  LOADEDDATA: 'loadeddata',
  CANPLAYTHROUGH: 'canplaythrough',
  ERROR: 'error',
  DURATIONCHANGE: 'durationchange',
  ENDED: 'ended',
  TIMEUPDATE: 'timeupdate',
  LOADEDMETADATA: 'loadedmetadata',
  WAITING: 'waiting',
  PLAYING: 'playing',
  RETRY: 'retry',
  SEEKED: 'seeked',
  SEEKING: 'seeking',
  VOLUMECHANGE: 'volumechange',
  EXIT: 'exit',
  PROGRESS: 'progress',
  LOADSTART: 'loadstart',
  RESOLUTION_UPDATE: 'resolution_update'
  // hls events docs: https://github.com/video-dev/hls.js/blob/master/src/events.js
  // ...HLS_EVENTS
}

export default EVENTS
