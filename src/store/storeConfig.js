//@flow

import warning from 'warning'

type ConfigPart = {
  name?: string,
}

export type Config = {
  ɔ?: ConfigPart,
  ...ConfigPart,
}

export function normalizeConfig(config?: Config = {}): ConfigPart {
  const message =
    'createStore: Second argument should be plain object, but you passed %s.'
  warning(typeof config === 'object' && config !== null, message, config)
  if (typeof config === 'object' && config !== null) {
    if (typeof config.ɔ !== 'undefined') {
      warning(
        typeof config.ɔ === 'object' && config.ɔ !== null,
        message,
        config.ɔ,
      )
    }
    if (typeof config.ɔ === 'object' && config.ɔ !== null) {
      const newConfig = {...config.ɔ}
      if (!('name' in config.ɔ)) {
        newConfig.name = config.name
      }
      return newConfig
    }
    const {ɔ, ...newConfig} = config
    return newConfig
  }
  return {}
}
