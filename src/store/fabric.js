//@flow
import type {Stream} from 'most'

import type {Store} from './store'
import {Event, type EpicF} from '../carrier/event'
import {Carrier, carrier} from '../carrier/carrier'
import {Effect} from '../carrier/effect'
import type {CarrierEffect} from '../carrier/carrier-effect'
import type {EventRunner} from '../index.h'

function reassign<P, State>(
  msg: Event<P, Carrier<P>, State>
): Event<P, Carrier<P>, State> {
  function messageCarrier(payload: P): Carrier<P> {
    return this.run(payload)
  }
  const actionBind: any = messageCarrier.bind(msg)
  Object.setPrototypeOf(actionBind, msg)
  Object.assign(actionBind, msg)
  return msg
}

function reassignEffect<Params, Done, Fail, State>(
  msg: Effect<Params, Done, Fail, State>
): Effect<Params, Done, Fail, State> {
  function effectCarrier(payload: Params) {
    return this.run(payload)
  }
  const actionBind: any = effectCarrier.bind(msg)
  Object.setPrototypeOf(actionBind, Effect.prototype)
  Object.assign(actionBind, msg)
  // actionBind.use = msg.use.bind(msg)
  return msg
}

export function eventFabric<P, State>(
  description: string,
  store: EventRunner<State>
): Event<P, Carrier<P>, State> {
  const {update$} = store
  const result: Event<P, Carrier<P>, State> = new Event(description, carrier)
  result.scope = (() => store.scope())
  const epic$: Stream<$Exact<{
    state: State,
    data: Carrier<P>
  }>> = update$
    .filter(
      ({data}) => data.typeId === result.typeId
    )
    .skipRepeats()
    .multicast()
  const payload$: Stream<$Exact<{
    state: State,
    data: P
  }>> = epic$
    .map(({data, state}) => ({data: data.payload, state}))
    .skipRepeats()
    .tap(console.log.bind(console))
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
  store: EventRunner<State>
): Effect<Params, Done, Fail, State> {
  const {update$} = store
  function effectInstance(payload: Params) {
    return effectInstance.run(payload)
  }
  Object.setPrototypeOf(effectInstance, Effect.prototype)
  Effect.call(effectInstance, description)
  const result: Effect<Params, Done, Fail, State> = effectInstance
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

