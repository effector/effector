//@flow

import warning from 'warning'

export type SourceLocation = {|
  file: string,
  column: number,
  line: number,
|}

export type EffectConfigPart<Payload, Done> = {
  handler?: (payload: Payload) => Promise<Done> | Done,
  loc?: SourceLocation,
  ...
}

export type StoreConfigPart = {
  name?: string,
  loc?: SourceLocation,
  ...
}

export type EventConfigPart = {
  loc?: SourceLocation,
  ...
}

export type Config<Part> = {
  ɔ?: Part,
  ...Part,
  ...
}

declare export function normalizeConfig<Payload, Done>(
  config?: Config<EffectConfigPart<Payload, Done>>,
): EffectConfigPart<Payload, Done>
declare export function normalizeConfig(
  config?: Config<StoreConfigPart>,
): StoreConfigPart
declare export function normalizeConfig(
  config?: Config<EventConfigPart>,
): EventConfigPart
export function normalizeConfig(config: any = {}): any {
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
