//@flow

import {eventFabric} from './Event'
import type {Event} from '../effector/index.h'

export function createEvent<Payload>(name: string): Event<Payload> {
 return eventFabric({name, domainName: ''})
}
