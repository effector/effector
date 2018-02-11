//@flow

import type {Stream} from 'most'
import type {Subject} from 'most-subject'

import type {Carrier} from './carrier/carrier'

export interface Named {
  scope(): Iterable<string>,
}

export interface Typed {
  getType(): string,
}

export interface WithStateLink<State> {
  getState(): Stream<State>,
}

export interface Dispatcher {
  // dispatch$: Subject<any>
  mergeEvents(events: Emitter): void,
}

export interface Emitter {
  event$: Subject<any>,
  emit(next: any): void,
}

export interface EventRunner<State> extends Named, Dispatcher {
  update$: Subject<$Exact<{
    state: State,
    data: Carrier<any>
  }>>,
  /*::+*/getState: () => Stream<State>
}

export type DoneType<Params = void, Done = void> = $Exact<{
  params: Params,
  result: Done,
}>

export type FailType<Params = void, Fail = Error> = $Exact<{
  params: Params,
  error: Fail,
}>

export type ReduxAction<T> = {
  type: string,
  payload: T,
}

export type ReducerRedux<State = void, T = any> = (
  state: State, action: ReduxAction<T>
) => State

export type ReducerAct<State = void, T = any, M = void> = (
  state: State, payload: T, meta: M
) => State

export type EpicFun<P, State, R> = (
  data$: Stream<P>,
  state$: Stream<State>
) => Stream<R>
