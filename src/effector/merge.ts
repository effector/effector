import type {Store, Event, Effect} from './unit.h'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {unitObjectName} from './naming'
import {assertNodeSet} from './is'

export function merge<T>(
  units: Array<Event<T> | Store<T> | Effect<T, any, any>>,
  config?: object,
): Event<T> {
  assertNodeSet(units, 'merge', 'first argument')
  const result = createEvent({
    name: unitObjectName(units, 'merge'),
    derived: true,
    and: config,
  })
  createLinkNode(units, result, [], 'merge')
  return result
}
