//@flow

import {unitObjectName} from '../naming'

import type {Event} from '../unit.h'
import {eventFabric} from './eventFabric'

export function combine<T>(
  f: (...args: any[]) => T,
  ...events: $ReadOnlyArray<Event<any>>
): Event<T> {
  const unit = eventFabric({
    name: unitObjectName(events),
  })
  const l = events.length
  let awaiting = l
  const values = new Array(l)
  const hasValue = new Array(l).fill(false)
  for (let index = 0; index < l; index++) {
    const event = events[index]
    event.watch(value => {
      if (awaiting > 0) {
        if (!hasValue[index]) {
          hasValue[index] = true
          awaiting -= 1
        }
      }
      values[index] = value
      if (awaiting === 0) {
        unit(f(...values))
      }
    })
  }
  return unit
}
