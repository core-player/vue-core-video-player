
// import { CORE } from '../constants'
import { guid } from '../helper/util'
import BaseVideoCore from './base'

const VPC_CORE_INS = {}

export function initVideoCore (config) {
  const id = guid()
  config._id = id
  const Core = config.core || BaseVideoCore

  const core = new Core(config)
  core.id = id
  VPC_CORE_INS[id] = core
  return core
}

export function getVideoCore (id) {
  return VPC_CORE_INS[id]
}
