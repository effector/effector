//@flow

import invariant from 'invariant'
import {unique} from './util'
import {get} from './methods/recalculate'
import {isDerivable, DERIVATION} from './types'
import {CHANGED, UNCHANGED, UNKNOWN, DISCONNECTED} from './states'
import {reactorFabric} from './reactorFabric'
import {maybeDerive} from './methods/maybeDerive'
import {withEquality} from './methods/withEquality'
import type {Reactor} from './reactors'

declare function some(x: mixed): boolean %checks(typeof x !== 'undefined' &&
 x !== null)
function some(x: mixed) {
 return typeof x !== 'undefined' && x !== null
}

export class Derivation<T> {
 /*::+*/ _deriver: () => T
 _parents /*: null | Array<*> */ = null
 _value: T = ((unique: any): T)
 _equals /*: null | (a: mixed, b: mixed) => boolean*/ = null
 /*::
 _type = DERIVATION
 */
 _state = DISCONNECTED

 _activeChildren: Array<Reactor | Derivation<*>> = []
 constructor(deriver: () => T) {
  this._deriver = deriver
 }
 _clone(): Derivation<T> {
  const result: Derivation<T> = new Derivation(this._deriver)
  if (this._equals !== null) result._equals = this._equals
  return result
 }

 get(): T {
  return get(this)
 }

 // DERIVABLE Prototype

 derive(f: *): * {
  invariant(typeof f === 'function', 'derive requires function')
  return derive(() => f(this.get()))
 }

 maybeDerive<S>(f: (_: *) => S): Derivation<S | null> {
  return maybeDerive(Derivation, this, f)
 }

 orDefault(def: ?T) {
  invariant(some(def), 'orDefault requires non-null value')
  return this.derive(value => (some(value) ? value : def))
 }

 react(f: *, opts: *) {
  reactorFabric(derive, this, f, opts)
 }

 maybeReact(f: *, opts: *) {
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

 withEquality(equals: (a: mixed, b: mixed) => boolean): Derivation<T> {
  return withEquality(this, equals)
 }
}

Object.defineProperty(Derivation.prototype, '_type', {
 value: DERIVATION,
 configurable: true,
})

export function derive<T>(f: Function): Derivation<T> {
 invariant(typeof f === 'function', 'derive requires function')
 return new Derivation(f)
}
