//@flow

import type {
 LongCb,
 SetMap,
 Emittery,
 SideEffect,
 Private,
 PrivateRef,
 PrivateSet,
 PrivateSetRef,
} from './index.h'

export class Scope {
 anyMap: Private<Set<LongCb>> = new WeakMap()
 dispatchMap: Private<Set<LongCb>> = new WeakMap()
 offDispatchRef: PrivateRef<Set<SideEffect>> = new WeakMap()
 dispatchRef: PrivateSetRef<(_: any) => any> = new WeakMap()
 dispatchSet: PrivateSet<Emittery> = new WeakMap()
 eventsMap: Private<Map<Emittery, Set<LongCb>>> = new WeakMap()
 referenceMap: Private<Set<Emittery>> = new WeakMap()
}

function genericSafeGet<K, V>(
 store: SetMap<K, V>,
 instance: K,
 fabric: () => V,
): V {
 const result = store.get(instance)
 if (result !== undefined) return result
 const value = fabric()
 //  console.log(instance)
 store.set(instance, value)
 return value
}

function getFromSetMap<K, V>(setMap: SetMap<K, Set<V>>, that: K): Set<V> {
 return genericSafeGet(setMap, that, () => new Set())
}
function getFromWeakMap<K1, K2, V>(
 setMap: SetMap<K1, WeakMap<K2, V>>,
 that: K1,
): WeakMap<K2, V> {
 return genericSafeGet(setMap, that, () => new WeakMap())
}

function getFromRef<T>(
 ref: PrivateRef<Set<T>>,
 instance: Emittery,
 eventName: Emittery,
): Set<T> {
 const weakRef = getFromWeakMap(ref, instance)
 return getFromSetMap(weakRef, eventName)
}

export function getFromAnyMap(scope: Scope, instance: Emittery): Set<LongCb> {
 return getFromSetMap(scope.anyMap, instance)
}

export function getFromDispatchMap(
 scope: Scope,
 instance: Emittery,
): Set<LongCb> {
 return getFromSetMap(scope.dispatchMap, instance)
}

export function getFromEventsMap(
 scope: Scope,
 instance: Emittery,
): Map<Emittery, Set<LongCb>> {
 return genericSafeGet(scope.eventsMap, instance, () => new Map())
}

export function getListeners(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
): Set<LongCb> {
 const events = getFromEventsMap(scope, instance)
 return getFromSetMap(events, eventName)
}

export function getReferences(scope: Scope, instance: Emittery): Set<Emittery> {
 return getFromSetMap(scope.referenceMap, instance)
}
