import {createStore} from './createUnit'
import {is} from './validate'
import {forIn} from './collection'
import {getParent} from './getter'
import {createLinkNode} from './createNode'
import {assert} from './throw'
import {generateErrorTitle} from './naming'

export function restore(obj: any, defaultState: any, config?: any) {
  const errorTitle = generateErrorTitle('restore', config)
  assert(!is.store(obj), 'restore($store) is not supported', errorTitle)
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
