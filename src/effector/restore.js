//@flow
import type {Store, Event, Effect} from './unit.h'
import {storeFabric} from './store'
import {is} from './stdlib'

export function restoreObject<State: {+[key: string]: Store<any> | any, ...}>(
  obj: State,
): $ObjMap<
  State,
  //prettier-ignore
  <S>(field: Store<S> | S) => Store<S>,
> {
  const result = {}
  for (const key in obj) {
    const value = obj[key]
    if (is.store(value)) {
      result[key] = value
    } else {
      result[key] = storeFabric({
        currentState: value,
        config: {name: key},
      })
    }
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
    //TODO: add location
    config: {name: event.shortName},
  })
  store.on(event.done, (_, {result}) => result)
  return store
}

export function restoreEvent<E>(event: Event<E>, defaultState: E): Store<E> {
  const store = storeFabric({
    currentState: defaultState,
    parent: event.domainName,
    //TODO: add location
    config: {name: event.shortName},
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
declare export function restore<State: {-[key: string]: Store<any> | any, ...}>(
  obj: State,
): $ObjMap<
  State,
  //prettier-ignore
  <S>(field: Store<S> | S) => Store<S>,
>
export function restore(obj: any, defaultState: any): any {
  if (is.store(obj)) {
    return obj
  }
  if (is.event(obj)) {
    return restoreEvent(obj, defaultState)
  }
  if (is.effect(obj)) {
    return restoreEffect(obj, defaultState)
  }
  return restoreObject(obj)
}
