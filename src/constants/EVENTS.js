// import { HLS_EVENTS} from './module/hls';

const EVENTS = {
  ERROR_NO_MEDIA: 'ERROR_NO_MEDIA',
  AUTOPLAYERROR: 'AUTOPLAYERROR',
  VRMODE: 'vrmode',
  SERVICE_LOADING: 'service_loading',
  SERVICE_ENDED: 'service_ended',
  LOADING_START: 'loading_start',
  LOADING_END: 'loading_end',
  LIFECYCYLE_INITING: 'lifecycle_initing',
  LIFECYCYLE_INITED: 'lifecycle_inited',
  LIFECYCYLE_PARSED: 'lifecycle_parse',
  LIFECYCYLE_STOP: 'lifecycle_stop',
  // UI
  UI_DASHBOARD_SHOW: 'ui_dashboard_show',
  UI_DASHBOARD_HIDE: 'ui_dashboard_hide',
  SCRUBSTART: 'scrubstart',
  SCRUBEND: 'scrubend',
  UI_PLAY: 'ui_play',
  UI_PAUSE: 'ui_pause',
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
  RESOLUTION_UPDATE: 'resolution_update'
  // hls events docs: https://github.com/video-dev/hls.js/blob/master/src/events.js
  // ...HLS_EVENTS
}

export default EVENTS
