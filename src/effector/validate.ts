import {kind} from './index.h'

import {isObject, isFunction} from './is'

export const unit = (obj: any) =>
  (isFunction(obj) || isObject(obj)) && 'kind' in obj

const is = (type: kind) => (obj: any) => unit(obj) && obj.kind === type

export const store = is('store')
export const event = is('event')
export const effect = is('effect')
export const domain = is('domain')
