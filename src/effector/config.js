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
  sid?: string,
  ...
}

export type StoreConfigPart = {
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  ...
}

export type EventConfigPart = {
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  ...
}

export type DomainConfigPart = {
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  ...
}

export type Config<Part> = {
  ɔ?: Part,
  ...$Exact<Part>,
  ...
}

const assignConfigPart = (part, config = {}) => {
  if (Object(part) === part) {
    assignConfigPart(part.config, config)
    if (part.name != null) {
      if (typeof part.name === 'object') assignConfigPart(part.name, config)
      else config.name = part.name
    }
    if ('loc' in part) config.loc = part.loc
    if ('sid' in part) config.sid = part.sid
    if ('handler' in part) config.handler = part.handler
    if ('parent' in part) config.parent = part.parent
    if ('parentHooks' in part) config.parentHooks = part.parentHooks
    assignConfigPart(part.ɔ, config)
  }
  return config
}
//prettier-ignore
export const normalizeConfig:
  & (<Params, Done>(config?: Config<EffectConfigPart<Params, Done>>) => EffectConfigPart<Params, Done>)
  & ((config?: Config<StoreConfigPart>) => StoreConfigPart)
  & ((config?: Config<EventConfigPart>) => EventConfigPart)
  & ((config?: Config<DomainConfigPart>) => DomainConfigPart) =
  assignConfigPart
