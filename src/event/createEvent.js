//@flow

import {eventFabric} from './eventFabric'
import type {Event} from './index.h'
import {Vertex} from 'effector/graphite/tarjan'

export function createEvent<Payload>(name?: string): Event<Payload> {
 return eventFabric({
  name,
  vertex: new Vertex<['event', string]>(['event', name || '']),
 })
}
