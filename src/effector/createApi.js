//@flow

import type {Store, Event} from './unit.h'
import {createEvent} from './createUnit'

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
    const handler: any = setters[key]
    const event = (result[key] = createEvent(key))
    store.on(event, handler)
  }
  return result
}
