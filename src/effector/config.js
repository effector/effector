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
    if (part.loc) config.loc = part.loc
    if (part.sid) config.sid = part.sid
    if (part.handler) config.handler = part.handler
    if (part.parent) config.parent = part.parent
    if (part.parentHooks) config.parentHooks = part.parentHooks
    if ('strict' in part) config.strict = part.strict
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
