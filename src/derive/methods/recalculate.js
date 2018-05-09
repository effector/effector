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
 if (instance.activeChildren.length > 0) {
  update(instance)
 } else {
  startCapturingParents(void 0, [])
  try {
   instance.value = instance.deriver()
  } finally {
   stopCapturingParents()
  }
 }
 return instance.value
}

function update<T>(instance: Derivation<T>) {
 if (instance.parents === null) {
  // this.status === DISCONNECTED
  forceEval(instance)
  // this.status === CHANGED ?
  return
 }
 if (instance.status !== UNKNOWN) return
 const len = instance.parents.length
 for (let i = 0; i < len; i++) {
  const parent = instance.parents[i]

  if (parent.status === UNKNOWN) {
   update(parent)
  }

  if (parent.status === CHANGED) {
   forceEval(instance)
   break
  }
 }
 if (instance.status === UNKNOWN) {
  instance.status = UNCHANGED
 }
}

function forceEval<T>(instance: Derivation<T>) {
 let newVal = null
 let newNumParents

 if (instance.parents === null) {
  instance.parents = []
 }
 try {
  startCapturingParents(instance, instance.parents)
  newVal = instance.deriver()
  newNumParents = retrieveParentsFrame().offset
 } finally {
  stopCapturingParents()
 }

 if (!equals(instance, newVal, instance.value)) {
  instance.status = CHANGED
 } else {
  instance.status = UNCHANGED
 }
 /*::
 if (instance.parents === null) throw new Error('')
 */
 for (let i = newNumParents; i < instance.parents.length; i++) {
  const oldParent = instance.parents[i]
  detach(oldParent, instance)
  if (instance.parents) instance.parents[i] = null
 }

 instance.parents.length = newNumParents

 instance.value = newVal
}
