//@flow

import {either} from 'fp-ts'

import {emitter} from './pubsub'
import {Act} from './act'
import {getAsyncActId} from './register'

import type {Done, Fail, Result, ResultAct} from './index.h'

const noopPromise = new Promise(() => {})

export class ActInit<
  A = mixed,
  D = void,
  E = mixed,
> extends Act<A, 'async/init'> {
  seq: number
  promiseCache: Promise<ResultAct<A, D, E>> = noopPromise
  constructor(
    typeId: number,
    type: string,
    payload: A,
    seq: number = getAsyncActId()
  ) {
    super(typeId, type, payload, 'async/init')
    this.seq = seq
  }
  promise(): Promise<Done<A, D>> {
    return this.either().then(
      e => e.fold(
        l => Promise.reject(l),
        r => Promise.resolve(r),
      )
    )
  }
  either(): Promise<Result<A, D, E>> {
    return this.promiseCache.then(e => e.bimap(
      act => act.payload,
      act => act.payload,
    ))
  }
  done(): Promise<Done<A, D>> {
    return new Promise(
      rs => this
        .either()
        .then(e => e.map(rs))
    )
  }
  fail(): Promise<Fail<A, E>> {
    return new Promise(
      rs => {
        this
          .either()
          .then(e => e.fold(rs, () => {}))
      }
    )
  }
}

export function resolver<A, D, E>(
  value: Act<Done<A, D>, 'async/done'> | Act<Fail<A, E>, 'async/fail'>,
  rs: (value: ResultAct<A, D, E>) => void
) {
  switch (value.tag) {
    case 'async/done': return rs(either.right(value))
    case 'async/fail': return rs(either.left(value))
  }
  /*::(value.tag: empty)*/
  // if (__DEV__) {
  //   console.warn('missing case', value)
  // }
}
