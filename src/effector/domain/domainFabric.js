//@flow

import {stringRefcount, Kind, addLinkToOwner} from '../stdlib'
import {type Store, storeFabric} from '../store'
import {
  normalizeConfig,
  type Config,
  type EffectConfigPart,
  type EventConfigPart,
  type StoreConfigPart,
  type DomainConfigPart,
} from '../config'
import {type Event, eventFabric, forward} from '../event'
import {type Effect, effectFabric} from '../effect'

import type {Domain, DomainHooks} from './index.h'
import {createName, type CompositeName} from '../compositeName'
import {createNode} from '../stdlib/graph'

const nextID = stringRefcount()

const createHook = (trigger: Event<any>, acc: Set<any>, node) => {
  trigger.watch(data => {
    acc.add(data)
  })
  addLinkToOwner(node, trigger)
  return (hook: (data: any) => any) => {
    acc.forEach(hook)
    return trigger.watch(hook)
  }
}

export function domainFabric({
  name: nameRaw,
  config = {},
  parent,
  parentHooks,
}: {
  +name?: string,
  +config?: DomainConfigPart,
  +parent?: CompositeName,
  +parentHooks?: DomainHooks,
  ...
}): Domain {
  const id = nextID()
  const name = nameRaw || ''
  const compositeName = createName(name, parent)
  const domains: Set<Domain> = new Set()
  const storages: Set<Store<any>> = new Set()
  const effects: Set<Effect<any, any, any>> = new Set()
  const events: Set<Event<any>> = new Set()

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
    parent: compositeName,
  })
  if (parentHooks) {
    forward({from: event, to: parentHooks.event})
    forward({from: effect, to: parentHooks.effect})
    forward({from: store, to: parentHooks.store})
    forward({from: domain, to: parentHooks.domain})
  }
  const hooks: {|
    domain: Event<Domain>,
    effect: Event<Effect<any, any, any>>,
    event: Event<Event<any>>,
    store: Event<any>,
  |} = {event, effect, store, domain}

  const node = createNode({
    node: [],
    scope: {
      history: {
        domains,
        storages,
        effects,
        events,
      },
    },
  })

  return {
    graphite: node,
    compositeName,
    id,
    defaultConfig: config,
    getType() {
      return compositeName.fullName
    },
    onCreateEvent: createHook(event, events, node),
    onCreateEffect: createHook(effect, effects, node),
    onCreateStore: createHook(store, storages, node),
    onCreateDomain: createHook(domain, domains, node),
    event<Payload>(
      name?: string,
      config?: Config<EventConfigPart>,
    ): Event<Payload> {
      const result = eventFabric({
        name,
        parent: compositeName,
        config: normalizeConfig(config),
      })
      addLinkToOwner(node, result)
      event(result)
      return result
    },
    effect<Params, Done, Fail>(
      name?: string,
      config?: Config<EffectConfigPart<Params, Done>>,
    ): Effect<Params, Done, Fail> {
      const result = effectFabric({
        name,
        parent: compositeName,
        config: normalizeConfig(config),
      })
      addLinkToOwner(node, result)
      effect(result)
      return result
    },
    domain(name?: string, config?: Config<DomainConfigPart>) {
      const result = domainFabric({
        name,
        parent: compositeName,
        parentHooks: hooks,
        config: normalizeConfig(config),
      })
      addLinkToOwner(node, result)
      domain(result)
      return result
    },
    store<T>(state: T, config?: Config<StoreConfigPart>): Store<T> {
      const result = storeFabric({
        currentState: state,
        parent: compositeName,
        //$todo
        config: normalizeConfig(config),
      })
      addLinkToOwner(node, result)
      store(result)
      return result
    },
    kind: Kind.domain,
  }
}
