//@flow

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

//prettier-ignore
export const normalizeConfig:
  | (<Params, Done>(config?: Config<EffectConfigPart<Params, Done>>) => EffectConfigPart<Params, Done>)
  | ((config?: Config<StoreConfigPart>) => StoreConfigPart)
  | ((config?: Config<EventConfigPart>) => EventConfigPart)
  | ((config?: Config<DomainConfigPart>) => DomainConfigPart) =
  (config: any = {}): any => Object.assign({}, config, config.ɔ || {})

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
