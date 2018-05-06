//@flow
// import invariant from 'invariant'

import {
 maybeTrack,
 inTransaction,
 processReactors,
 atomically,
} from '../transactions'

import {UNCHANGED, CHANGED, type Status} from '../status'

import {mark} from '../mark'
import warning from '../../warning'
import type {Atom} from '../atom'
import type {Lens} from '../lens'
import * as Kind from '../../kind'

function equalsAtom(ctx, a: any, b: any): boolean {
 if (typeof ctx._equals === 'function') return ctx._equals(a, b)
 return (
  Object.is(a, b)
  || (a != null && typeof a.equals === 'function' && a.equals(b))
 )
}

export function setAtom<T>(atom: Atom<T>, value: T) {
 maybeTrack(atom)

 const oldValue = atom._value
 atom._value = value

 if (inTransaction()) return
 if (equalsAtom(atom, value, oldValue)) return
 atom._state = CHANGED
 const reactors: Array<*> = []
 let isThrow = true
 try {
  mark(atom, reactors)
  processReactors(reactors)
  isThrow = false
 } finally {
  atom._state = UNCHANGED
  if (isThrow) {
   warning(`Error during atom's setting`)
  }
 }
}

export function setLens<T>(lens: Lens<T>, value: T) {
 atomically(() => {
  lens._descriptor.set(value)
 })
}
declare export function set<T>(instance: Lens<T> | Atom<T>, value: T): void
export function set<T>(instance: any, value: T) {
 switch (Kind.readKind(instance)) {
  case Kind.ATOM:
   return setAtom(instance, value)
  case Kind.LENS:
   return setLens(instance, value)
 }
}
