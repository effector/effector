//@flow

import type {CompositeName} from '../compositeName'
import type {Subscription} from '../effector/index.h'
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {Store} from 'effector/store'

export type Domain = {
 /*:: +*/ id: string,
 onCreateEvent(hook: (newEvent: Event<any>) => any): Subscription,
 onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any): Subscription,
 onCreateStore(hook: (newStore: Store<any>) => any): Subscription,
 onCreateDomain(hook: (newDomain: Domain) => any): Subscription,
 event<Payload>(name?: string): Event<Payload>,
 effect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail>,
 domain(name?: string): Domain,
 store<State>(defaultState: State): Store<State>,
 compositeName: CompositeName,
 getType(): string,
}

export type DomainHooks = {
 domain: Event<Domain>,
 effect: Event<Effect<any, any, any>>,
 event: Event<Event<any>>,
 store: Event<Store<any>>,
}
