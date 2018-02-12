//@flow

import type {Effect} from './effect'
import {CarrierEffect, carrierEffect} from './carrier-effect'
import type {DoneType, FailType} from '../index.h'

export function runEffect<Params, Done, Fail, State>(
  payload: Params,
  effect: Effect<Params, Done, Fail, State>
): CarrierEffect<Params, Done, Fail> {
  const init: CarrierEffect<Params, Done, Fail> = carrierEffect(
    payload, effect.getType(), effect.id, effect.dispatch
  )
  // init.defer.done.then(e => console.warn(e, effect.done.run(e).send()))
  // init.defer.fail.then(e => console.warn(e, effect.fail.run(e)))
  init.dispatched().then(
    ({payload, ...rest}) => effect.thunk(payload).then(
      (value: Done) => {
        const {done} = effect
        done.used += 1
        const result = done.run({
          params: payload,
          result: value,
        })
        console.log(payload)
        console.log(value)
        console.log(rest)
        result.dispatched().then(
          rs => init.defer.resolved(rs)
        )
        effect.dispatch(result)
      },
      (value: Fail) => {
        const {fail} = effect
        fail.used += 1
        const result = fail.run({
          params: payload,
          error: value,
        })
        console.log(payload)
        console.log(value)
        console.log(rest)
        result.dispatched().then(
          rs => init.defer.rejected(rs)
        )
        effect.dispatch(result)
      }
    )
  )
  return init
}

declare function identity<T>(x: T): T

