//@flow

// import invariant from 'invariant'

import type {Scope} from './scope'
import * as EventRef from './ref'
import * as EventSet from './set'
import type {Key} from './index.h'

export function add(
 scope: Scope,
 instance: Key,
 event: Key,
 fn: (_: any) => any,
) {
 EventSet.add(scope.dispatchSet, instance, event)
 EventRef.add(fn, scope.dispatchRef, instance, event)
}

export function remove(
 scope: Scope,
 instance: Key,
 event: Key,
 fn: (_: any) => any,
) {
 EventRef.remove(fn, scope.dispatchRef, instance, event)
 const refSize = EventRef.size(scope.dispatchRef, instance, event)
 if (refSize > 0) return
 EventSet.remove(scope.dispatchSet, instance, event)
}

export function clear(scope: Scope, instance: Key, event: Key) {
 EventRef.clear(scope.dispatchRef, instance, event)
 EventSet.clear(scope.dispatchSet, instance, event)
}
