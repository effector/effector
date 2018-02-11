//@flow

// import {async as subject, type Subject} from 'most-subject'
import type {Stream} from 'most'
import type {Event} from './event'

import type {DoneType, FailType, EpicFun} from '../index.h'
import {BareEvent} from './bare-event'
import {type ID, createIDType} from '../id'
import {runEffect} from './run-effect'

import {CarrierEffect} from './carrier-effect'

const nextID = createIDType()

//either.Either<Done, Fail>
export class Effect<
  Params = void,
  Done = void,
  Fail = Error,
  State = any
> extends BareEvent<
  Params,
  CarrierEffect<Params, Done, Fail>
> {
  id: ID = nextID()
  thunk: (params: Params) => Promise<Done> = never
  dispatch: <T>(x: T) => T
  done: Event<DoneType<Params, Done>, State>
  fail: Event<FailType<Params, Fail>, State>
  epic: <R>(epic: EpicFun<Params, State, R>) => Stream<R>
  run(params: Params): CarrierEffect<Params, Done, Fail> {
    return runEffect(params, this)
  }
  use(thunk: (params: Params) => Promise<Done>): this {
    this.thunk = thunk
    return this
  }
}

function never(props: any): Promise<any> {
  console.warn(`


  Running an effect without implementation

`, props)
  // console.log('process.env.NODE_ENV', process.env.NODE_ENV)
  // if (process.env.NODE_ENV==='test')
  //   return Promise.reject('not implemented')
  return new Promise(() => {})
}
