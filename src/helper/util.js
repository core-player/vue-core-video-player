import isMobileJS from 'ismobilejs'

const ua = navigator.userAgent.toLowerCase()

export function isMobileInLandscapeOrientation () {
  // functionality required for mobile only
  if (!isMobileJS.any) {
    return true
  }

  // use draft screen.orientation type to determine if mobile is landscape orientation
  const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation
  if (orientation) {
    if (orientation.type === 'landscape-primary' || orientation.type === 'landscape-secondary') {
      return true
    } else if (
      orientation.type === 'portrait-secondary' ||
      orientation.type === 'portrait-primary'
    ) {
      return false
    }
  }

  // fall back to window.orientation
  if (!window.orientation) {
    return false
  }
  let quadrant = Math.round(window.orientation / 90)
  while (quadrant < 0) {
    quadrant += 4
  }
  while (quadrant >= 4) {
    quadrant -= 4
  }
  return quadrant === 1 || quadrant === 3
};

export function generateID () {
  return 'xxxxxxxx-4xxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
};

export function timeToSeconds (str) {
  const arr = str.split(':')
  return arr[0] * 3600 + arr[1] * 60 + arr[2] * 1
};

export function paddingLeadZero (num) {
  if (num < 10) {
    return `0${num}`
  }
  return num
}

export function secondsToTime (time, type) {
  time = parseInt(time)
  const s = time % 60
  const h = parseInt(time / 3600)
  let m = parseInt((time % 3600) / 60)
  if (type === 'array') {
    return [h, m, s]
  }
  if (type === 'm:s') {
    m = parseInt(time / 60)
    return [m, s].map((item) => paddingLeadZero(item)).join(':')
  }
  // default h:m:s
  return [h, m, s].map((item) => paddingLeadZero(item)).join(':')
};

export function getFormatBandwidth (speed) {
  if (!speed) {
    return '0 KB/s'
  }
  if (speed / 1024 / 1024 < 1) {
    return (speed / 1024).toFixed(2) + ' KB/s'
  } else {
    return (speed / 1024 / 1024).toFixed(2) + ' MB/s'
  }
}

export function getElementOffsets (obj) {
  let left = 0
  let top = 0
  do {
    left += obj.offsetLeft
    top += obj.offsetTop
  } while ((obj = obj.offsetParent))
  return {
    left,
    top
  }
};

export function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export function fallbackCopyTextToClipboard (text, callback) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    callback(msg)
  } catch (err) {
    console.warn('Cannot execCommand `copy`!')
  }

  document.body.removeChild(textArea)
};

export function copyText (text, callback = () => {}) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, callback)
    return
  }
  navigator.clipboard.writeText(text).then(() => {
    callback()
  }, (err) => {
    console.error('Async: Could not copy text: ', err)
  })
};

export function loadImage (src, done, errorCallback) {
  const image = new Image()
  image.src = src + '?_t=' + Math.floor(10000 * Math.random())
  image.onload = () => {
    done && done()
  }
  image.onerror = (e) => {
    errorCallback && errorCallback(e)
  }
};

const _isSafari = () => {
  return navigator.userAgent.indexOf('Safari') > -1
}

export function debounce (fun, delay) {
  return function () {
    let that = this
    let args = arguments
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, args)
    }, delay)
  }
};

// find the correct part of video buffered
export function getMatchRangeTime (time, ranges) {
  if (ranges.length === 0) {
    return 0
  }
  for (let i = 0; i < ranges.length; i++) {
    const start = ranges.start(i)
    const end = ranges.end(i)
    if (time >= start && time <= end) {
      return ranges.end(i)
    }
  }
  return time
};

function getMediaSource () {
  return window.MediaSource || window.WebKitMediaSource
}

const WEB_SUPPORT_H264_CODEC = 'video/mp4; codecs="avc1.42E01E,mp4a.40.2"'

export const isMSESupported = () => {
  const mediaSource = getMediaSource()
  const sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer
  const isTypeSupported = mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported(WEB_SUPPORT_H264_CODEC)

  // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
  const sourceBufferValidAPI = !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function')
  return !!isTypeSupported && !!sourceBufferValidAPI
}

export function isDebug () {
  return localStorage.__vrplayer_core
}

export function setDebug (value) {
  if (value) {
    localStorage.__vrplayer_debug = true
  } else {
    localStorage.__vrplayer_debug = ''
  }
}

export const isMobile = isMobileJS.any
export const isAndroid = isMobileJS.android
export const isApple = isMobileJS.apple && isMobileJS.apple.device
export const isSafari = isApple && _isSafari()
export const isTencentGroup = /MQQBrowser/i.test(ua)
export const isUC = /ucbrowser/i.test(ua)
export const isChrome = /chrome/i.test(ua)
export const isWechat = /MicroMessenger/i.test(ua)
export const isFirefox = /firefox/i.test(ua)

export * from './type'
