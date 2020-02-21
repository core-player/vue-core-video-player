import { isNodeEnv, isChrome, isFirefox } from './util'

const _isMediaList = (medias) => {
  if (Array.isArray(medias) && typeof medias[0] === 'object' && medias[0].resolution && medias[0].src) {
    return true
  }
  return false
}

export function parseMediaList (medias) {
  if (_isMediaList(medias)) {
    return medias.filter((media) => {
      return media.src && media.resolution
    })
  }
  if (typeof medias === 'string') {
    return [medias]
  }
  return medias
}

export function checkVideoPlayType (type, videoEl) {
  if (isNodeEnv()) {
    if ((isFirefox || isChrome) && type === 'video/webm') {
      return true
    }
    return type === 'video/mp4'
  }
  if (!videoEl) {
    videoEl = document.createElement('videos')
  }
  return videoEl.canPlayType(type)
}
