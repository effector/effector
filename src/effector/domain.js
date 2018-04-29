//@flow

import {createEvent, createEffect} from './derived'
// import {createEffect} from './event'
import {createStore, type Store} from '../store'

export function createDomain({domain}: {domain: string[]}) {
 return {
  event(name: string) {
   return createEvent(name)
  },
  effect(name: string) {
   return createEffect(name)
  },
  domain(name: string) {
   return createDomain({domain: [name].concat(domain)})
  },
  store<T>(state: T): Store<T> {
   return createStore(state)
  },
 }
}

export function createRootDomain(name?: string) {
 if (name === undefined) return createDomain({domain: []})
 return createDomain({domain: [name]})
}
