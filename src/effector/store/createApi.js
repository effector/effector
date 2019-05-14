//@flow

import type {Store} from './index.h'
import {type Event, createEvent} from '../event'

declare export function createApi<
  S,
  Obj: {-[name: string]: (store: S, e: any) => S},
>(
  store: Store<S>,
  setters: Obj,
): $ObjMap<Obj, <E>(h: (store: S, e: E) => S) => Event<E>>

export function createApi(store: Store<any>, setters: {[string]: Function}) {
  const result = {}
  for (const [key, handler] of Object.entries(setters)) {
    store.on((result[key] = createEvent(key)), (handler: any))
  }
  return result
}
