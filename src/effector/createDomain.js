//@flow

import type {Store, Event, Effect, Domain} from './unit.h'
import {own} from './own'
import {createNode} from './createNode'
import type {Config} from './config'
import {
  createEvent,
  createStore,
  createNamedEvent,
  initUnit,
} from './createUnit'
import {createEffect} from './createEffect'
import {forward} from './forward'
import {addToRegion} from './region'

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
  const [event, effect, store, domain] = [
    'onEvent',
    'onEffect',
    'onStore',
    'onDomain',
  ].map(createNamedEvent)

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
  result.hooks = hooks
  result.onCreateEvent = createHook(event, events, node)
  result.onCreateEffect = createHook(effect, effects, node)
  result.onCreateStore = createHook(store, stores, node)
  result.onCreateDomain = createHook(domain, domains, node)

  result.createEvent = result.event = (nameOrConfig, config?: Config<any>) =>
    event(
      createEvent(nameOrConfig, {
        parent: result,
        config,
      }),
    )
  result.createEffect = result.effect = (nameOrConfig, config?: Config<any>) =>
    effect(
      createEffect(nameOrConfig, {
        parent: result,
        config,
      }),
    )
  result.createDomain = result.domain = (nameOrConfig, config?: Config<any>) =>
    createDomain({
      name: nameOrConfig,
      parent: result,
      config,
    })
  result.createStore = result.store = (state: any, config?: Config<any>) =>
    store(
      createStore(state, {
        parent: result,
        config,
      }),
    )
  addToRegion(result)
  const parent = result.parent
  if (parent) {
    for (const key in hooks) {
      forward({from: hooks[key], to: parent.hooks[key]})
    }
    parent.hooks.domain(result)
  }
  return result
}
