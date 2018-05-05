//@flow

// import invariant from 'invariant'
import {equals} from '../util'
import {
 startCapturingParents,
 retrieveParentsFrame,
 stopCapturingParents,
 maybeCaptureParent,
} from '../parents'
import {CHANGED, UNCHANGED, UNKNOWN} from '../status'
import {detach} from '../detach'
import type {Derivation} from '../derivation'

export function get<T>(instance: Derivation<*>): T {
 maybeCaptureParent(instance)
 if (instance._activeChildren.length > 0) {
  update(instance)
 } else {
  startCapturingParents(void 0, [])
  try {
   instance._value = instance._deriver()
  } finally {
   stopCapturingParents()
  }
 }
 return instance._value
}

function update<T>(instance: Derivation<T>) {
 if (instance._parents === null) {
  // this._state === DISCONNECTED
  forceEval(instance)
  // this._state === CHANGED ?
  return
 }
 if (instance._state !== UNKNOWN) return
 const len = instance._parents.length
 for (let i = 0; i < len; i++) {
  const parent = instance._parents[i]

  if (parent._state === UNKNOWN) {
   update(parent)
  }

  if (parent._state === CHANGED) {
   forceEval(instance)
   break
  }
 }
 if (instance._state === UNKNOWN) {
  instance._state = UNCHANGED
 }
}

function forceEval<T>(instance: Derivation<T>) {
 let newVal = null
 let newNumParents

 if (instance._parents === null) {
  instance._parents = []
 }
 try {
  startCapturingParents(instance, instance._parents)
  newVal = instance._deriver()
  newNumParents = retrieveParentsFrame().offset
 } finally {
  stopCapturingParents()
 }

 if (!equals(instance, newVal, instance._value)) {
  instance._state = CHANGED
 } else {
  instance._state = UNCHANGED
 }
 /*::
 if (instance._parents === null) throw new Error('')
 */
 for (let i = newNumParents; i < instance._parents.length; i++) {
  const oldParent = instance._parents[i]
  detach(oldParent, instance)
  if (instance._parents) instance._parents[i] = null
 }

 instance._parents.length = newNumParents

 instance._value = newVal
}
