import type {Store, Event, Effect} from './unit.h'
import {createEvent} from './createUnit'
import {createLinkNode} from './forward'
import {unitObjectName} from './naming'
import {assertNodeSet} from './is'
import {processArgsToConfig} from './config'

export function merge<T>(
  unitsOrConfig: Array<Event<T> | Store<T> | Effect<T, any, any>>,
): Event<T> {
  const [units, config]: [
    units: Array<Event<T> | Store<T> | Effect<T, any, any>>,
    config?: object,
  ] = processArgsToConfig(unitsOrConfig, true)
  assertNodeSet(units, 'merge', 'first argument')
  const result = createEvent({
    name: unitObjectName(units, 'merge'),
    derived: true,
    and: config,
  })
  createLinkNode(units, result, [], 'merge')
  return result
}
