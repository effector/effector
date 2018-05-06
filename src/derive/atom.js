//@flow
// import invariant from 'invariant'

import {nextId} from './util'
import {maybeCaptureParent} from './parents'
import {UNCHANGED, CHANGED, type Status} from './status'
import {reactorFabric} from './reactorFabric'
import {update} from './update'
import {deriveFrom} from './methods/deriveFrom'
import type {Reactor} from './reactors'
import {ATOM} from '../kind/case/derive'
import {setAtom} from './methods/set'

import {Derivation} from './derivation'

import type {Lifecycle} from './index.h'

export class Atom<T> {
 /*::+*/ id: number = nextId()
 /*::;+*/ kind = ATOM
 _state: Status = UNCHANGED
 _equals /*: null | (a: T, b: T) => boolean*/ = null

 _value: T
 _activeChildren: Array<Reactor | Derivation<*>> = []
 constructor(value: T) {
  this._value = value
 }

 map<S>(f: (_: T) => S) {
  return deriveFrom(this, f)
 }

 react(f: Function, opts?: Lifecycle<T>) {
  reactorFabric(Derivation, this, f, opts)
 }

 set(value: T) {
  setAtom(this, value)
 }

 get(): T {
  maybeCaptureParent(this)
  return this._value
 }
 update(f: Function, ...args: any[]) {
  return update(this, f, args)
 }

 thru<Args, R>(
  method: (atom: Atom<T>, ...args: Args[]) => R,
  ...args: Args[]
 ): R {
  return method(this, ...args)
 }
}

export function atom<T>(value: T): Atom<T> {
 return new Atom(value)
}
