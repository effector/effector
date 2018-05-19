//@flow

import {effectFabric} from './Effect'
import type {Effect} from '../effector/index.h'

export function createEffect<Payload, Done>(
 name: string,
): Effect<Payload, Done, *> {
 return effectFabric({name, domainName: ''})
}
