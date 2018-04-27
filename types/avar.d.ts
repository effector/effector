

export type Eff = () => void
export type Cancel = Eff
export type Delegate<A> = (_: A) => void

export type Status = {
 empty: boolean,
 filled: boolean,
 killed: boolean,
}

export class AVar<T> {
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
 read(cb: Delegate<T>): Cancel;
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
 put(value: T, cb: Delegate<T>, error?: Delegate<Error>): Cancel;
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
 take(cb: Delegate<T>): Cancel;
 /**
  * Attempts to synchronously read an AVar
  *
  * @returns {(T | null)}
  * @memberof AVar
  */
 tryRead(): T | null;

 /**
  * Attempts to synchronously take an AVar value, leaving it empty
  *
  * @returns {(T | null)}
  * @memberof AVar
  */
 tryTake(): T | null;

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
 tryPut(value: T): boolean;

 status(): Status;
 /**
  * Kills the AVar with an exception.
  * All pending and future actions will resolve immediately with the provided exception
  *
  * @param {Error} error
  * @memberof AVar
  */
 kill(error: Error): void;
}

/**
 * Creates a fresh AVar with an initial value
 *
 * @export
 * @template T
 * @param {T} [value]
 * @returns {AVar<T>}
 */
export function createAVar<T>(value?: T): AVar<T>
