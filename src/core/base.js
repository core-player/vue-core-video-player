import {
  EVENTS,
  DEFAULT_CONFIG,
  CORE,
  ERROR_CODE
} from '../constants'
import {
  isMobile,
  isAndroid,
  isTencentGroup,
  getMatchRangeTime
} from '../helper/util'
import { throwError } from '../helper/error'
import { removeAllChildrenNodes } from '../helper/dom'

const VIDEO_EVENTS = [
  'play',
  'playing',
  'timeupdate',
  'pause',
  'seeking',
  'waiting',
  'loadedmetadata',
  'loadeddata',
  'loadstart',
  'seeked',
  'ended',
  'durationchange',
  'progress',
  'canplaythrough',
  'volumechange'
]

const VIDEO_ATTRS = [
  'muted',
  'voloume',
  'loop',
  'preload'
]

class BaseVideoCore {
  constructor (config) {
    this.config = Object.assign(DEFAULT_CONFIG, config)
    this.parse(this.config)
    this.$video = this.config.videoEl
    this.$el = this.config.el
  }

  parse () {
    const { src, playList } = this.config
    this.initResolution(src, playList)
    this.initResolution()
  }

  checkSource (url) {
    if (!url) {
      const code = ERROR_CODE.NO_SOURCE.code
      this.emit(EVENTS.ERROR, {
        code
      })
      throwError(code)
    }
    if (/\.m3u8/.test(url)) {
      this.config.core = CORE.HLS
      this.config.hls = url
    }
    if (/\.mpd/.test(url)) {
      this.options.core = CORE.DASH
      this.source.dash = url
    }
  }

  init () {
    this.checkSource(this.config.src)
    this._autoRegisterEvents()
    this._setVideoAttr()
    this._setPlayer()
    this.emit(EVENTS.LIFECYCYLE_INITED)
  }

  _autoplay () {
    if (this.options.autoplay && !isMobile) {
      const _autoplayfn = () => {
        const promise = this.player.play()
        this.autoPlayPolicy(promise)
      }
      // hls should wait meta data loaded then trigger autoplay
      if (this.options.core === CORE.HLS) {
        this.emit(EVENTS.SERVICE_LOADING, true)
        return this.on(EVENTS.LOADEDMETADATA, () => {
          _autoplayfn()
        })
      }
      _autoplayfn()
    }
  }

  setSource (source) {
    // TODO
  }

  setResolution () {
    const { playList, defaultResolution } = this.config
    if (playList && playList.length > 1) {
      for (let i = 0; i < playList.length; i++) {
        if (playList[i].resolution === defaultResolution * 1) {
          this.source = Object.assign(this.source, {
            src: playList[i].url,
            ...playList[i]
          })
          const playStatus = this.isPlaying()
          const currentTime = this.getCurrentTime()
          this.$video.src = playList[i].url
          this.$video.load()
          if (playStatus && currentTime < 1) {
            this.$video.play()
          }
          // safety start
          let event = EVENTS.CANPLAYTHROUGH
          let seekCount = 0
          const fn = () => {
            // some qq browsers cannot trggier seeked event after "play" event
            if (isAndroid && isTencentGroup) {
              this.play()
              if (seekCount === 1) {
                this.seek(currentTime)
              }
              seekCount += 1
            } else {
              this.seek(currentTime)
            }
            if (isAndroid && isTencentGroup && !playStatus) {
              this.pause()
            }
            this.$video.removeEventListener(EVENTS.CANPLAYTHROUGH, fn)
            if (seekCount === 2) {
              this.$video.removeEventListener(EVENTS.DURATIONCHANGE, fn)
              seekCount = 0
            }
          }
          const seekedFn = () => {
            if (playStatus) {
              this.play()
            }
            this.$video.removeEventListener(EVENTS.SEEKED, seekedFn)
          }
          const playFn = () => {
            this.start()
            this.$video.removeEventListener(EVENTS.PLAYING, playFn)
          }
          // [HACK] there is bug when wechat play video trigger durationchange twice
          if (isAndroid && isTencentGroup) {
            event = EVENTS.DURATIONCHANGE
            this.play()
          }
          this.$video.addEventListener(event, fn)
          this.$video.addEventListener(EVENTS.SEEKED, seekedFn)
          this.$video.addEventListener(EVENTS.PLAY, playFn)
        }
      }
    }
  }

  setAudio (audio) {
    // TODO
  }

  _autoRegisterEvents () {
    VIDEO_EVENTS.forEach((item) => {
      this.$video.addEventListener(item, (e) => {
        // if (item !== 'timeupdate' && item !== 'progress') {
        //   console.log(item);
        // }
        const method = `on${item}`
        if (typeof this[method] === 'function') {
          this[method](e)
        }
        this.emit(item, {
          name: item,
          target: this.$video
        })
      })
    })
    this.$video.addEventListener('error', (e) => {
      // video set empty src is not error [chrome/firefox]
      if (!e.target.getAttribute('src')) {
        return
      }
      // logger.error(e);
      if (e.target.error && e.target.error.code) {
        this.emit('error', e.target.error)
        return
      }
      if (typeof e !== 'object') {
        e = {
          code: 5001,
          e
        }
      }
      this.emit('error', e)
    })
    this.on(EVENTS.CORE_TO_MP4, () => {
      this.downgradeCore()
    })
    this._bindProgressEvent()
  }

