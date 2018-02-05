//@flow
import type {Stream} from 'most'

import type {Store} from './store'
import {type Message, type EpicF, message} from '../carrier/message'
import {Carrier} from '../carrier/carrier'
import {type Effect, type CarrierEffect, effect} from '../carrier/effect'

export function eventFabric<P, State>(
  description: string,
  store: Store<State>
): Message<P, Carrier<P>, State> {
  const {scope, state$, update$, dispatch} = store
  const text = [...scope, description].join('/')
  const result = message(text, dispatch)
  const epic$: Stream<$Exact<{
    state: State,
    data: Carrier<P>
  }>> = update$
    .filter(
      ({data}) => data.typeId === result.typeId
    )
    .multicast()
  const payload$: Stream<$Exact<{
    state: State,
    data: P
  }>> = epic$
    .map(({data, state}) => ({data: data.payload, state}))
    .multicast()
  //$off
  result.epic$ = epic$
  result.epic = function<R>(epic: EpicF<P, State, R>): Stream<R> {
    const result = epic(payload$, state$)
    result.observe(resultObserver)
    return result

    function resultObserver(value) {
      if (value instanceof Carrier)
        return dispatch(value)
      if (
        typeof value === 'object'
        && value != null
        && typeof value.type === 'string'
      ) return dispatch(value)
    }
  }
  return result
}

export function effectFabric<Params, Done, Fail, State>(
  description: string,
  store: Store<State>
): Effect<Params, Done, Fail, State> {
  const {scope, state$, update$, dispatch} = store
  const text = [...scope, description].join('/')
  const result = effect(text, dispatch)
  const epic$: Stream<$Exact<{
    state: State,
    data: CarrierEffect<Params, Done, Fail>
  }>> = update$
    .filter(
      ({data}) => data.typeId === result.typeId
    )
    .map((e: any): $Exact<{data: CarrierEffect<Params, Done, Fail>, state: State}> => e)
    .multicast()
  const payload$: Stream<$Exact<{
    state: State,
    data: Params
  }>> = epic$
    .map(({data, state}) => ({data: data.payload, state}))
    .multicast()
  //$off
  result.epic$ = epic$
  result.epic = function<R>(epic: EpicF<Params, State, R>): Stream<R> {
    const result = epic(payload$, state$)
    result.observe(resultObserver)
    return result

    function resultObserver(value) {
      if (value instanceof Carrier)
        return dispatch(value)
      if (
        typeof value === 'object'
        && value != null
        && typeof value.type === 'string'
      ) return dispatch(value)
    }
  }
  return result
}

