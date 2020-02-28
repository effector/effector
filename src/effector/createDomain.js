//@flow

import type {Store, Event, Effect, Domain} from './unit.h'
import {own} from './own'
import {createNode} from './createNode'
import type {Config} from './index.h'
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
    if (!data.parent) data.parent = node
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

  const node = createNode({
    family: {type: 'domain'},
  })

  const result = {
    history: {
      domains,
      stores,
      effects,
      events,
    },
    graphite: node,
  }

  node.meta = initUnit('domain', result, maybeConfig, nameOrConfig)
  const [event, effect, store, domain] = [
    'onEvent',
    'onEffect',
    'onStore',
    'onDomain',
  ].map(createNamedEvent)

  const hooks = (result.hooks = {
    event,
    effect,
    store,
    domain,
  })
  result.onCreateEvent = createHook(event, events, result)
  result.onCreateEffect = createHook(effect, effects, result)
  result.onCreateStore = createHook(store, stores, result)
  result.onCreateDomain = createHook(domain, domains, result)

  result.createEvent = result.event = (nameOrConfig, config?: Config) =>
    event(
      createEvent(nameOrConfig, {
        parent: result,
        config,
      }),
    )
  result.createEffect = result.effect = (nameOrConfig, config?: Config) =>
    effect(
      createEffect(nameOrConfig, {
        parent: result,
        config,
      }),
    )
  result.createDomain = result.domain = (nameOrConfig, config?: Config) =>
    createDomain({
      name: nameOrConfig,
      parent: result,
      config,
    })
  result.createStore = result.store = (state: any, config?: Config) =>
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
