//@flow
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {Store} from './index.h'
import {createStore} from './createStore'
import {storeFabric} from './storeFabric'

import {isStore, isEvent, isEffect} from 'effector/stdlib'

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
  const store = storeFabric({
    currentState: defaultState,
    parent: event.domainName,
    name: event.shortName,
  })
  store.on(event.done, (_, {result}) => result)
  return store
}

export function restoreEvent<E>(event: Event<E>, defaultState: E): Store<E> {
  const store = storeFabric({
    currentState: defaultState,
    parent: event.domainName,
    name: event.shortName,
  })
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
export function restore(obj: any, defaultState: any): any {
  if (isStore(obj)) {
    return obj
  }
  if (isEvent(obj)) {
    return restoreEvent(obj, defaultState)
  }
  if (isEffect(obj)) {
    return restoreEffect(obj, defaultState)
  }
  return restoreObject(obj)
}
