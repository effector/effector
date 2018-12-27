//@flow
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {Store} from './index.h'
import {createStore} from './createStore'
import {visitRecord, kindReader} from 'effector/stdlib/visitor'

export function restoreObject<State: {-[key: string]: Store<any> | any}>(
  obj: State,
): $ObjMap<
  State,
  //prettier-ignore
  <S>(field: Store<S> | S) => Store<S>,
> {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    result[key] = createStore(value)
  }
  return result
}

export function restoreEffect<Done>(
  event: Effect<any, Done, any>,
  defaultState: Done,
): Store<Done> {
  const store = createStore(defaultState)
  store.on(event.done, (_, {result}) => result)
  return store
}

export function restoreEvent<E>(event: Event<E>, defaultState: E): Store<E> {
  const store = createStore(defaultState)
  store.on(event, (_, v) => v)
  return store
}

//eslint-disable-next-line no-unused-vars
declare export function restore<Done>(
  event: Effect<any, Done, any>,
  defaultState: Done,
): Store<Done>
declare export function restore<E>(event: Event<E>, defaultState: E): Store<E>
declare export function restore<State: {-[key: string]: Store<any> | any}>(
  obj: State,
): $ObjMap<
  State,
  //prettier-ignore
  <S>(field: Store<S> | S) => Store<S>,
>

const visitorRestore = {
  store: ({obj}) => obj,
  event: ({obj, defaultState}) => restoreEvent(obj, defaultState),
  effect: ({obj, defaultState}) => restoreEffect(obj, defaultState),
  __: ({obj}) => restoreObject(obj),
}

export function restore(obj: any, defaultState: any): any {
  return visitRecord(visitorRestore, {
    args: {
      obj,
      defaultState,
    },
    __kind: kindReader(obj),
  })
}
