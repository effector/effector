//@flow

import invariant from 'invariant'
import {equals} from './util'
import {UNCHANGED, CHANGED} from './status'
import {mark} from './mark'
import type {Reactor} from './reactors'
import type {Atom} from './atom'
import {runReactor} from './methods/runReactor'
import warning from '../warning'

export function processReactors(reactors: Array<Reactor>) {
 for (let i = 0, len = reactors.length; i < len; i++) {
  const r = reactors[i]
  invariant(
   !r._reacting,
   'Synchronous cyclical reactions disallowed. ' + 'Use setImmediate.',
  )
  runReactor(r)
 }
}

class TransactionContext {
 id2originalValue: * = {}
 /*::;+*/ parent: TransactionContext | null
 /*::;+*/ level: number
 modifiedAtoms: Array<Atom<any>> = []
 constructor(parent: TransactionContext | null) {
  this.level = parent === null ? 0 : parent.level + 1
  this.parent = parent
 }
}

export function maybeTrack<T>(atom: Atom<T>) {
 if (currentCtx === null) return
 if (atom.id in currentCtx.id2originalValue) return
 currentCtx.modifiedAtoms.push(atom)
 currentCtx.id2originalValue[atom.id] = atom._value
}

let currentCtx: TransactionContext | null = null

export function inTransaction() {
 return currentCtx !== null
}

function transact(f) {
 let fail = false
 beginTransaction()
 try {
  f()
 } catch (err) {
  warning(err)
  fail = true
 }
 if (fail) {
  abortTransaction()
 } else {
  commitTransaction()
 }
}

export function atomically(f: () => void) {
 if (!inTransaction()) {
  transact(f)
 } else {
  try {
   f()
  } catch (err) {
   warning(err)
  }
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