  _bindProgressEvent () {
    const { minPlayBUfferTime, safeBufferTime } = this.config
    const progressHandle = () => {
      if (!this.state.waiting_trigger) {
        return
      }
      const bufferTime = this.getBufferTime()
      const currentTime = this.getCurrentTime()
      const duration = this.getDuration()
      // nearly start
      if (currentTime < 2) {
        return
      }
      // nearly end
      if (duration - currentTime < minPlayBUfferTime) {
        return
      }
      const timeLose = bufferTime - currentTime
      if (bufferTime - currentTime < minPlayBUfferTime) {
        this.player.pause()
        this.state.waiting_pause = true
        this.emit(EVENTS.LOADING_START, true)
      } else if (this.state.waiting_pause && timeLose > safeBufferTime) {
        this.play()
        this.state.waiting_pause = false
      }
    }
    this.on(EVENTS.UI_PLAY, () => {
      this.state.waiting_pause = true
    })
    let firstPlay = false
    this.on(EVENTS.PLAY, () => {
      if (firstPlay) {
        return
      }
      firstPlay = true
      this.on(EVENTS.PROGRESS, progressHandle)
    })

    this.on(EVENTS.UI_PAUSE, () => {
      this.state.waiting_trigger = false
    })
    this.on(EVENTS.UI_PLAY, () => {
      this.state.waiting_trigger = true
    })
    // this.on('waiting', () => {
    //   const bufferTime = this.getBufferTime();
    //   const currentTime = this.getCurrentTime();
    // })
  }

  play () {
    this.$video.play()
  }

  pause () {
    this.$video.pause()
  }

  isPlaying () {
    return (!this.$video.paused && !this.$video.ended)
  }

  replay () {
    this.$video.play()
  }

  seek (time) {
    this.$video.currentTime = time
  }

  onended () {
    const { loop } = this.config
    if (!loop) {
      return
    }
    this.player.play()
  }

  getDuration () {
    if (!this.$video) {
      return 0
    }
    return this.$video.duration || 0
  }

  getCurrentTime () {
    const time = this.$video.currentTime || 0
    return time
  }

  getBufferTime () {
    const video = this.$video
    const currentTime = this.getCurrentTime()
    return getMatchRangeTime(currentTime, video.buffered)
  }

  getProgress () {
    if (!this.getCurrentTime()) {
      return 0
    }
    return (this.getCurrentTime() / this.getDuration() * 100).toFixed(2) || 0
  }

  getVolume () {
    if (!this.$video) {
      return 1
    }
    return this.$video.volume
  }

  getVideoAttr (attr) {
    return this.$video[attr]
  }

  setVideoAttr (attr, val) {
    this.$video[attr] = val
  }

  _setVideoAttr () {
    if (isMobile) {
      this.$video.setAttribute('x5-video-player-type', 'h5')
      this.$video.setAttribute('x5-video-player-fullscreen', false)
    }
    this.$video.loop = false
    VIDEO_ATTRS.forEach((item) => {
      if (this.options[item]) {
        // this.$video.setAttribute(item, this.options[item]);
        this.$video[item] = this.options[item]
      }
    })
  }

  autoPlayPolicy (promise) {
    if (promise !== undefined) {
      promise.catch((error) => {
        this.emit(EVENTS.AUTOPLAYERROR, error)
        this.options.autoplay = false
      }).then(() => {
        // Auto-play started
      })
    }
  }

  setVolume (value) {
    this.$video.volume = value
  }

  setMuted (value) {
    this.$video.muted = value
    if (value) {
      this.emit(EVENTS.VOLUMECHANGE, true)
    }
  }

  initResolution (videoUrl, medias = []) {
    const { resolution } = this.config
    // eslint-disable-next-line prefer-destructuring
    const length = medias.length
    // this._setFormatMedias(medias)
    const newMedias = [].concat(medias);
    newMedias.sort((a, b) => {
      if (a.resolution < b.resolution) {
        return 1
      }
      return -1
    })
    this.medias = newMedias
    for (let i = 0; i < length; i++) {
      // resolution.innerHTML = `${newMedias[i].resolution}p`;
      if (newMedias[i].url === videoUrl) {
        Object.assign(this.source, {
          src: newMedias[i].url,
          ...newMedias[i]
        })
      }
      if (!videoUrl && newMedias[i].resolution === resolution) {
        Object.assign(this.source, {
          src: newMedias[i].url,
          ...newMedias[i]
        })
      }
      // use the last one
      if (!this.source.src) {
        // const last = length - 1;
        Object.assign(this.source, {
          src: newMedias[i].url,
          ...newMedias[i]
        })
      }
    }
  }

  destroy () {
    this.pause()
    removeAllChildrenNodes(this.el)
  }

  getVideoElement () {
    return this.$video
  }

  static set debug (value) {
    if (value) {
      localStorage.__vrplayer_debug = true
    } else {
      localStorage.__vrplayer_debug = ''
    }
  }
}

window.VCPVideoCore = BaseVideoCore

export default BaseVideoCore
