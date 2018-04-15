//@flow

import type {PlainActor} from './index.h'

export class PlainActorSystem {
 isDispatching = false
 pending: Set<PlainActor> = new Set()
}

export const defaultActorSystem = new PlainActorSystem()
