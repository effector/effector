//@flow

import invariant from 'invariant'

import {getFromAnyMap, getListeners, getReferences, type Scope} from './scope'
import type {Emittery} from './index.h'

const resolvedPromise = Promise.resolve()

export function dispatchSync<T>(
 scope: Scope,
 eventName: Emittery,
 eventData: T,
) {
 const refs = getReferences(scope, eventName)
 if (refs.size === 0) return
 invariant(!refs.has(eventName), 'circular reference')
 for (const instance of [...refs]) {
  emitSync(scope, instance, eventName, eventData)
 }
}

export function emitSync<T>(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
 eventData: T,
) {
 const listeners = [...getListeners(scope, instance, eventName)]
 const anyListeners = [...getFromAnyMap(scope, instance)]

 for (const listener of listeners) {
  listener(eventData, eventName)
 }

 for (const listener of anyListeners) {
  listener(eventData, eventName)
 }
}

export async function emit(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
 eventData: mixed,
) {
 const listeners = getListeners(scope, instance, eventName)
 const anyListeners = getFromAnyMap(scope, instance)
 const staticListeners = [...listeners]
 const staticAnyListeners = [...anyListeners]

 await resolvedPromise
 return Promise.all([
  ...staticListeners.map(async listener => {
   if (listeners.has(listener)) {
    return listener(eventData, eventName)
   }
  }),
  ...staticAnyListeners.map(async listener => {
   if (anyListeners.has(listener)) {
    return listener(eventData, eventName)
   }
  }),
 ])
}

export async function emitSerial(
 scope: Scope,
 instance: Emittery,
 eventName: Emittery,
 eventData: mixed,
): Promise<void> {
 const listeners = getListeners(scope, instance, eventName)
 const anyListeners = getFromAnyMap(scope, instance)
 const staticListeners = [...listeners]
 const staticAnyListeners = [...anyListeners]

 await resolvedPromise
 for (const listener of staticListeners) {
  if (listeners.has(listener)) {
   await listener(eventData, eventName)
  }
 }

 for (const listener of staticAnyListeners) {
  if (anyListeners.has(listener)) {
   await listener(eventData, eventName)
  }
 }
}
