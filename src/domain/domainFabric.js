//@flow

import type {Domain, DomainHooks} from './index.h'
import {type Store, storeFabric} from 'effector/store'
import {type Event, eventFabric} from 'effector/event'
import {type Effect, effectFabric} from 'effector/effect'
import {createName, type CompositeName} from '../compositeName'
import {stringRefcount} from '../refcount'
import {DomainHistory, domainHooks} from './hook'

import {Graph, type Vertex} from 'effector/graphite/tarjan'

const nextId = stringRefcount()

export function domainFabric(
 nameRaw?: string,
 parent?: CompositeName,
 parentHooks?: DomainHooks,
 graph: Graph<any> = new Graph(),
): Domain {
 const id = nextId()
 const name = nameRaw || ''
 const compositeName = createName(name, parent)
 const history = new DomainHistory()
 const hooks = domainHooks(history, compositeName, graph, parentHooks)

 return {
  compositeName,
  id,
  getType() {
   return compositeName.fullName
  },
  onCreateEvent(hook: (newEvent: Event<any>) => any) {
   history.events.forEach(hook)
   return hooks.event.watch(hook)
  },
  onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any) {
   history.effects.forEach(hook)
   return hooks.effect.watch(hook)
  },
  onCreateStore(hook: (newStore: Store<any>) => any) {
   history.storages.forEach(hook)
   return hooks.store.watch(hook)
  },
  onCreateDomain(hook: (newDomain: Domain) => any) {
   history.domains.forEach(hook)
   return hooks.domain.watch(hook)
  },
  event<Payload>(name?: string): Event<Payload> {
   const vertex: Vertex<['event', string]> = graph.addNode([
    'event',
    compositeName.fullName,
   ])
   const result = eventFabric({
    name,
    parent: compositeName,
    vertex,
   })
   hooks.event(result)
   return result
  },
  effect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail> {
   const vertex: Vertex<['effect', string]> = graph.addNode([
    'effect',
    compositeName.fullName,
   ])
   const result = effectFabric({
    name,
    domainName: compositeName.fullName,
    parent: compositeName,
    vertex,
   })
   hooks.effect(result)
   return result
  },
  domain(name?: string) {
   const result = domainFabric(name, compositeName, hooks, graph)
   hooks.domain(result)
   return result
  },
  store<T>(state: T): Store<T> {
   const result = storeFabric({
    currentState: state,
    parent: compositeName,
   })
   hooks.store(result)
   return result
  },
 }
}
