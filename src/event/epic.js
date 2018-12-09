//@flow

import {from, type Stream} from 'most'
import type {Event} from './index.h'
import {eventFabric} from './eventFabric'

export function epic<T, Payload>(
  event: Event<Payload>,
  fn: (Stream<Payload>) => Stream<T>,
): Event<T> {
  const instance$ = from(event)
    .skipRepeats()
    .multicast()
  const epic$ = fn(instance$).multicast()
  const name = event.compositeName.shortName
  const fullName = event.compositeName.fullName
  const mapped = eventFabric({
    name: `${name}$ ~> *`,
    parent: event.domainName,
    // vertex: event.getNode().createChild(['event', `${name}$ ~> *`]),
  })
  epic$.observe(e => {
    mapped.create(e, fullName)
  })
  return mapped
}
