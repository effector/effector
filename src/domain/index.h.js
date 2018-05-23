//@flow

import type {CompositeName} from '../compositeName'
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {Store} from 'effector/store'

export type Domain = {
 event<Payload>(name?: string): Event<Payload>,
 effect<Params, Done, Fail>(name: string): Effect<Params, Done, Fail>,
 domain(name: string): Domain,
 store<State>(defaultState: State): Store<State>,
 compositeName: CompositeName,
}
