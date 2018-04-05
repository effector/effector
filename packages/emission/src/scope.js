//@flow

import type {LongCb, SetMap, Emittery} from './index.h'

export class Scope {
 anyMap: WeakMap<Emittery, Set<LongCb>> = new WeakMap()
 dispatchMap: WeakMap<Emittery, Set<LongCb>> = new WeakMap()
 eventsMap: WeakMap<Emittery, Map<Emittery, Set<LongCb>>> = new WeakMap()
 referenceMap: WeakMap<Emittery, Set<Emittery>> = new WeakMap()
}

function genericSafeGet<K, V>(
 store: SetMap<K, V>,
 instance: K,
 fabric: () => V,
): V {
 const result = store.get(instance)
 if (result !== undefined) return result
 const value = fabric()
 store.set(instance, value)
 return value
}

function getFromSetMap<K, V>(setMap: SetMap<K, Set<V>>, that: K): Set<V> {
 return genericSafeGet(setMap, that, () => new Set())
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
