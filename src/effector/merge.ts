import {Store, Event, Effect} from './unit.h'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {unitObjectName} from './naming'
import {assertNodeSet} from './is'

export function merge<T>(
  events: Array<Event<T> | Store<T> | Effect<T, any, any>>,
  config?: object,
): Event<T> {
  const result = createEvent(config || unitObjectName(events, 'merge'))
  assertNodeSet(events, 'merge', 'first argument')
  createLinkNode(events, result, {meta: {op: 'merge'}})
  return result
}
