//@flow

import {eventFabric} from './eventFabric'
import type {Event} from './index.h'

export function createEvent<Payload>(name?: string): Event<Payload> {
 return eventFabric({name})
}
