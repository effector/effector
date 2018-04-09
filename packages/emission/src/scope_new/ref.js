//@flow

import type {Key, PrivateSetRef} from './index.h'

import {getFromWeakMap, getFromSetMap} from './utils'

export function get<T>(
 ref: PrivateSetRef<T>,
 instance: Key,
 eventName: Key,
): Set<T> {
 const weakRef = getFromWeakMap(ref, instance)
 return getFromSetMap(weakRef, eventName)
}

export function add<T>(
 value: T,
 ref: PrivateSetRef<T>,
 instance: Key,
 eventName: Key,
) {
 get(ref, instance, eventName).add(value)
}

export function remove<T>(
 value: T,
 ref: PrivateSetRef<T>,
 instance: Key,
 eventName: Key,
) {
 const weakRef = ref.get(instance)
 if (!weakRef) return
 const set = weakRef.get(eventName)
 if (!set) return
 set.delete(value)
}

export function size<T>(ref: PrivateSetRef<T>, instance: Key, eventName: Key) {
 const weakRef = ref.get(instance)
 if (!weakRef) return 0
 const set = weakRef.get(eventName)
 if (!set) return 0
 return set.size
}

export function clear<T>(ref: PrivateSetRef<T>, instance: Key, eventName: Key) {
 const weakRef = ref.get(instance)
 if (!weakRef) return
 const set = weakRef.get(eventName)
 if (!set) return
 return set.clear()
}

// export function has<T>(
//  value: T,
//  ref: PrivateSetRef<T>,
//  instance: Key,
//  eventName: Key,
// ) {
//  return get(ref, instance, eventName).has(value)
// }
