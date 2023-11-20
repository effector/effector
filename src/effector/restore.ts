import {createStore} from './createUnit'
import {is} from './is'
import {forIn} from './collection'
import {getParent} from './getter'
import {createLinkNode} from './forward'
import {deprecate} from './throw'
import {generateErrorTitle} from './naming'

export function restore(obj: any, defaultState: any, config?: any) {
  const errorTitle = generateErrorTitle('restore', config)
  if (is.store(obj)) {
    deprecate(false, 'restore($store)', undefined, errorTitle)
    return obj
  }
  if (is.event(obj) || is.effect(obj)) {
    const domain = getParent(obj)
    const result = createStore(defaultState, {
      parent: domain,
      name: obj.shortName,
      and: config,
    })
    createLinkNode(is.effect(obj) ? obj.doneData : obj, result)
    if (domain) domain.hooks.store(result)
    return result
  }
  const result: Record<string, any> = Array.isArray(obj) ? [] : {}
  forIn(
    obj,
    (value, key) =>
      (result[key] = is.store(value) ? value : createStore(value, {name: key})),
  )
  return result
}
