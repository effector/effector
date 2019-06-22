// @flow

import type {Event} from './index.h'
import type {Store} from '../store/index.h'
import type {Effect} from '../effect/index.h'
import {eventFabric} from './eventFabric'
import {unitObjectName} from '../naming'
import {forward} from './forward'

export function merge<T>(
  events: $ReadOnlyArray<Event<T> | Store<T> | Effect<T, any, any>>,
): Event<T> {
  const result = eventFabric({
    name: unitObjectName(events, 'merge'),
  })
  for (const event of events) {
    forward({from: event, to: result})
  }
  return result
}
