//@flow

import {createRootDomain} from './domain-alt'
import type {Event, Domain, Effect} from './index.h'

export type DomainAuto = Domain<*>
export type EventAuto<Payload> = Event<Payload /*::, * */>
export type EffectAuto<Params, Done, Fail = Error> = Effect<
 Params,
 Done,
 Fail /*::, * */,
>

const defaultDomain = createRootDomain()

// export function

export function createEvent<Payload>(name: string) {
 return defaultDomain.event(name)
}

export function createEffect<Params, Done, Fail>(name: string) {
 return defaultDomain.effect(name)
}
