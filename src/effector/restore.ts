import {createStore} from './createUnit'
import {is} from './is'
import {forIn} from './collection'
import {getParent} from './getter'
import {createLinkNode} from './forward'
import {deprecate} from './throw'
import {processArgsToConfig} from './config'

export function restore(...args: [obj: any, defaultState: any]) {
  const [[obj, defaultState], config] = processArgsToConfig(args)
  if (is.store(obj)) {
    deprecate(false, 'restore($store)')
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
