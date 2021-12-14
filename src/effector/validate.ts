import {kind} from './index.h'
import {DOMAIN, STORE, EVENT, EFFECT, SCOPE} from './tag'
import {isObject, isFunction} from './is'
import {Domain, Effect, Event, Scope, Store} from './unit.h'

export const unit = obj => (isFunction(obj) || isObject(obj)) && 'kind' in obj

const is = (type: kind) => obj => unit(obj) && obj.kind === type

export const store = is(STORE) as (value) => value is Store<unknown>
export const event = is(EVENT) as (value) => value is Event<unknown>
export const effect = is(EFFECT) as (
  value,
) => value is Effect<unknown, unknown, unknown>
export const domain = is(DOMAIN) as (value) => value is Domain
export const scope = is(SCOPE) as (value) => value is Scope
