import {Store, Event, Effect} from './unit.h'
import {createEvent} from './createUnit'
import {forward} from './forward'
import {unitObjectName} from './naming'

export function merge<T>(
  events: Array<Event<T> | Store<T> | Effect<T, any, any>>,
  config?: object,
): Event<T> {
  const result = createEvent(config || unitObjectName(events, 'merge'))
  forward({
    from: events,
    to: result,
    meta: {op: 'merge'},
  })
  return result
}
