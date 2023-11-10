import {createStore} from './createUnit'
import {is} from './is'
import {forIn} from './collection'
import {getParent} from './getter'
import {createLinkNode} from './forward'
import {deprecate} from './throw'
import {addActivator} from './lazy'

export function restore(obj: any, defaultState: any, config?: any) {
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
    const clock = is.effect(obj) ? obj.doneData : obj
    createLinkNode(clock, result)
    /**
     * WARN! This essentialy makes this store derived
     * This is not a final decision!
     **/
    result.graphite.lazy!.alwaysActive = false
    addActivator(result, [clock])
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
