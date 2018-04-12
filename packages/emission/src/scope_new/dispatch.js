//@flow

import invariant from 'invariant'

import type {Scope} from './scope'
import * as EventRef from './ref'
import * as EventSet from './set'
import type {Key} from './index.h'

export function dispatch(scope: Scope, event: Key, value: any) {
 for (const instance of EventSet.get(scope.dispatchSet, event)) {
  invariant(instance !== event, 'circular reference')
  for (const fn of EventRef.get(scope.dispatchRef, instance, event)) {
   fn(value)
  }
 }
}
