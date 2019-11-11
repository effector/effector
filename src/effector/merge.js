// @flow

import type {Store, Event, Effect} from './unit.h'
import {createEvent} from './createEvent'
import {forward} from './forward'
import {unitObjectName} from './naming'

export function merge<T>(
  events: $ReadOnlyArray<Event<T> | Store<T> | Effect<T, any, any>>,
): Event<T> {
  const result = createEvent(unitObjectName(events, 'merge'))
  forward({
    from: events,
    to: result,
    meta: {op: 'merge'},
  })
  return result
}
