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

import type {Lifecycle} from '.'
import {unpack} from './unpack'

declare function some(x: mixed): boolean %checks(typeof x !== 'undefined' &&
 x !== null)
function some(x: mixed) {
 return typeof x !== 'undefined' && x !== null
}

export class Atom<T> {
 /*::+*/ _id: number = nextId()
 _state = UNCHANGED
 /*::
 _type = ATOM
 */
 _equals = null
 _value: T
 _meta: *
 _activeChildren = []
 constructor(value: T, meta: * = null) {
  this._value = value
  this._meta = meta
 }

 derive(f: Function) {
  invariant(typeof f === 'function', 'derive requires function')
  return derive(() => f(this.get()))
 }

 maybeDerive(f: Function) {
  invariant(typeof f === 'function', 'maybeDerive requires function')
  return derive(() => {
   const arg = this.get()
   return some(arg) ? f(arg) : null
  })
 }

 orDefault(def: T) {
  invariant(some(def), 'orDefault requires non-null value')
  return this.derive(value => (some(value) ? value : def))
 }

 react(f: Function, opts?: Lifecycle<T>) {
  makeReactor(this, f, opts)
 }

 maybeReact(f: Function, opts?: Lifecycle<T>) {
  let maybeWhen = this.derive(Boolean)
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

 is(other: *) {
  return derive(() => equals(this, this.get(), unpack(other)))
 }

 withEquality(equals: Function) {
  let eq = equals
  if (eq) {
   invariant(typeof equals === 'function', 'equals must be function')
  } else {
   eq = null
  }

  return setEquals(this._clone(), eq)
 }

 _clone() {
  return setEquals(atom(this._value), this._equals)
 }

 set(value: T) {
  maybeTrack(this)

  const oldValue = this._value
  this._value = value

  if (!inTransaction()) {
   if (!equals(this, value, oldValue)) {
    try {
     this._state = CHANGED
     const reactors = []
     mark(this, reactors)
     processReactors(reactors)
    } finally {
     this._state = UNCHANGED
    }
   }
  }
 }

 get() {
  if (typeof global.__DERIVABLE_DEVTOOLS_HOOK__ === 'function') {
   global.__DERIVABLE_DEVTOOLS_HOOK__('captureAtom', this)
  }
  maybeCaptureParent(this)
  return this._value
 }
 update(f: Function, ...args: any[]) {
  return update(this, f, args)
 }
}

Object.defineProperty(Atom.prototype, '_type', {
 value: ATOM,
 configurable: true,
})

export function atom<T>(value: T, meta: *): Atom<T> {
 return new Atom(value, meta)
}

function mark<T>(node: Atom<T>, reactors: Array<*>) {
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
