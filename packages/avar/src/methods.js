//@flow

import type {Delegate, Cancel} from './index.h'

import type {AVar} from './class'

import {deleteCell, drainVar, writeAVar, putLast, drainErase} from './internal'

/**
 * Kills the AVar with an exception.
 * All pending and future actions will resolve immediately with the provided exception
 *
 * @export
 * @template A
 * @param {Error} error
 * @param {AVar<A>} avar
 */
export function _killVar<A>(error: Error, avar: AVar<A>): void {
 if (avar.error == null) {
  avar.error = error
  drainErase(avar)
 }
}

/**
 * Sets the value of the AVar.
 *
 * If the AVar is already filled, it will be queued until the value is emptied.
 * Multiple puts will resolve in order as the AVar becomes available.
 *
 * Returns an effect which will remove the callback from the pending queue
 *
 * @export
 * @template A
 * @param {A} value
 * @param {AVar<A>} avar
 * @param {Delegate<A>} cb
 * @returns {Cancel}
 */
export function _putVar<A>(
 value: A,
 avar: AVar<A>,
 cb: Delegate<A>,
 error?: Delegate<Error>,
): Cancel {
 const cell = putLast(avar.puts, {next: cb, value, error})
 drainVar(avar)
 return () => {
  deleteCell(cell)
 }
}

/**
 * Attempts to synchronously fill an AVar.
 * If the AVar is already filled, this will do nothing.
 *
 * Returns true or false depending on if it succeeded
 *
 * @export
 * @template A
 * @param {A} value
 * @param {AVar<A>} avar
 * @returns {boolean}
 */
export function _tryPutVar<A>(value: A, avar: AVar<A>): boolean {
 if ((null === avar.value || undefined === avar.value) && avar.error == null) {
  drainVar(writeAVar(avar, value))
  return true
 }
 return false
}

/**
 * Takes the AVar value, leaving it empty.
 * If the AVar is already empty, the callback will be queued until the AVar is filled.
 * Multiple takes will resolve in order as the AVar fills.
 *
 * Returns an effect which will remove the callback from the pending queue.
 *
 * @export
 * @template A
 * @param {AVar<A>} avar
 * @param {Delegate<A>} cb
 * @returns {Cancel}
 */
export function _takeVar<A>(avar: AVar<A>, cb: Delegate<A>): Cancel {
 const cell = putLast(avar.takes, cb)
 drainVar(avar)
 return () => {
  deleteCell(cell)
 }
}

/**
 * Attempts to synchronously take an AVar value, leaving it empty
 *
 * @export
 * @template A
 * @param {AVar<A>} avar
 * @returns {A | null}
 */
export function _tryTakeVar<A>(avar: AVar<A>): A | null {
 const value = avar.value
 if (null === value || undefined === value) {
  return null
 }
 drainErase(avar)
 return value
}

/**
 * Reads the AVar value. Unlike takeVar, this will not leave the AVar empty.
 *
 * If the AVar is empty, this will queue until it is filled.
 * Multiple reads will resolve at the same time, as soon as possible.
 *
 * @export
 * @template A
 * @param {AVar<A>} avar
 * @param {Delegate<A>} cb
 * @returns {Cancel}
 */
export function _readVar<A>(avar: AVar<A>, cb: Delegate<A>): Cancel {
 const cell = putLast(avar.reads, cb)
 drainVar(avar)
 return () => {
  deleteCell(cell)
 }
}

/**
 * Attempts to synchronously read an AVar
 *
 * @export
 * @template A
 * @param {AVar<A>} avar
 * @returns {A | null}
 */
export function _tryReadVar<A>(avar: AVar<A>): A | null {
 if (null == avar.value) {
  return null
 }
 return avar.value
}
