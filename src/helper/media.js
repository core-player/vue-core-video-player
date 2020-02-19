
const _isMediaList = (medias) => {
  if (Array.isArray(medias) && typeof medias[0] === 'object' && medias[0].src) {
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
