
import { CORE } from '../constants'
import { guid } from '../helper/util'
import BaseVideoCore from './base'
import HLSVideoCore from './hls'
import DashVideoCore from './dash'
import VRVideoCore from './vr'

const VPC_CORE_INS = {}

export function initVideoCore (config) {
  const id = guid()
  config._id = id
  let Core
  if (config.core === CORE.HLS) {
    Core = HLSVideoCore
  } else if (config.core === CORE.DASH) {
    Core = DashVideoCore
  } else if (config.core === CORE.VR) {
    Core = VRVideoCore
  } else {
    Core = BaseVideoCore
  }
  const core = new Core(config)
  core.id = id;
  VPC_CORE_INS[id] = core
}

export function getVideoCore (id) {
  return VPC_CORE_INS[id]
}
