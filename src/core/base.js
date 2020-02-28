import {
  EVENTS,
  DEFAULT_CONFIG,
  VIDEO_FORMAT,
  ERROR_CODE
} from '../constants'
import {
  isMobile,
  isAndroid,
  isTencentGroup,
  getMatchRangeTime
} from '../helper/util'
// import { throwError } from '../helper/error'
import { removeAllChildrenNodes, addClass } from '../helper/dom'
import { parseMediaList, checkVideoPlayType } from '../helper/media'

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
  'volume',
  'loop',
  'preload'
]

class BaseVideoCore {
  constructor (config) {
    this.config = Object.assign(DEFAULT_CONFIG, config)
    this.$video = this.config.videoEl
    this.$el = this.config.el
    this._eventEmitter = config.eventEmitter
    this.state = {}
    if (this.checkSource()) {
      this.parse()
      this.init()
    }
  }

  parse () {
    const { src } = this.config
    this.initResolution(src)
    this.initVideoType()
  }

  checkSource () {
    const { src } = this.config
    if (!src) {
      const code = ERROR_CODE.NO_SOURCE.code
      this.emit(EVENTS.ERROR, {
        code
      })
      return false
    } else if (Array.isArray(src)) {
      if (!src[0] || !src[0].src) {
        return false
      }
    }
    return true
  }

  init () {
    this.checkSource(this.config.src)
    this._autoRegisterEvents()
    this._setVideoAttr()
    this.setSize()
    this.emit(EVENTS.LIFECYCLE_INITED)
    this._autoplay()
  }

  setSize () {
    const width = this.$el.offsetWidth
    let size = ''
    if (width <= 763) {
      size = 'small'
    }
    addClass(this.$el, size)
  }

  _autoplay () {
    if (this.config.autoplay && !isMobile) {
      const _autoPlayFn = () => {
        const promise = this.play()
        this.autoPlayPolicy(promise)
      }
      _autoPlayFn()
    }
  }

  setConfig (prop, value) {
    if (VIDEO_ATTRS.indexOf(prop) >= 0) {
      this.config[prop] = value
      this.$video[prop] = value
    }
  }

  setSource (source) {
    // TODO
  }

  initResolution (source, medias = []) {
    const { resolution } = this.config
    this.medias = parseMediaList(source)
    this.medias.forEach((media) => {
      if (media.resolution === resolution) {
        this.config.src = media.src
      }
    })
    this.resolution = resolution
    setTimeout(() => {
      this.emit(EVENTS.SOURCE_UPDATED)
    }, 200)
  }

  initVideoType () {
    const findType = (type) => {
      for (let j = 0; j < this.medias.length; j++) {
        if (this.medias[j].type === type) {
          return this.medias[j]
        }
      }
    }
    for (let i = 0; i < VIDEO_FORMAT.length; i++) {
      const item = findType(VIDEO_FORMAT[i])
      if (checkVideoPlayType(VIDEO_FORMAT[i], this.$video) && item) {
        this.config.src = item.src
        this.$video.src = this.config.src
        this.resolution = ''
        this.medias = [
          item
        ]
        return
      }
    }
  }

  setResolution (resolution) {
    const { medias } = this
    if (medias && medias.length > 1) {
      for (let i = 0; i < medias.length; i++) {
        if (medias[i].resolution === resolution) {
          this.resolution = resolution
          const playStatus = this.isPlaying()
          const currentTime = this.getCurrentTime()
          this.$video.src = medias[i].src
          this.emit(EVENTS.SOURCE_UPDATED)
          this.$video.load()
          if (playStatus && currentTime < 1) {
            this.$video.play()
          }
          // safety start
          let event = EVENTS.CANPLAYTHROUGH
          let seekCount = 0
          const fn = () => {
            // some QQ X5 browsers cannot trigger seeked event after "play" event
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
        const error = Object.assign({}, e.target.error, {
          code: '250' + e.target.error.code
        })
        this.emit('error', error)
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
    return this.$video.play()
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

  requestPictureInPicture () {
    const video = this.$video
    try {
      if (video !== document.pictureInPictureElement) {
        video.requestPictureInPicture()
      } else {
        document.exitPictureInPicture()
      }
    } catch (err) {
      console.error(err)
    }
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
      if (this.config[item]) {
        // this.$video.setAttribute(item, this.options[item]);
        this.$video[item] = this.config[item]
      }
    })
  }

  autoPlayPolicy (promise) {
    if (promise !== undefined) {
      promise.catch((error) => {
        this.emit(EVENTS.ERROR_AUTO_PLAY, error)
        this.config.autoplay = false
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

  setSpeed (value) {
    this.$video.playbackRate = value
  }

  destroy () {
    this.pause()
    removeAllChildrenNodes(this.el)
  }

  getVideoElement () {
    return this.$video
  }

  on (key, callback) {
    this._eventEmitter.on(key, callback)
  }

  emit (key, data) {
    this._eventEmitter.emit(key, data)
  }

  static set debug (value) {
    if (value) {
      localStorage._vueCorePlayerDebug = true
    } else {
      localStorage._vueCorePlayerDebug = ''
    }
  }
}

window.VCPVideoCore = BaseVideoCore

export default BaseVideoCore
