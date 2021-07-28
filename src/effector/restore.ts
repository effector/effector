import {createStore} from './createUnit'
import {is} from './is'
import {forIn} from './collection'
import {getParent} from './getter'
import {OPEN_O} from './tag'
import {forward} from './forward'

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
        [OPEN_O]: config,
      }).on(obj, (_, v) => v)
    }
    if (is.effect(obj)) {
      result = createStore(defaultState, {
        parent: domain,
        name: obj.shortName,
        [OPEN_O]: config,
      })
      forward({from: obj.doneData, to: result})
    }
    if (domain) domain.hooks.store(result)
    return result
  }
  const result: Record<string, any> = Array.isArray(obj) ? [] : {}
  forIn(obj, (value, key) => {
    result[key] = is.store(value) ? value : createStore(value, {name: key})
  })
  return result
}
