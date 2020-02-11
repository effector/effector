//@flow

import type {kind} from './index.h'
import {
  store as storeKind,
  event as eventKind,
  effect as effectKind,
  domain as domainKind,
} from './kind'

export const unit = (obj: mixed) =>
  (typeof obj === 'function' || (typeof obj === 'object' && obj !== null)) &&
  //$off
  'kind' in obj

//$off
const is = (type: kind) => (obj: mixed) => unit(obj) && obj.kind === type

export const store = is(storeKind)
export const event = is(eventKind)
export const effect = is(effectKind)
export const domain = is(domainKind)
