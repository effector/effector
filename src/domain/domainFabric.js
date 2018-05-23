//@flow

import type {Domain} from './index.h'
import {type Store, createStore} from 'effector/store'
import {type Event, eventFabric} from 'effector/event'
import {type Effect, effectFabric} from 'effector/effect'
import {createName, type CompositeName} from '../compositeName'

export function domainFabric(name: string, parent?: CompositeName): Domain {
 const compositeName = createName(name, parent)
 return {
  compositeName,
  event<Payload>(name?: string): Event<Payload> {
   return eventFabric({
    name,
    domainName: compositeName.fullName,
    parent: compositeName,
   })
  },
  effect<Params, Done, Fail>(name: string): Effect<Params, Done, Fail> {
   return effectFabric({
    name,
    domainName: compositeName.fullName,
   })
  },
  domain(name: string) {
   return domainFabric(name, compositeName)
  },
  store<T>(state: T): Store<T> {
   return createStore(state)
  },
 }
}
