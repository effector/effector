//@flow

import {equals} from './util'
import {DERIVATION, LENS, REACTOR} from './types'
import {UNKNOWN, UNCHANGED, CHANGED} from './states'

function mark(node: *, reactors: Array<*>) {
 for (let i = 0, len = node._activeChildren.length; i < len; i++) {
  const child = node._activeChildren[i]
  switch (child._type) {
   case DERIVATION:
   case LENS:
    if (child._state !== UNKNOWN) {
     child._state = UNKNOWN
     mark(child, reactors)
    }
    break
   case REACTOR:
    reactors.push(child)
    break
  }
 }
}

export function processReactors(reactors: *) {
 for (let i = 0, len = reactors.length; i < len; i++) {
  const r = reactors[i]
  if (r._reacting) {
   throw Error(
    'Synchronous cyclical reactions disallowed. ' + 'Use setImmediate.',
   )
  }
  r._maybeReact()
 }
}

const TransactionAbortion = {}

function initiateAbortion() {
 throw TransactionAbortion
}
class TransactionContext {
 id2originalValue: * = {}
 parent: *
 modifiedAtoms: * = []
 constructor(parent: *) {
  this.parent = parent
 }
}
export function maybeTrack(atom: *) {
 if (currentCtx === null) return
 if (atom._id in currentCtx.id2originalValue) return
 currentCtx.modifiedAtoms.push(atom)
 currentCtx.id2originalValue[atom._id] = atom._value
}

let currentCtx = null

export function inTransaction() {
 return currentCtx !== null
}

function transact(f: *) {
 beginTransaction()
 try {
  f(initiateAbortion)
 } catch (e) {
  abortTransaction()
  if (e !== TransactionAbortion) {
   throw e
  }
  return
 }
 commitTransaction()
}

export function atomically(f: *) {
 if (!inTransaction()) {
  transact(f)
 } else {
  f()
 }
}

export function atomic(f: *) {
 return (...args: *) => {
  let result
  atomically(() => {
   result = f(...args)
  })
  return result
 }
}

function beginTransaction() {
 currentCtx = new TransactionContext(currentCtx)
}

function commitTransaction() {
 if (currentCtx === null) return
 const ctx = currentCtx
 currentCtx = ctx.parent

 if (currentCtx !== null) return
 const reactors = []
 ctx.modifiedAtoms.forEach(a => {
  if (equals(a, a._value, ctx.id2originalValue[a._id])) {
   a._state = UNCHANGED
  } else {
   a._state = CHANGED
   mark(a, reactors)
  }
 })
 processReactors(reactors)
 ctx.modifiedAtoms.forEach(a => {
  a._state = UNCHANGED
 })
}

function abortTransaction() {
 if (currentCtx === null) return
 const ctx = currentCtx
 currentCtx = ctx.parent
 ctx.modifiedAtoms.forEach(atom => {
  atom._value = ctx.id2originalValue[atom._id]
  atom._state = UNCHANGED
  mark(atom, [])
 })
}
