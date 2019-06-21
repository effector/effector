// @flow

import {createEvent, forward, type Event} from 'effector'

export function merge<T>(events: $ReadOnlyArray<Event<T>>): Event<T> {
  const result = createEvent()
  for (const event of events) {
    forward({from: event, to: result})
  }
  return result
}
