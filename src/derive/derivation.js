//@flow

import invariant from 'invariant'
import {unique} from './util'
import {get} from './methods/recalculate'
import {DISCONNECTED, type Status} from './status'
import {reactorFabric} from './reactorFabric'
import {maybe} from './methods/maybe'
import type {Reactor} from './reactors'
import type {Lifecycle} from './index.h'
import {DERIVATION} from '../kind/case/derive'

export class Derivation<T> {
 /*::+*/ deriver: () => T
 parents /*: null | Array<*> */ = null
 value: T = ((unique: any): T)
 equality /*: null | (a: T, b: T) => boolean*/ = null

 status: Status = DISCONNECTED
 /*::;+*/ kind = DERIVATION
 activeChildren: Array<Reactor | Derivation<*>> = []
 constructor(deriver: () => T) {
  this.deriver = deriver
 }

 get(): T {
  return get(this)
 }

 // DERIVABLE Prototype

 map<E>(f: (value: T) => E): Derivation<E> {
  invariant(typeof f === 'function', 'derive requires function')
  return new Derivation(() => f(this.get()))
 }

 react(f: (value: T) => void, options?: Lifecycle<T>): () => void {
  return reactorFabric(Derivation, this, f, options)
 }

 thru<Args, R>(
  method: (atom: Derivation<T>, ...args: Args[]) => R,
  ...args: Args[]
 ): R {
  return method(this, ...args)
 }
}

export function derive<T>(f: () => T): Derivation<T> {
 invariant(typeof f === 'function', 'derive requires function')
 return new Derivation(f)
}

export function maybeDeriveShort<A, B>(
 readable: Derivation<A>,
 fn: A => B,
): Derivation<B> {
 return maybe(Derivation, readable, fn)
}
