//@flow

import type {Store, Event, Effect, Domain} from './unit.h'
import {nextUnitID, own} from './stdlib'
import {createNode} from './createNode'
import {
  normalizeConfig,
  type Config,
  type EffectConfigPart,
  type EventConfigPart,
  type StoreConfigPart,
  type DomainConfigPart,
} from './config'
import {
  createEvent,
  createStore,
  createNamedEvent,
  initUnit,
} from './createUnit'
import {createEffect} from './createEffect'
import {forward} from './forward'
import {createName, type CompositeName} from './naming'

type DomainHooks = {|
  domain: Event<Domain>,
  effect: Event<Effect<any, any, any>>,
  event: Event<Event<any>>,
  store: Event<Store<any>>,
|}

const createHook = (trigger: Event<any>, acc: Set<any>, node) => {
  trigger.watch(data => {
    own(node, [data])
    acc.add(data)
  })
  own(node, [trigger])
  return (hook: (data: any) => any) => {
    acc.forEach(hook)
    return trigger.watch(hook)
  }
}

declare export function createDomain(
  name?: string | DomainConfigPart,
  config?: Config<DomainConfigPart>,
): Domain
export function createDomain(nameOrConfig: any, maybeConfig: any): Domain {
  const domains: Set<Domain> = new Set()
  const stores: Set<Store<any>> = new Set()
  const effects: Set<Effect<any, any, any>> = new Set()
  const events: Set<Event<any>> = new Set()

  const history = {
    domains,
    stores,
    effects,
    events,
  }

  const node = createNode({
    family: {type: 'domain'},
  })

  const result = {
    history,
    graphite: node,
  }

  node.meta = initUnit('domain', result, maybeConfig, nameOrConfig)
  const parentHooks = result.defaultConfig.parentHooks
  const {compositeName} = result
  const event = createNamedEvent('onEvent')
  const effect = createNamedEvent('onEffect')
  const store = createNamedEvent('onStore')
  const domain = createNamedEvent('onDomain')

  const hooks: {|
    domain: Event<Domain>,
    effect: Event<Effect<any, any, any>>,
    event: Event<Event<any>>,
    store: Event<any>,
  |} = {
    event,
    effect,
    store,
    domain,
  }
  if (parentHooks) {
    for (const key in hooks) {
      forward({from: hooks[key], to: parentHooks[key]})
    }
  }
  result.onCreateEvent = createHook(event, events, node)
  result.onCreateEffect = createHook(effect, effects, node)
  result.onCreateStore = createHook(store, stores, node)
  result.onCreateDomain = createHook(domain, domains, node)

  result.createEvent = result.event = <Payload>(
    name?: string,
    config?: Config<EventConfigPart>,
  ): Event<Payload> =>
      event(
        createEvent(name, {
          parent: compositeName,
          config,
        }),
      )
  result.createEffect = result.effect = <Params, Done, Fail>(
    name?: string,
    config?: Config<EffectConfigPart<Params, Done>>,
  ): Effect<Params, Done, Fail> =>
      effect(
        createEffect(name, {
          parent: compositeName,
          config,
        }),
      )
  result.createDomain = result.domain = (
    name?: string,
    config?: Config<DomainConfigPart>,
  ) =>
    domain(
      createDomain({
        name,
        parent: compositeName,
        parentHooks: hooks,
        config,
      }),
    )
  result.createStore = result.store = <T>(
    state: T,
    config?: Config<StoreConfigPart>,
  ): Store<T> =>
      store(
        createStore(state, {
          parent: compositeName,
          config,
        }),
      )
  return result
}
