//@flow
import type {Stream} from 'most'

import type {Store} from './store'
import {type Message, type EpicF, message} from '../carrier/message'
import {Carrier} from '../carrier/carrier'
import {type Effect, type CarrierEffect, effect} from '../carrier/effect'

function reassign<P, State>(
  msg: Message<P, Carrier<P>, State>
): Message<P, Carrier<P>, State> {
  function messageCarrier(payload: P): Carrier<P> {
    return msg.run(payload)
  }
  const actionBind: any = messageCarrier.bind(msg)
  Object.setPrototypeOf(actionBind, msg)
  Object.assign(actionBind, msg)
  return actionBind
}

function reassignEffect<Params, Done, Fail, State>(
  msg: Effect<Params, Done, Fail, State>
): Effect<Params, Done, Fail, State> {
  function messageCarrier(payload: Params) {
    return msg.run(payload)
  }
  const actionBind: any = messageCarrier.bind(msg)
  Object.setPrototypeOf(actionBind, msg)
  Object.assign(actionBind, msg)
  return actionBind
}

export function eventFabric<P, State>(
  description: string,
  store: Store<State>
): Message<P, Carrier<P>, State> {
  const {update$} = store
  const result: Message<P, Carrier<P>, State> = message(description)
  result.scope = (() => store.scope())
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

  result.epic$ = epic$
  result.getState = () => store.getState()
  store.mergeEvents(result)
  result.epic = function<R>(epic: EpicF<P, State, R>): Stream<R> {
    const epic$ = epic(payload$, result.getState())
    epic$.observe(resultObserver)
    return epic$

    function resultObserver(value) {
      if (value instanceof Carrier)
        return result.emit(value)
      if (
        typeof value === 'object'
        && value != null
        && typeof value.type === 'string'
      ) return result.emit(value)
    }
  }
  return reassign(result)
}

export function effectFabric<Params, Done, Fail, State>(
  description: string,
  store: Store<State>
): Effect<Params, Done, Fail, State> {
  const {update$} = store
  const result = effect(description)
  result.scope = (() => store.scope())
  result.done = eventFabric(`${description} done`, store)
  result.fail = eventFabric(`${description} fail`, store)
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

  result.epic$ = epic$
  result.getState = () => store.getState()
  store.mergeEvents(result)
  result.epic = function<R>(epic: EpicF<Params, State, R>): Stream<R> {
    const epic$ = epic(payload$, result.getState())
    epic$.observe(resultObserver)
    return epic$

    function resultObserver(value) {
      if (value instanceof Carrier)
        return result.emit(value)
      if (
        typeof value === 'object'
        && value != null
        && typeof value.type === 'string'
      ) return result.emit(value)
    }
  }
  return reassignEffect(result)
}

