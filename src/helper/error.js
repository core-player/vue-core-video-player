import { ERROR_CODE } from '../constants'
import { isDebug } from './util'

export function throwError (code, msg) {
  let errMsg = `Error: ${ERROR_CODE[code]} ${msg}`
  if (isDebug) {
    errMsg += ' => https://github.com/JackPu/vue-core-video-player/tree/dev/docs'
  }
  throw new Error(errMsg)
}
