//@flow

import type {ID} from '@effector/id'

import type {
 Actor,
 Handler,
 Filter,
 Event,
 Catch,
 DefaultKeeper,
} from './index.h'

export type Keeper</*::-*/ T> = (_: T, e: Event) => Promise<any>

class ActorPrivateMeta {
 keepBy: ?Actor<any> = null
 keeperFor: WeakMap<ID, DefaultKeeper<any>> = new WeakMap()
 handlers: Set<Catch> = new Set()
 incoming: Set<Event> = new Set()
 newHandlers: Set<Catch> = new Set()
 newIncoming: Set<Event> = new Set()
}

const actorPrivateMeta: WeakMap<ID, ActorPrivateMeta> = new WeakMap()

export type {ActorPrivateMeta}

export function getMeta(id: ID): ActorPrivateMeta {
 const meta = actorPrivateMeta.get(id)
 if (meta !== undefined) return meta
 const newMeta = new ActorPrivateMeta()
 actorPrivateMeta.set(id, newMeta)
 return newMeta
}
