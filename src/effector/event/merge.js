// @flow

import type {Event} from './index.h'
import {eventFabric} from './eventFabric'
import {unitObjectName} from '../naming'
import {forward} from './forward'

export function merge<T>(events: $ReadOnlyArray<Event<T>>): Event<T> {
  const result = eventFabric({
    name: unitObjectName(events, 'merge'),
  })
  for (const event of events) {
    forward({from: event, to: result})
  }
  return result
}
