//@flow

import type {Store, Event, Effect, Domain} from './unit.h'
import {nextUnitID, Kind, addLinkToOwner, createNode} from './stdlib'
import {createStore} from './store'
import {
  normalizeConfig,
  type Config,
  type EffectConfigPart,
  type EventConfigPart,
  type StoreConfigPart,
  type DomainConfigPart,
} from './config'
import {eventFabric} from './event'
import {effectFabric} from './effect'
import {forward} from './forward'
import {createName, type CompositeName} from './naming'

export function createDomain(
  name?: string | DomainConfigPart,
  config?: Config<DomainConfigPart>,
) {
  return domainFabric({name, config})
}

type DomainHooks = {|
  domain: Event<Domain>,
  effect: Event<Effect<any, any, any>>,
  event: Event<Event<any>>,
  store: Event<Store<any>>,
|}

const createHook = (trigger: Event<any>, acc: Set<any>, node) => {
  trigger.watch(data => {
    addLinkToOwner(node, data)
    acc.add(data)
  })
  addLinkToOwner(node, trigger)
  return (hook: (data: any) => any) => {
    acc.forEach(hook)
    return trigger.watch(hook)
  }
}

function domainFabric(opts: {
  +name?: string,
  +config?: DomainConfigPart,
  +parent?: CompositeName,
  +parentHooks?: DomainHooks,
  ...
}): Domain {
  const id = nextUnitID()
  const config = normalizeConfig(opts)
  const {name: nameRaw, parent, parentHooks} = config
  const compositeName = createName(nameRaw || '', parent)
  const {fullName} = compositeName
  const domains: Set<Domain> = new Set()
  const stores: Set<Store<any>> = new Set()
  const effects: Set<Effect<any, any, any>> = new Set()
  const events: Set<Event<any>> = new Set()

  const event: Event<Event<any>> = eventFabric({
    name: `${fullName} event hook`,
    parent: compositeName,
  })
  const effect: Event<Effect<any, any, any>> = eventFabric({
    name: `${fullName} effect hook`,
    parent: compositeName,
  })
  const store: Event<Store<any>> = eventFabric({
    name: `${fullName} store hook`,
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

  const history = {
    domains,
    stores,
    storages: stores, // PLEASE USE .stores, THAT PROPERTY IS NOT SUPPORTED AND WILL BE REMOVED SOON
    effects,
    events,
  }

  const node = createNode({
    node: [],
    scope: {history},
    meta: {unit: 'domain'},
    family: {
      type: 'domain',
    },
  })

  return {
    graphite: node,
    compositeName,
    id,
    defaultConfig: config,
    shortName: compositeName.shortName,
    getType: () => fullName,
    onCreateEvent: createHook(event, events, node),
    onCreateEffect: createHook(effect, effects, node),
    onCreateStore: createHook(store, stores, node),
    onCreateDomain: createHook(domain, domains, node),
    history,
    event: <Payload>(
      name?: string,
      config?: Config<EventConfigPart>,
    ): Event<Payload> =>
      event(
        eventFabric({
          name,
          parent: compositeName,
          config,
        }),
      ),
    effect: <Params, Done, Fail>(
      name?: string,
      config?: Config<EffectConfigPart<Params, Done>>,
    ): Effect<Params, Done, Fail> =>
      effect(
        effectFabric({
          name,
          parent: compositeName,
          config,
        }),
      ),
    domain: (name?: string, config?: Config<DomainConfigPart>) =>
      domain(
        domainFabric({
          name,
          parent: compositeName,
          parentHooks: hooks,
          config,
        }),
      ),
    store: <T>(state: T, config?: Config<StoreConfigPart>): Store<T> =>
      store(
        createStore(state, {
          parent: compositeName,
          config,
        }),
      ),
    kind: Kind.domain,
    sid: config.sid || null,
  }
}
