//@flow

import warning from 'warning'
import {Object} from 'core-js'

export type ConfigPart = {
  name?: string,
  loc?: {
    file: string,
    column: number,
    line: number,
  },
}

export type Config = {
  ɔ?: ConfigPart,
  ...ConfigPart,
}

export function normalizeConfig(config?: Config = {}): ConfigPart {
  const message =
    'createStore: Second argument should be plain object, but you passed %s.'
  warning(typeof config === 'object' && config !== null, message, config)
  if (typeof config?.ɔ !== 'undefined') {
    warning(
      typeof config.ɔ === 'object' && config.ɔ !== null,
      message,
      config.ɔ,
    )
  }
  const rawConfig = typeof config.ɔ === 'object' ? config.ɔ : {}
  const newConfig = Object.assign({}, config, rawConfig)
  delete newConfig.ɔ
  return newConfig
}
