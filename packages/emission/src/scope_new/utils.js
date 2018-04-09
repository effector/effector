//@flow

import type {SetMap} from '../index.h'

export function genericSafeGet<K, V>(
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

export function getFromSetMap<K, V>(
 setMap: SetMap<K, Set<V>>,
 that: K,
): Set<V> {
 return genericSafeGet(setMap, that, () => new Set())
}

export function getFromWeakMap<K1, K2, V>(
 setMap: SetMap<K1, WeakMap<K2, V>>,
 that: K1,
): WeakMap<K2, V> {
 return genericSafeGet(setMap, that, () => new WeakMap())
}
