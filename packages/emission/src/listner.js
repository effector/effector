//@flow

import invariant from 'invariant'

import {
 getFromAnyMap,
 getFromEventsMap,
 getListeners,
 getReferences,
 type Scope,
} from './scope'
import type {LongCb, Emittery, SideEffect} from './index.h'

export function clearListeners(
 scope: Scope,
 instance: Emittery,
 eventName?: Emittery,
) {
 if (eventName !== undefined) {
  getListeners(scope, instance, eventName).clear()
 } else {
  getFromAnyMap(scope, instance).clear()
  for (const listeners of getFromEventsMap(scope, instance).values()) {
   listeners.clear()
  }
 }
}

export function listenerCount(
 scope: Scope,
 instance: Emittery,
 eventName?: Emittery,
) {
 let count = getFromAnyMap(scope, instance).size
 if (eventName !== undefined) {
  return count + getListeners(scope, instance, eventName).size
 }

 for (const value of getFromEventsMap(scope, instance).values()) {
  count += value.size
 }

 return count
}

export function on(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
 listener: LongCb,
): SideEffect {
 invariant(instance !== eventName, 'circular reference')
 //TODO add support for many listers for one event in references
 getReferences(scope, eventName).add(instance)
 getListeners(scope, instance, eventName).add(listener)
 return () => off(scope, instance, eventName, listener)
}

export function off(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
 listener: LongCb,
) {
 getReferences(scope, eventName).delete(instance)
 getListeners(scope, instance, eventName).delete(listener)
}

export function once(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
): Promise<mixed> {
 return new Promise((rs, rj) => {
  try {
   const off = on(scope, instance, eventName, (data: mixed) => {
    off()
    rs(data)
   })
  } catch (err) {
   rj(err)
  }
 })
}

export function onAny(
 scope: Scope,
 instance: Emittery,
 listener: LongCb,
): SideEffect {
 getFromAnyMap(scope, instance).add(listener)
 return () => offAny(scope, instance, listener)
}

export function offAny(scope: Scope, instance: Emittery, listener: LongCb) {
 getFromAnyMap(scope, instance).delete(listener)
}
