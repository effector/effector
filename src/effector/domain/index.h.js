//@flow

import type {CompositeName} from '../compositeName'
import type {Subscription} from '../index.h'
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {Store} from 'effector/store'
import type {
  Config,
  StoreConfigPart,
  EventConfigPart,
  EffectConfigPart,
} from '../config'
import type {kind} from 'effector/stdlib'

export type Domain = {
  /*:: +*/ id: string,
  onCreateEvent(hook: (newEvent: Event<any>) => any): Subscription,
  onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any): Subscription,
  onCreateStore(hook: (newStore: Store<any>) => any): Subscription,
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription,
  event<Payload>(
    name?: string,
    config?: Config<EventConfigPart>,
  ): Event<Payload>,
  effect<Params, Done, Fail>(
    name?: string,
    config?: Config<EffectConfigPart<Params, Done>>,
  ): Effect<Params, Done, Fail>,
  domain(name?: string): Domain,
  store<State>(
    defaultState: State,
    config?: Config<StoreConfigPart>,
  ): Store<State>,
  compositeName: CompositeName,
  getType(): string,
  kind: kind,
}

export type DomainHooks = {
  domain: Event<Domain>,
  effect: Event<Effect<any, any, any>>,
  event: Event<Event<any>>,
  store: Event<Store<any>>,
}
