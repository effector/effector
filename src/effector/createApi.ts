import {Store, Event} from './unit.h'
import {createEvent, applyParentHook} from './createUnit'
import {forIn} from './collection'
import {getParent} from './getter'

export function createApi(
  store: Store<any>,
  setters: {[key: string]: Function},
) {
  const result: Record<string, Event<any>> = {}
  forIn(setters, (fn, key) => {
    const event = (result[key] = createEvent(key, {parent: getParent(store)}))
    store.on(event, fn)
    applyParentHook(store, event)
  })
  return result
}
