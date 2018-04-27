//@flow

import invariant from 'invariant'
import {unique, equals, setEquals} from './util'
import {
 startCapturingParents,
 retrieveParentsFrame,
 stopCapturingParents,
 maybeCaptureParent,
} from './parents'
import {isDerivable, DERIVATION} from './types'
import {CHANGED, UNCHANGED, UNKNOWN, DISCONNECTED} from './states'
import {detach} from './detach'
import {reactorFabric} from './reactorFabric'

declare function some(x: mixed): boolean %checks(typeof x !== 'undefined' &&
 x !== null)
function some(x: mixed) {
 return typeof x !== 'undefined' && x !== null
}
function unpack(thing) {
 if (isDerivable(thing)) {
  return thing.get()
 } else {
  return thing
 }
}
export class Derivation<T> {
 _parents: * = null
 _value = unique
 _equals: * = null
 /*::
 _type = DERIVATION
 */
 _state = DISCONNECTED
 _deriver: *

 _meta: * /* */
 _activeChildren = []
 constructor(deriver: *, meta: * = null) {
  this._deriver = deriver
  this._meta = meta
 }
 _clone() {
  return setEquals(derive(this._deriver), this._equals)
 }

 _forceEval() {
  let newVal = null
  let newNumParents

  try {
   if (this._parents === null) {
    this._parents = []
   }
   startCapturingParents(this, this._parents)
   newVal = this._deriver()
   newNumParents = retrieveParentsFrame().offset
  } finally {
   stopCapturingParents()
  }

  if (!equals(this, newVal, this._value)) {
   this._state = CHANGED
  } else {
   this._state = UNCHANGED
  }

  for (let i = newNumParents, len = this._parents.length; i < len; i++) {
   const oldParent = this._parents[i]
   detach(oldParent, this)
   this._parents[i] = null
  }

  this._parents.length = newNumParents

  this._value = newVal
 }

 _update() {
  if (this._parents === null) {
   // this._state === DISCONNECTED
   this._forceEval()
   // this._state === CHANGED ?
  } else if (this._state === UNKNOWN) {
   const len = this._parents.length
   for (let i = 0; i < len; i++) {
    const parent = this._parents[i]

    if (parent._state === UNKNOWN) {
     parent._update()
    }

    if (parent._state === CHANGED) {
     this._forceEval()
     break
    }
   }
   if (this._state === UNKNOWN) {
    this._state = UNCHANGED
   }
  }
 }

 get() {
  maybeCaptureParent(this)
  if (this._activeChildren.length > 0) {
   this._update()
  } else {
   startCapturingParents(void 0, [])
   try {
    this._value = this._deriver()
   } finally {
    stopCapturingParents()
   }
  }
  return this._value
 }

 // DERIVABLE Prototype

 derive(f: *): * {
  invariant(typeof f === 'function', 'derive requires function')
  return derive(() => f(this.get()))
 }

 maybeDerive(f: *): * {
  invariant(typeof f === 'function', 'maybeDerive requires function')
  return derive(() => {
   const arg = this.get()
   return some(arg) ? f(arg) : null
  })
 }

 orDefault(def: ?T) {
  invariant(some(def), 'orDefault requires non-null value')
  return this.derive(value => (some(value) ? value : def))
 }

 react(f, opts) {
  reactorFabric(derive, this, f, opts)
 }

 maybeReact(f, opts) {
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
   maybeWhen = maybeWhen.derive((d: *) => d && when.get())
  }
  reactorFabric(derive, this, f, {...opts, when: maybeWhen})
 }

 is(other: any): * {
  return derive(() => equals(this, this.get(), unpack(other)))
 }

 withEquality(equals: *) {
  let selectedEquals = equals
  if (equals) {
   invariant(typeof equals === 'function', 'equals must be function')
  } else {
   selectedEquals = null
  }

  return setEquals(this._clone(), selectedEquals)
 }
}

Object.defineProperty(Derivation.prototype, '_type', {
 value: DERIVATION,
 configurable: true,
})

export function derive<T>(f: Function, meta: *): Derivation<T> {
 invariant(typeof f === 'function', 'derive requires function')
 return new Derivation(f, meta)
}
