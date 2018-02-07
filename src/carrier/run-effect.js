//@flow

import type {Effect} from './effect'
import {CarrierEffect} from './carrier-effect'

export function runEffect<Params, Done, Fail, State>(
  payload: Params,
  dispatch: typeof identity,
  effect: Effect<Params, Done, Fail, State>
): CarrierEffect<Params, Done, Fail> {
  const init: CarrierEffect<Params, Done, Fail> = new CarrierEffect
  init.defer.done.then(dispatch)
  init.defer.fail.then(dispatch)
  init.payload = payload
  init.type = effect.getType()
  init.typeId = effect.typeId
  init.dispatch = dispatch
  init.dispatched().then(
    payload => effect.thunk(payload).then(
      (value: Done) => {
        const {done} = effect
        done.used += 1
        const result = done.actionConstructor(
          done.typeId,
          done.getType(),
          {params: payload, result: value},
          dispatch
        )
        dispatch(result)
        result.dispatched().then(
          rs => init.defer.resolved(rs)
        )
      },
      (value: Fail) => {
        const {fail} = effect
        fail.used += 1
        const result = fail.actionConstructor(
          fail.typeId,
          fail.getType(),
          {params: payload, error: value},
          dispatch
        )
        dispatch(result)
        result.dispatched().then(
          rs => init.defer.rejected(rs)
        )
      }
    )
  )
  return init
}

declare function identity<T>(x: T): T

