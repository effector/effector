//@flow

import {effectFabric} from './effectFabric'
import type {Effect} from './index.h'

export function createEffect<Payload, Done>(
 name?: string,
): Effect<Payload, Done, *> {
 return effectFabric({name, domainName: ''})
}
