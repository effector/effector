//@flow

import type {Store} from './unit.h'
import {createEvent, applyParentEventHook} from './createUnit'
import {forIn} from './forIn'

export function createApi(
  store: Store<any>,
  setters: {[string]: Function, ...},
) {
  const result = {}
  forIn(setters, (fn, key) => {
    const event = (result[key] = createEvent(key, {parent: store.parent}))
    store.on(event, fn)
    applyParentEventHook(store, event)
  })
  return result
}
