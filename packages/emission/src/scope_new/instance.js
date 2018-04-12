//@flow

import {Scope} from './scope'
import {createKey} from './key'
import type {SideEffect} from '../index.h'
import type {Key} from './index.h'
import * as EventWatcher from './watcher'
import * as EventSet from './set'
import {dispatch} from './dispatch'

const defaultScope = new Scope()

export class Emission {
 /*::;+*/ key: Key = createKey()
 watch(
  event: Emission,
  fn: (_: any) => any,
  scope: Scope = defaultScope,
 ): SideEffect {
  EventWatcher.add(scope, this.key, event.key, fn)
  return () => EventWatcher.remove(scope, this.key, event.key, fn)
 }
 dispatch(value: any, scope: Scope = defaultScope) {
  dispatch(scope, this.key, value)
 }
 unlink(event: Emission | Key, scope: Scope = defaultScope) {
  const key = event instanceof Emission ? event.key : event
  EventWatcher.clear(scope, this.key, key)
 }
 clear(scope: Scope = defaultScope) {
  const set = EventSet.get(scope.dispatchSet, this.key)
  for (const event of set) {
   this.unlink(event, scope)
  }
  set.clear()
 }
}
