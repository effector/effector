//@flow

import {from} from 'most'

import warning from 'warning'
import {createStore} from './createStore'
import type {Event} from 'effector/event'
import type {Store} from 'effector/store'

export function epic<E, S>(event: Event<E>, store: Store<S>, fn: Function) {
 warning(false, '.epic is deprecated, use from(store) of Observable.of(store)')
 const store$ = from(store).multicast()
 const event$ = from(event).multicast()
 const mapped$ = fn(event$, store$).multicast()
 const innerStore = (createStore: any)(store.getState())
 const subs = mapped$.subscribe({
  next(value) {
   innerStore.setState(value)
  },
  error(err) {
   console.error(err)
  },
  complete() {
   subs()
  },
 })
 return innerStore
}
