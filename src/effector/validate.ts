import {kind} from './index.h'
import {DOMAIN, STORE, EVENT, EFFECT} from './tag'
import {isObject, isFunction} from './is'

export const unit = (obj: any) =>
  (isFunction(obj) || isObject(obj)) && 'kind' in obj

const is = (type: kind) => (obj: any) => unit(obj) && obj.kind === type

export const store = is(STORE)
export const event = is(EVENT)
export const effect = is(EFFECT)
export const domain = is(DOMAIN)
