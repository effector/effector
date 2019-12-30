//@flow

import type {Store, Event} from './unit.h'
import {createEvent, applyParentEventHook} from './createUnit'

declare export function createApi<
  S,
  Obj: {-[name: string]: (store: S, e: any) => S, ...},
>(
  store: Store<S>,
  setters: Obj,
): $ObjMap<Obj, <E>(h: (store: S, e: E) => S) => Event<E>>

export function createApi(
  store: Store<any>,
  setters: {[string]: Function, ...},
) {
  const result = {}
  for (const key in setters) {
    const event = (result[key] = createEvent(key, {parent: store.parent}))
    store.on(event, setters[key])
    applyParentEventHook(store, event)
  }
  return result
}
