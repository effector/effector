//@flow
import invariant from 'invariant'

import {setEquals, equals, nextId} from './util'
import {maybeTrack, inTransaction, processReactors} from './transactions'
import {maybeCaptureParent} from './parents'
import {ATOM, DERIVATION, LENS, REACTOR, isDerivable} from './types'
import {UNCHANGED, CHANGED, UNKNOWN} from './states'
import {makeReactor} from './makeReactor'
import {derive} from './derivation'
import {update} from './update'
import {deriveFrom} from './methods/deriveFrom'
import {maybeDerive} from './methods/maybeDerive'
import {withEquality} from './methods/withEquality'
import type {Reactor} from './reactors'

// import {Abstract} from './instance'
import {Derivation} from './derivation'

import type {Lifecycle} from '.'

declare function some(x: mixed): boolean %checks(typeof x !== 'undefined' &&
 x !== null)
function some(x: mixed) {
 return typeof x !== 'undefined' && x !== null
}

export class Atom<T> {
 /*::+*/ _id: number = nextId()
 _state = UNCHANGED
 _equals /*: null | (a: mixed, b: mixed) => boolean*/ = null

 /*::
 _type = ATOM
 */
 _value: T
 _activeChildren: Array<Reactor | Derivation<*>> = []
 constructor(value: T) {
  this._value = value
 }

 derive<S>(f: (_: T) => S) {
  return deriveFrom(this, f)
 }

 maybeDerive<S>(f: (_: T) => S) {
  return maybeDerive(Derivation, this, f)
 }

 orDefault(def: T) {
  invariant(some(def), 'orDefault requires non-null value')
  return deriveFrom(this, value => (some(value) ? value : def))
 }

 react(f: Function, opts?: Lifecycle<T>) {
  makeReactor(this, f, opts)
 }

 maybeReact(f: Function, opts?: Lifecycle<T>) {
  let maybeWhen = deriveFrom(this, Boolean)
  if (opts && 'when' in opts && opts.when !== true) {
   let when = opts.when
   if (typeof when === 'function' || when === false) {
    when = derive(when)
   }
   invariant(
    isDerivable(when),
    'when condition must be bool, function, or derivable',
   )
   maybeWhen = maybeWhen.derive(d => d && when && when.get())
  }
  makeReactor(this, f, {...opts, when: maybeWhen})
 }

 _clone(): Atom<T> {
  const result: Atom<T> = new Atom(this._value)
  result._equals = this._equals
  return result
 }

 set(value: T) {
  maybeTrack(this)

  const oldValue = this._value
  this._value = value

  if (inTransaction()) return
  if (equals(this, value, oldValue)) return
  this._state = CHANGED
  const reactors: Array<*> = []
  try {
   mark(this, reactors)
   processReactors(reactors)
  } finally {
   this._state = UNCHANGED
  }
 }

 get(): T {
  if (typeof global.__DERIVABLE_DEVTOOLS_HOOK__ === 'function') {
   global.__DERIVABLE_DEVTOOLS_HOOK__('captureAtom', this)
  }
  maybeCaptureParent(this)
  return this._value
 }
 update(f: Function, ...args: any[]) {
  return update(this, f, args)
 }
 withEquality(equals: (a: mixed, b: mixed) => boolean) {
  return withEquality(this, equals)
 }
}

Object.defineProperty(Atom.prototype, '_type', {
 value: ATOM,
 configurable: true,
})

export function atom<T>(value: T): Atom<T> {
 return new Atom(value)
}

function mark(node, reactors) {
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
