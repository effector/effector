//@flow

import invariant from 'invariant'
import {unique} from './util'
import {get} from './methods/recalculate'
import {DISCONNECTED} from './states'
import {reactorFabric} from './reactorFabric'
import {maybeDerive} from './methods/maybeDerive'
import type {Reactor} from './reactors'
import type {Lifecycle} from './index.h'

export class Derivation<T> {
 /*::+*/ _deriver: () => T
 _parents /*: null | Array<*> */ = null
 _value: T = ((unique: any): T)
 _equals /*: null | (a: T, b: T) => boolean*/ = null
 /*::
 _type = 'DERIVATION'
 */
 _state = DISCONNECTED

 _activeChildren: Array<Reactor | Derivation<*>> = []
 constructor(deriver: () => T) {
  this._deriver = deriver
 }

 get(): T {
  return get(this)
 }

 // DERIVABLE Prototype

 map<E>(f: (value: T) => E): Derivation<E> {
  invariant(typeof f === 'function', 'derive requires function')
  return new Derivation(() => f(this.get()))
 }

 react(f: (value: T) => void, options?: Lifecycle<T>): void {
  reactorFabric(Derivation, this, f, options)
 }

 thru<Args, R>(
  method: (atom: Derivation<T>, ...args: Args[]) => R,
  ...args: Args[]
 ): R {
  return method(this, ...args)
 }
}

Object.defineProperty(Derivation.prototype, '_type', {
 value: ('DERIVATION': 'DERIVATION'),
 configurable: true,
})

export function derive<T>(f: () => T): Derivation<T> {
 invariant(typeof f === 'function', 'derive requires function')
 return new Derivation(f)
}

export function maybeDeriveShort<A, B>(
 readable: Derivation<A>,
 fn: A => B,
): Derivation<B> {
 return maybeDerive(Derivation, readable, fn)
}
