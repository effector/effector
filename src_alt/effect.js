//@flow

import {assignInstance} from './fixtures'
import {emitter} from './pubsub'
import {Act} from './act'
import {Message} from './message'
import {ActInit} from './act-init'

import type {Done, Fail} from './index.h'

function initAct<A, D, E>(
  typeId: number,
  type: string,
  payload: A,
): ActInit<A, D, E> {
  return new ActInit(
    typeId,
    type,
    payload
  )
}

function doneAct<A, D>(
  typeId: number, type: string, payload: Done<A, D>
): Act<Done<A, D>, 'async/done'> {
  return new Act(
    typeId,
    type,
    payload,
    'async/done'
  )
}


function failAct<A, E>(
  typeId: number, type: string, payload: Fail<A, E>
): Act<Fail<A, E>, 'async/fail'> {
  return new Act(
    typeId,
    type,
    payload,
    'async/fail'
  )
}

function initDestruct<A, D, E>(
  act: ActInit<A, D, E>
): A {
  return act.payload
}

function doneDestruct<A, D>(
  act: Act<Done<A, D>, 'async/done'>
): Done<A, D> {
  return act.payload
}

function failDestruct<A, E>(
  act: Act<Fail<A, E>, 'async/fail'>
): Fail<A, E> {
  return act.payload
}

export class Effect<
  A = mixed,
  D = void,
  E = mixed,
> extends Message<A, 'async/init', ActInit<A, D, E>> {
  done: Message<Done<A, D>, 'async/done'>
  fail: Message<Fail<A, E>, 'async/fail'>
  constructor(description: string): Effect<A, D, E> {
    super(description, initAct, initDestruct)
    const typeId = this.typeId
    const type = this.actionType
    const done = new Message(
      `${description} done`,
      doneAct,
      doneDestruct
    )
    const fail = new Message(
      `${description} fail`,
      failAct,
      failDestruct
    )
    this.done = done
    this.fail = fail
    function message(payload: A): Act<A, 'async/init'> {
      return initAct(typeId, type, payload)
    }
    return assignInstance(message, this)
  }
  serve(asyncFunction: A => Promise<D>) {
    const {typeId, done, fail} = this
    emitter.on(`passed/${typeId}`, (value: ActInit<A, D, E>) => {
      const {payload, seq} = value
      asyncFunction(payload)
        .then((result: D) => done({
          params: payload,
          result,
          seq,
        }))
        .catch((error: E) => fail({
          params: payload,
          error,
          seq,
        }))
        .then(e => {
          e.storeId = value.storeId
          return e
        })
        .then((value: *) => emitter.emit(
          'dispatch', value,
        ))
    })
  }
}
