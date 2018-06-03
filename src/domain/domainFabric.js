//@flow

import type {Domain, DomainHooks} from './index.h'
import {type Store, createStore} from 'effector/store'
import {type Event, eventFabric} from 'effector/event'
import {type Effect, effectFabric} from 'effector/effect'
import {createName, type CompositeName} from '../compositeName'
import {stringRefcount} from '../refcount'

const nextId = stringRefcount()

export function domainFabric(
 nameRaw?: string,
 parent?: CompositeName,
 parentHooks?: DomainHooks,
): Domain {
 const id = nextId()
 const name = nameRaw || ''
 const compositeName = createName(name, parent)
 const hooks = domainHooks(compositeName, parentHooks)

 return {
  compositeName,
  id,
  getType() {
   return compositeName.fullName
  },
  onCreateEvent(hook: (newEvent: Event<any>) => any) {
   return hooks.event.watch(hook)
  },
  onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any) {
   return hooks.effect.watch(hook)
  },
  onCreateStore(hook: (newStore: Store<any>) => any) {
   return hooks.store.watch(hook)
  },
  onCreateDomain(hook: (newDomain: Domain) => any) {
   return hooks.domain.watch(hook)
  },
  event<Payload>(name?: string): Event<Payload> {
   const result = eventFabric({
    name,
    parent: compositeName,
   })
   hooks.event(result)
   return result
  },
  effect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail> {
   const result = effectFabric({
    name,
    domainName: compositeName.fullName,
    parent: compositeName,
   })
   hooks.effect(result)
   return result
  },
  domain(name?: string) {
   const result = domainFabric(name, compositeName, hooks)
   hooks.domain(result)
   return result
  },
  store<T>(state: T): Store<T> {
   const result = createStore(state)
   hooks.store(result)
   return result
  },
 }
}

function domainHooks(compositeName, parentHooks) {
 return parentHooks
  ? childDomainHooks(parentHooks)
  : singleDomainHooks(compositeName)
}

function singleDomainHooks(compositeName) {
 const event: Event<Event<any>> = eventFabric({
  name: `${compositeName.fullName} event hook`,
  parent: compositeName,
 })
 const effect: Event<Effect<any, any, any>> = eventFabric({
  name: `${compositeName.fullName} effect hook`,
  parent: compositeName,
 })
 const store: Event<Store<any>> = eventFabric({
  name: `${compositeName.fullName} store hook`,
  parent: compositeName,
 })
 const domain: Event<Domain> = eventFabric({
  name: `${compositeName.fullName} domain hook`,
  parent: compositeName,
 })
 return {event, effect, store, domain}
}

function childDomainHooks(parentHooks: DomainHooks) {
 const event: Event<Event<any>> = parentHooks.event.prepend(_ => _)
 const effect: Event<Effect<any, any, any>> = parentHooks.effect.prepend(_ => _)
 const store: Event<Store<any>> = parentHooks.store.prepend(_ => _)
 const domain: Event<Domain> = parentHooks.domain.prepend(_ => _)
 return {event, effect, store, domain}
}
