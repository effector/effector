//@flow
import {type Stream, combine} from 'most'

import type {Store} from './store'
import {Event} from '../carrier/event'
import {Carrier, carrier} from '../carrier/carrier'
import {Effect} from '../carrier/effect'
import type {CarrierEffect} from '../carrier/carrier-effect'
import type {EventRunner, EpicFun} from '../index.h'

export function eventFabric<P, State>(
  description: string,
  store: Store<State>
): Event<P, State> {
  const {update$} = store
  const result: Event<P, State> = new Event(description)
  const listen: Stream<{
    type: string,
    payload: P,
    meta: {
      typeId: number,
      id: number,
      isNew: boolean,
    },
  }> = store.channels.plain
    .filter(({meta: {typeId} }) => result.id === typeId)
    .multicast()
  const eventState$: Stream<P> = listen
    .map(e => e.payload)
    .multicast()
  result.listen = () => listen
  listen.observe(e => console.log(e))
  result.getType = () => [store.scope(), description].join('/')
  result.dispatch = (data) => {
    // console.log(data)
    // store.dispatch(data)
    if (data instanceof Carrier) {
      data.dispose.disposed(data.payload)
      store.dispatch(data)
      return data
    } else if (
      typeof data.meta === 'object'
      && data.meta != null
      && typeof data.meta.isNew === 'boolean'
    ) {
      if (data.meta.isNew) {
      //   return data
      // else {
        data.meta.isNew = false
        store.channels.plain.next(data)
      }
    } //else store.dispatch(data)
    store.dispatch(data)

    return data
  }
  // if (!result.dispatch) {
  //   throw new Error('no dis')
  // }
  // result.emit = function(payload) {
  //   store.dispatch$.next(this.run(payload))
  // }
  // let i = 0
  // const epic$: Stream<$Exact<{
  //   state: State,
  //   data: Carrier<P>
  // }>> = update$
  //   .multicast()
  //   .filter(
  //     (upd) => {
  //       i += 1
  //       if (i > 100) throw new Error('infinite loop guard')
  //       const {data} = upd
  //       // console.log(data.typeId === result.id, data.typeId)
  //       // console.log('upd', upd)
  //       if (data.isScheduled) return false
  //       data.isScheduled = true
  //       // console.log('result', result)
  //       return data.typeId === result.id
  //     }
  //   )
  //   .skipRepeats()
  //   .multicast()
  // const payload$: Stream<$Exact<{
  //   state: State,
  //   data: P
  // }>> = epic$
  //   .map(({data, state}) => ({data: data.payload, state}))
  //   .skipRepeats()
  //   // .tap(console.log.bind(console))
  //   .multicast()

  // store.mergeEvents(result)
  result.epic = function<R>(epic: EpicFun<P, State, R>): Stream<R> {
    const epicFn$ = epic(
      eventState$,
      store.channels.state
    ).multicast()
    epicFn$.observe(async(valueRaw) => {
      // console.log(value)
      let value
      try {
        value = await valueRaw
      } catch (error) {
        console.warn('error', error)
        return
      }
      if (value instanceof Carrier) {
        value.isScheduled = true
        store.channels.carrier.next(value)
        console.count(result.getType())
        return
        // const uniq = store.uniq.isUniq(value)
        // // console.log('yep', uniq)
        // if (uniq) {
        //   value.send()
        //   // store.dispatch(value)
        // } else {
        //   // console.log('not uniq', value)
        // }
        // return
        // return store.dispatch(result.run(value))
      }
      // console.log('plain', value)
      if (value != null && typeof value.then === 'function') {
        throw new Error(`observed promise ${description}`)
      }
      // return
      if (
        typeof value === 'object'
        && value != null
        && typeof value.type === 'string'
      ) {
        if (
          typeof value.meta === 'object'
          && value.meta != null
          && typeof value.meta.isNew === 'boolean'
        ) {
          if (!value.meta.isNew)
            return
          value.meta.isNew = false
        }
        console.log(value)
        store.channels.plain.next(value)
      }
      // console.warn(value)
      else store.channels.poor.next(value)
    })
    return epicFn$
  }
  const molten = result.melt()
  return molten
}

export function effectFabric<Params, Done, Fail, State>(
  description: string,
  store: Store<State>
): Effect<Params, Done, Fail, State> {
  const {update$} = store
  const result: Effect<Params, Done, Fail, State> = new Effect
  result.getType = () => [store.scope(), description].join('/')
  result.dispatch = store.dispatch
  result.done = eventFabric(`${description} done`, store)
  result.fail = eventFabric(`${description} fail`, store)
  const epic$: Stream<$Exact<{
    state: State,
    data: CarrierEffect<Params, Done, Fail>
  }>> = update$
    .filter(
      ({data}) => data.typeId === result.id
    )
    .map((e: any): $Exact<{data: CarrierEffect<Params, Done, Fail>, state: State}> => e)
    .multicast()
  const payload$: Stream<$Exact<{
    state: State,
    data: Params
  }>> = epic$
    .map(({data, state}) => ({data: data.payload, state}))
    .multicast()

  // store.mergeEvents(result)
  result.epic = function<R>(epic: EpicFun<Params, State, R>): Stream<R> {
    const epic$ = epic(payload$, store.state$)
    epic$.observe((value) => {
      if (value instanceof Carrier) {
        const uniq = store.uniq.isUniq(value)
        // console.log('yep', uniq, value)
        if (uniq) {
          value.send()
          // store.dispatch(value)
        }
        return
        // return store.dispatch(result.run(value))
      }
      console.log('plain', value)
      // return
      if (value != null && typeof value.then === 'function') {
        throw new Error(`observed promise ${description}`)
      }
      if (
        typeof value === 'object'
        && value != null
        && typeof value.type === 'string'
      ) return store.dispatch(value)
    })
    return epic$
  }
  const molten = result.melt()
  return molten
}

