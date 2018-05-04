//@flow

import invariant from 'invariant'
import {equals} from './util'
import {UNCHANGED, CHANGED} from './states'
import {mark} from './mark'
import type {Reactor} from './reactors'

export function processReactors(reactors: Array<Reactor>) {
 for (let i = 0, len = reactors.length; i < len; i++) {
  const r = reactors[i]
  invariant(
   !r._reacting,
   'Synchronous cyclical reactions disallowed. ' + 'Use setImmediate.',
  )
  r._maybeReact()
 }
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
 if (atom.id in currentCtx.id2originalValue) return
 currentCtx.modifiedAtoms.push(atom)
 currentCtx.id2originalValue[atom.id] = atom._value
}

let currentCtx = null

export function inTransaction() {
 return currentCtx !== null
}

function transact(f) {
 let fail = true
 beginTransaction()
 try {
  f()
  fail = false
 } finally {
  if (fail) {
   abortTransaction()
  }
 }
 commitTransaction()
}

export function atomically(f: () => void) {
 if (!inTransaction()) {
  transact(f)
 } else {
  f()
 }
}

export function atomic<F: Function>(f: F): F {
 return ((...args: any[]) => {
  let result /*::=f(...args)*/
  atomically(() => {
   result = f(...args)
  })
  return result
 }: any)
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
  if (equals(a, a._value, ctx.id2originalValue[a.id])) {
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
  atom._value = ctx.id2originalValue[atom.id]
  atom._state = UNCHANGED
  mark(atom, [])
 })
}
