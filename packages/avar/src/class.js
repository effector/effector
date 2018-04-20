//@flow

import invariant from 'invariant'

import type {Delegate, Cancel} from './index.h'

import {DelegateQueue, PutQueue} from './queue'

import {
 _killVar,
 _putVar,
 _takeVar,
 _readVar,
 _tryPutVar,
 _tryTakeVar,
 _tryReadVar,
 asyncReadVar,
 asyncTakeVar,
 asyncPutVar,
} from './methods'

export class AVar<T> {
 draining: boolean = false
 error: ?Error = null
 /*::;+*/ takes: DelegateQueue<T> = new DelegateQueue()
 /*::;+*/ reads: DelegateQueue<T> = new DelegateQueue()
 /*::;+*/ puts: PutQueue<T> = new PutQueue()
 value: T | null
 constructor(value: ?T) {
  this.value = value === undefined ? null : value
 }
 /**
  * Reads the AVar value. Unlike takeVar, this will not leave the AVar empty.
  *
  * If the AVar is empty, this will queue until it is filled.
  * Multiple reads will resolve at the same time, as soon as possible.
  *
  * @param {Delegate<T>} cb
  * @returns {Cancel}
  * @memberof AVar
  */
 read(cb: Delegate<T>): Cancel {
  return _readVar(this, cb)
 }
 asyncRead(): Promise<T> {
  return asyncReadVar(this)
 }
 /**
  * Sets the value of the AVar.
  *
  * If the AVar is already filled, it will be queued until the value is emptied.
  * Multiple puts will resolve in order as the AVar becomes available.
  *
  * Returns an effect which will remove the callback from the pending queue
  *
  * @param {T} value
  * @param {Delegate<T>} cb
  * @param {Delegate<Error>} [error]
  * @returns {Cancel}
  * @memberof AVar
  */
 put(value: T, cb: Delegate<T>, error?: Delegate<Error>): Cancel {
  return _putVar(value, this, cb, error)
 }
 asyncReplace(value: T): Promise<void> {
  if (this.status().filled) {
   this.tryTake()
  }
  this.tryPut(value)
  return Promise.resolve()
 }
 asyncPut(value: T): Promise<T> {
  return asyncPutVar(value, this)
 }
 /**
  * Takes the AVar value, leaving it empty.
  * If the AVar is already empty, the callback will be queued until the AVar is filled.
  * Multiple takes will resolve in order as the AVar fills.
  *
  * Returns an effect which will remove the callback from the pending queue.
  *
  * @param {Delegate<T>} cb
  * @returns {Cancel}
  * @memberof AVar
  */
 take(cb: Delegate<T>): Cancel {
  return _takeVar(this, cb)
 }
 asyncTake(): Promise<T> {
  return asyncTakeVar(this)
 }
 /**
  * Attempts to synchronously read an AVar
  *
  * @returns {(T | null)}
  * @memberof AVar
  */
 tryRead(): T | null {
  return _tryReadVar(this)
 }

 /**
  * Attempts to synchronously take an AVar value, leaving it empty
  *
  * @returns {(T | null)}
  * @memberof AVar
  */
 tryTake(): T | null {
  return _tryTakeVar(this)
 }

 /**
  * Attempts to synchronously fill an AVar.
  * If the AVar is already filled, this will do nothing.
  *
  * Returns true or false depending on if it succeeded
  *
  * @param {T} value
  * @returns {boolean}
  * @memberof AVar
  */
 tryPut(value: T): boolean {
  invariant(value !== undefined && value !== null, 'no value')
  return _tryPutVar(value, this)
 }

 status(): {
  /*::+*/ empty: boolean,
  /*::+*/ filled: boolean,
  /*::+*/ killed: boolean,
  } {
  const isEmpty = this.value === undefined || this.value === null
  const killed = this.error != null
  return {
   empty: isEmpty,
   filled: !isEmpty,
   killed,
  }
 }
 /**
  * Kills the AVar with an exception.
  * All pending and future actions will resolve immediately with the provided exception
  *
  * @param {Error} error
  * @memberof AVar
  */
 kill(error: Error) {
  _killVar(error, this)
 }

 tag(): 'AVar' {
  return 'AVar'
 }
}

/**
 * Creates a fresh AVar with an initial value
 *
 * @export
 * @template T
 * @param {T} [value]
 * @returns {AVar<T>}
 */
export function makeVar<T>(value?: T): AVar<T> {
 return new AVar(value)
}
