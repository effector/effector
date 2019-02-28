//@flow

type ConfigPart = {
  name?: string,
}

export type Config = {
  ɔ?: ConfigPart,
  ...ConfigPart,
}

export function normalizeConfig(config?: Config = {}): ConfigPart {
  if (typeof config === 'object' && config !== null) {
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
