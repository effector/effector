//@flow
import type {Store, Event, Effect} from './unit.h'
import {createStore} from './createUnit'
import {is} from './is'
import {forIn} from './forIn'

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
export function restore(obj: any, defaultState: any, config?: any): any {
  if (is.store(obj)) {
    return obj
  }
  if (is.unit(obj)) {
    const domain = obj.parent
    let result
    if (is.event(obj)) {
      result = createStore(defaultState, {
        parent: domain,
        name: obj.shortName,
        ɔ: config,
      }).on(obj, (_, v) => v)
    }
    if (is.effect(obj)) {
      result = createStore(defaultState, {
        parent: domain,
        name: obj.shortName,
        ɔ: config,
      }).on(obj.done, (_, {result}) => result)
    }
    if (domain) domain.hooks.store(result)
    return result
  }
  const result = {}
  forIn(obj, (value, key) => {
    result[key] = is.store(value) ? value : createStore(value, {name: key})
  })
  return result
}

export {
  restore as restoreEvent,
  restore as restoreEffect,
  restore as restoreObject,
}
