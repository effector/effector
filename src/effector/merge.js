// @flow

import type {Store, Event, Effect} from './unit.h'
import {createEvent} from './event'
import {forward} from './forward'
import {unitObjectName} from './naming'

export function merge<T>(
  events: $ReadOnlyArray<Event<T> | Store<T> | Effect<T, any, any>>,
): Event<T> {
  const result = createEvent(unitObjectName(events, 'merge'))
  for (const event of events) {
    forward({from: event, to: result})
  }
  return result
}
