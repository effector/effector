//@flow

import {createRootDomain} from './domain'
import type {Event, Domain, Effect} from './index.h'

export type DomainAuto = Domain<*>
export type EventAuto<Payload> = Event<Payload/*::, * */>
export type EffectAuto<Params, Done, Fail = Error> =
  Effect<Params, Done, Fail/*::, * */>

let defaultDomain: DomainAuto

function domainGetter(): DomainAuto {
  if (defaultDomain === undefined) {
    const res = createRootDomain()
    defaultDomain = res
  }
  return defaultDomain
}

// export function


export function createEvent<Payload>(
  name: string,
): EventAuto<Payload> {
  const domain = domainGetter()
  const event = domain.event(name)
  return event
}

export function createEffect<Params, Done, Fail>(
  name: string,
): EffectAuto<Params, Done, Fail> {
  const domain = domainGetter()
  const effect = domain.effect(name)
  return effect
}
