//@flow

import {Store} from './unit.h'
import {createEvent, applyParentEventHook} from './createUnit'
import {forIn} from './forIn'
import {getParent} from './getter'

export function createApi(
  store: Store<any>,
  setters: {[key: string]: Function},
) {
  const result = {}
  forIn(setters, (fn, key) => {
    const event = (result[key] = createEvent(key, {parent: getParent(store)}))
    store.on(event, fn)
    applyParentEventHook(store, event)
  })
  return result
}
