//@flow

import warning from 'warning'

export type SourceLocation = {|
  file: string,
  column: number,
  line: number,
|}

export type EffectConfigPart<Payload, Done> = {
  handler?: (payload: Payload) => Promise<Done> | Done,
  name?: string,
  loc?: SourceLocation,
  ...
}

export type StoreConfigPart = {
  name?: string,
  loc?: SourceLocation,
  ...
}

export type EventConfigPart = {
  name?: string,
  loc?: SourceLocation,
  ...
}

export type DomainConfigPart = {
  name?: string,
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
declare export function normalizeConfig(
  config?: Config<DomainConfigPart>,
): DomainConfigPart
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

declare export function normalizeEventConfig<Payload, Done>(
  nameOrConfig?: string | EffectConfigPart<Payload, Done>,
  config?: Config<EffectConfigPart<Payload, Done>>,
): {|
  config: EffectConfigPart<Payload, Done>,
  name?: string,
|}
declare export function normalizeEventConfig(
  nameOrConfig?: string | EventConfigPart,
  config?: Config<EventConfigPart>,
): {|
  config: EventConfigPart,
  name?: string,
|}
declare export function normalizeEventConfig(
  nameOrConfig?: string | DomainConfigPart,
  config?: Config<DomainConfigPart>,
): {|
  config: DomainConfigPart,
  name?: string,
|}
export function normalizeEventConfig(
  nameOrConfig?: string | {...},
  opts?: any,
) {
  const config =
    typeof nameOrConfig === 'object'
      ? Object.assign({}, normalizeConfig(opts), nameOrConfig)
      : normalizeConfig(opts)
  const name =
    typeof nameOrConfig === 'object' || typeof nameOrConfig === 'undefined'
      ? config.name
      : nameOrConfig
  return {
    config,
    name,
  }
}
