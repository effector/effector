//@flow

import {eventFabric} from '../event'
import {effectFabric} from '../effect'
import {createStore} from '../store'
import type {Store} from './index.h'

export function createDomain({domain}: {domain: string[]}) {
 const domainName = joinName(domain)
 return {
  event(name: string) {
   return eventFabric({
    name,
    domainName,
   })
  },
  effect(name: string) {
   return effectFabric({
    name,
    domainName,
   })
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

function joinName(list) {
 return list.filter(e => e.length > 0).join('/')
}
