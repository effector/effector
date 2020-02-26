//@flow

import {getConfig, getNestedConfig} from './getter'
import {isObject} from './is'

export type SourceLocation = {
  file: string,
  column: number,
  line: number,
}

export type EffectConfigPart<Payload, Done> = {
  handler?: (payload: Payload) => Promise<Done> | Done,
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  named?: string,
  ...
}

export type StoreConfigPart = {
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  named?: string,
  ...
}

export type EventConfigPart = {
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  named?: string,
  ...
}

export type DomainConfigPart = {
  name?: string,
  loc?: SourceLocation,
  sid?: string,
  named?: string,
  ...
}

export type Config<Part> = {
  ɔ?: Part,
  ...$Exact<Part>,
  ...
}

export const normalizeConfig = (part, config = {}) => {
  if (isObject(part)) {
    normalizeConfig(getConfig(part), config)
    if (part.name != null) {
      if (isObject(part.name)) normalizeConfig(part.name, config)
      else config.name = part.name
    }
    if (part.loc) config.loc = part.loc
    if (part.sid) config.sid = part.sid
    if (part.handler) config.handler = part.handler
    if (part.parent) config.parent = part.parent
    if ('strict' in part) config.strict = part.strict
    if (part.named) config.named = part.named
    normalizeConfig(getNestedConfig(part), config)
  }
  return config
}
