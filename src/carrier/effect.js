//@flow

import {async as subject, type Subject} from 'most-subject'

import {either} from 'fp-ts'
import {Message} from './message'
import {Carrier, carrier} from './carrier'
import {Defer} from '../defer'

import {type ID, createIDType} from '../id'
const nextSEQ = createIDType()

export type DoneType<Params = void, Done = void> = $Exact<{
  params: Params,
  result: Done,
}>

export type FailType<Params = void, Fail = Error> = $Exact<{
  params: Params,
  error: Fail,
}>

export class CarrierEffect<
  Params = void,
  Done = void,
  Fail = Error
> extends Carrier<Params> {
  seq: ID = nextSEQ()
  defer: Defer<DoneType<Params, Done>, FailType<Params, Fail>> = new Defer
  done(): Promise<Done> {
    return this.defer
      .done
      .then(({result}) => result)
  }
  fail(): Promise<Fail> {
    return this.defer
      .fail
      .then(({error}) => error)
  }
  promise(): Promise<Done> {
    return Promise.race([
      this.done(),
      this.fail().then(err => Promise.reject(err))
    ])
  }
}
//either.Either<Done, Fail>
export class Effect<
  Params = void,
  Done = void,
  Fail = Error,
  State = any
> extends Message<
  Params,
  Params,
  State
> {
  // $call: (params: Params) => CarrierEffect<Params, Done, Fail>
  done: Message<DoneType<Params, Done>, Carrier<DoneType<Params, Done>>, State>
  fail: Message<FailType<Params, Fail>, Carrier<FailType<Params, Fail>>, State>
  thunk: (params: Params) => Promise<Done> = never
  use(thunk: (params: Params) => Promise<Done>): this {
    this.thunk = thunk
    return this
  }
}

async function never(props: any): Promise<any> {
  console.warn(`


  Running an effect without implementation

`, props)
}

function runEffect<Params, Done, Fail, State>(
  payload: Params,
  dispatch: typeof identity,
  effect: Effect<Params, Done, Fail, State>
): CarrierEffect<Params, Done, Fail> {
  const init: CarrierEffect<Params, Done, Fail> = new CarrierEffect
  init.payload = payload
  init.type = effect.actionType
  init.typeId = effect.typeId
  init.dispatch = dispatch
  init.dispatched().then(
    payload => effect.thunk(payload).then(
      (value: Done) => {
        const {done} = effect
        done.used += 1
        const result = done.actionConstructor(
          done.typeId,
          done.actionType,
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
          fail.actionType,
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

export function effect<Params, Done, Fail, State>(
  name: string,
  dispatch: typeof identity,
): Effect<Params, Done, Fail, State> {
  const msg = new Effect(
    name,
    (typeId, type, payload, dispatch) => runEffect(payload, dispatch, msg)
  )
  function messageCarrier(payload: Params) {
    msg.used += 1
    return msg.actionConstructor(
      msg.typeId,
      msg.actionType,
      payload,
      dispatch
    )
  }
  const actionBind: any = messageCarrier.bind(msg)
  Object.setPrototypeOf(actionBind, msg)
  return actionBind
}

// export function effect<Params, Done, Fail, State>(
//   name: string,
//   dispatch: Function,
// ): Effect<Params, Done, Fail, State> {
//   // const
//   const msg = new Effect(
//     name,
//     (typeId, type, payload: Params) => {
//       ''
//       return runEffect(typeId, type, payload, dispatch, msg)
//       // init.payload = payload
//       // init.type = type
//       // init.typeId = typeId
//       // init.dispatch = dispatch
//       // return init
//     }
//   )
//   function message(payload: Params): Carrier<Params> {
//     msg.used += 1
//     return msg.actionConstructor(
//       msg.typeId,
//       msg.actionType,
//       payload,
//       dispatch,
//     )
//   }
//   const actionBind: any = message.bind(msg)
//   Object.setPrototypeOf(actionBind, msg)
//   return actionBind
// }
