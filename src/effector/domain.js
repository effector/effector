//@flow

import {createEvent} from './event'
import {createEffect} from '../effect'
import {createStore} from '../store'
import type {Store} from './index.h'

export function createDomain({domain}: {domain: string[]}) {
 return {
  event(name: string) {
   return createEvent(joinName([...domain, name]))
  },
  effect(name: string) {
   return createEffect(joinName([...domain, name]))
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
