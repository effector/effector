//@flow

import {stringRefcount, Kind} from '../stdlib'
import {type Store, storeFabric} from '../store'
import {
  normalizeConfig,
  type Config,
  type EffectConfigPart,
  type EventConfigPart,
  type StoreConfigPart,
} from '../config'
import {type Event, eventFabric} from '../event'
import {type Effect, effectFabric} from '../effect'

import type {Domain, DomainHooks} from './index.h'
import type {DomainConfigPart} from '../config'
import {createName, type CompositeName} from '../compositeName'
import {DomainHistory, domainHooks} from './hook'

const nextID = stringRefcount()

export function domainFabric({
  name: nameRaw,
  config = {},
  parent,
  parentHooks,
}: {
  name?: string,
  config?: DomainConfigPart,
  parent?: CompositeName,
  parentHooks?: DomainHooks,
}): Domain {
  const id = nextID()
  const name = nameRaw || ''
  const compositeName = createName(name, parent)
  const history = new DomainHistory()
  const hooks = domainHooks(history, compositeName, parentHooks)

  return {
    compositeName,
    id,
    defaultConfig: config,
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
    event<Payload>(
      name?: string,
      config: Config<EventConfigPart> = {},
    ): Event<Payload> {
      const opts = normalizeConfig(config)
      const result = eventFabric({
        name,
        parent: compositeName,
        config: opts,
      })
      hooks.event(result)
      return result
    },
    effect<Params, Done, Fail>(
      name?: string,
      config: Config<EffectConfigPart<Params, Done>> = {},
    ): Effect<Params, Done, Fail> {
      const opts = normalizeConfig(config)
      const result = effectFabric({
        name,
        domainName: compositeName.fullName,
        parent: compositeName,
        config: opts,
      })
      hooks.effect(result)
      return result
    },
    domain(name?: string, config: Config<DomainConfigPart> = {}) {
      const opts = normalizeConfig(config)
      const result = domainFabric({
        name,
        parent: compositeName,
        parentHooks: hooks,
        config: opts,
      })
      hooks.domain(result)
      return result
    },
    store<T>(state: T, config: Config<StoreConfigPart> = {}): Store<T> {
      const opts = normalizeConfig(config)
      const result = storeFabric({
        currentState: state,
        parent: compositeName,
        config: opts,
      })
      hooks.store(result)
      return result
    },
    kind: Kind.domain,
  }
}
