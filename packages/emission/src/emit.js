//@flow

import invariant from 'invariant'

import {
 getFromAnyMap,
 getFromDispatchMap,
 getListeners,
 getReferences,
 type Scope,
} from './scope'
import type {Emittery} from './index.h'

const resolvedPromise = Promise.resolve()

function emitRefs(scope: Scope, eventName, refs, eventData) {
 if (refs.size === 0) return
 invariant(!refs.has(eventName), 'circular reference')
 for (const instance of [...refs]) {
  emitSync(scope, instance, eventName, eventData)
 }
}

function emitCallbacks(scope, eventName, eventData) {
 const refs = getFromDispatchMap(scope, eventName)
 //  console.log(eventName, eventData)
 if (refs.size === 0) return
 for (const instance of [...refs]) {
  instance(eventData, eventName)
 }
}

export function dispatchSync<T>(
 scope: Scope,
 eventName: Emittery,
 eventData: T,
) {
 const refs = getReferences(scope, eventName)
 emitRefs(scope, eventName, refs, eventData)
 emitCallbacks(scope, eventName, eventData)
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
 emitCallbacks(scope, eventName, eventData)
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
 emitCallbacks(scope, eventName, eventData)
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
 emitCallbacks(scope, eventName, eventData)
}
