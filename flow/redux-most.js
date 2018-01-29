//@flow

import { Stream } from 'most'
import /*::type*/ { Middleware, MiddlewareAPI, StoreEnhancer } from 'redux'

/*****************************************
  Type abbreviations:
  A = Action
  T = ActionType (a string or symbol)
  S = State
*****************************************/

// for the newer, declarative only API, which takes in a state stream
// to sample via the withState utility instead of exposing dispatch/getState
export type Epic<A, S> =
  (actionStream: Stream<A>, stateStream: Stream<S>) => Stream<A>

export type EpicMiddleware<A, S> = {
  replaceEpic(nextEpic: Epic<A, S>): void,
} & Middleware<S>

declare export function createEpicMiddleware<A, S>(
  rootEpic: Epic<A, S>,
): EpicMiddleware<A, S>

declare export function createStateStreamEnhancer<A, S>(
  epicMiddleware: EpicMiddleware<A, S>,
): StoreEnhancer<S, any>

declare export function combineEpics<A, S>(
  epicsArray: $ReadOnlyArray<Epic<A, S>>,
): Epic<A, S>

export type ActionType = string | Symbol

// overloads exist due to select being a curried function
declare export function select<A, T>(
  actionType: T,
  stream: Stream<A>,
): Stream<A>

declare export function select<A, T>(
  actionType: T,
  no: void,
): (stream: Stream<A>) => Stream<A>

// overloads exist due to selectArray being a curried function
declare export function selectArray<A, T>(
  actionTypes: $ReadOnlyArray<T>,
  stream: Stream<A>,
): Stream<A>

declare export function selectArray<A, T>(
  actionTypes: $ReadOnlyArray<T>,
  no: void,
): (stream: Stream<A>) => Stream<A>

// overloads exist due to withState being a curried function
declare export function withState<A, S>(
  stateStream: $Subtype<Stream<S>>,
  actionStream: $Subtype<Stream<A>>,
): Stream<[S, A]>

declare export function withState<A, S>(
  stateStream: $Subtype<Stream<S>>,
): ((actionStream: $Subtype<Stream<A>>) => Stream<[S, A]>)

export const EPIC_END: '@@redux-most/EPIC_END' & string
  = '@@redux-most/EPIC_END'