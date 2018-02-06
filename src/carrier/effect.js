//@flow

import {async as subject, type Subject} from 'most-subject'

import {either} from 'fp-ts'
import {Message, message} from './message'
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
    this.dispatch(this)
    return this.defer
      .done
      .then(({result}) => result)
  }
  fail(): Promise<Fail> {
    this.dispatch(this)
    return this.defer
      .fail
      .then(({error}) => error)
  }
  promise(): Promise<Done> {
    this.dispatch(this)
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
  CarrierEffect<Params, Done, Fail>,
  State
> {
  $call: (params: Params) => CarrierEffect<Params, Done, Fail>
  done: Message<DoneType<Params, Done>, Carrier<DoneType<Params, Done>>, State>
  fail: Message<FailType<Params, Fail>, Carrier<FailType<Params, Fail>>, State>
  thunk: (params: Params) => Promise<Done> = never
  use(thunk: (params: Params) => Promise<Done>): this {
    this.thunk = thunk
    return this
  }
}

function never(props: any): Promise<any> {
  console.warn(`


  Running an effect without implementation

`, props)
  return new Promise(() => {})
}

function runEffect<Params, Done, Fail, State>(
  payload: Params,
  dispatch: typeof identity,
  effect: Effect<Params, Done, Fail, State>
): CarrierEffect<Params, Done, Fail> {
  const init: CarrierEffect<Params, Done, Fail> = new CarrierEffect
  init.defer.done.then(dispatch)
  init.defer.fail.then(dispatch)
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

export function effect<Params, Done, Fail, State>(
  name: string
): Effect<Params, Done, Fail, State> {
  const msg = new Effect(
    name,
    (typeId, type, payload, dispatch) => runEffect(payload, dispatch, msg)
  )
  return msg
}
