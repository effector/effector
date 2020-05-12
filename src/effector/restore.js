//@flow
import {createStore} from './createUnit'
import {is} from './is'
import {forIn} from './forIn'
import {getParent} from './getter'

export function restore(obj: any, defaultState: any, config?: any): any {
  if (is.store(obj)) {
    return obj
  }
  if (is.unit(obj)) {
    const domain = getParent(obj)
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
