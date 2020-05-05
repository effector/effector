//@flow

import {kind} from './index.h'
import {
  store as storeKind,
  event as eventKind,
  effect as effectKind,
  domain as domainKind,
} from './kind'

import {isObject, isFunction} from './is'

export const unit = (obj: mixed) =>
  (isFunction(obj) || isObject(obj)) && 'kind' in obj

const is = (type: kind) => (obj: mixed) => unit(obj) && obj.kind === type

export const store = is(storeKind)
export const event = is(eventKind)
export const effect = is(effectKind)
export const domain = is(domainKind)
