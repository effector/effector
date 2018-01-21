//@flow

import Emitter from 'eventemitter2'

import {isAct, UniqGuard} from './fixtures'
import type {Act, ActTag} from './act'

export const emitter = new Emitter({
  delimiter   : '/',
  maxListeners: 20,
  wildcard    : true,
})
export function once<T>(
  prefix: string,
  event: string | number,
  handler: T => void
) {
  emitter.once([prefix, String(event)].join('/'), handler)
}
export function on<T>(id: number, handler: T => void) {
  const type = ['passed', id.toString(10)].join('/')
  emitter.on(type, handler)
  return () => { emitter.off(type, handler) }
}

export function emit<T>(id: number, value: T) {
  emitter.emit(['passed', id.toString(10)].join('/'), value)
}

const passedCache = new UniqGuard

//eslint-disable-next-line prefer-arrow-callback
emitter.on('passed/*', function<A, T/*:::ActTag*/>(e: Act<A, T>) {
  if (passedCache.check(e)) return
  switch (e.tag) {
    case 'async/done': return emitter.emit(
      `act/async/done/${e.payload.seq}`, e
    )
    case 'async/fail': return emitter.emit(
      `act/async/fail/${e.payload.seq}`, e
    )
  }
})

emitter.on('epic', (value: mixed) => {
  if (isAct(value)) {
    emitter.emit('dispatch', value)
  }
})

/**
 * # Message [creator] object
 * - **typeId** unique type id of message [creator]
 *
 * # Act[ion] object
 * - **typeId** unique type id of its message [creator]
 * - **id** unique id of Act[ion]
 *
 * # Emitter types
 *
 * - ### state
 *   Emits on new state
 *
 * - ### epic
 *   Emits on new incoming data from epic
 *
 * - ### dispatch
 *   Next trusted valid event to dispatch.
 *   Will be dispatched as it is
 *
 * - ### passed *typeId*
 *   Emits on every act of dispatching
 *
 * - ### act
 *   - ### async
 *     - ### done *seq*
 *     - ### fail *seq*
*/
declare var docs: *