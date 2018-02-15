//@flow

import {type Stream, from} from 'most'
import {subject, type Subject} from './subject'

import type {Domain, Effect, Event, Store} from './index.h'
import {type Tag, toTag} from './id'

import {PING, PONG, type Config} from './config'

import {safeDispatch} from './port'
import {EventConstructor} from './event'
import {EffectConstructor} from './effect'

export function createDomain<State>(
  store: Store<State>,
  domainName: string = ''
): Domain<State> {
  const redux: any = store
  const config: Config = redux.dispatch({
    type: PING,
  }).payload
  const addPlainHandler = (name, fn) => {
    config.plain.set(name, fn)
  }
  const state$: Stream<State> = from(redux)
    .map(() => store.getState())
    .multicast()
  return DomainConstructor(
    domainName,
    redux.dispatch,
    store.getState,
    state$,
    new Map,
    addPlainHandler,
  )
}

export function rootDomain<State>(
  domainName: string = ''
): Domain<State> {

  const addPlainHandler = (name, fn) => {
    config.plain.set(name, fn)
  }
  let redux: any
  let reduxStore: Store<State>
  const config: Config = {
    plain: new Map()
  }
  function dispatch<T>(data: T): T {
    return redux.dispatch(data)
  }
  function getState(): State {
    return reduxStore.getState()
  }

  const state$: Subject<State> = subject()
  function register(store: Store<State>) {
    redux = reduxStore = store
    const pong = redux.dispatch({
      type: PING,
      payload: undefined,
    })
    if (pong) {
      const payload: any = pong.payload
      const plain: Map<*, *> = payload.plain
      const oldPlain = config.plain
      for (const [key, val] of oldPlain.entries()) {
        if (!plain.has(key)) {
          plain.set(key, val)
        }
      }
      config.plain = plain
    }
    //$off
    from(store)
      .map(() => getState())
      .observe(state => state$.next(state))
  }
  const domain: Domain<State> = DomainConstructor(
    domainName,
    dispatch,
    getState,
    state$,
    new Map,
    addPlainHandler
  )
  domain.register = register
  return domain
}



function DomainConstructor<State>(
  domainName: string,
  dispatch: <T>(value: T) => T,
  getState: () => State,
  state$: Stream<State>,
  events: Map<string | Tag, Event<any, State>> = new Map,
  addPlainHandler: <T>(name: string, fn: (data: T) => any) => void = () => {}
): Domain<State> {

  return {
    port<R>(events$: Stream<R>): Promise<void> {
      return events$.observe(data => { safeDispatch(data, dispatch) })
    },
    register(store) {
      console.warn(`Not implemented`)
    },
    effect<Params, Done, Fail>(
      name: string
    ): Effect<Params, Done, Fail, State> {
      return EffectConstructor(
        domainName,
        dispatch,
        getState,
        state$,
        events,
        name
      )
    },
    domain(name: string): Domain<State> {
      return DomainConstructor(
        toTag(domainName, name),
        dispatch,
        getState,
        state$,
        events,
        addPlainHandler,
      )
    },
    event<Payload>(
      name: string
    ): Event<Payload, State> {
      return EventConstructor(
        domainName,
        dispatch,
        getState,
        state$,
        events,
        name
      )
    },
    typeConstant<Payload>(
      name: string
    ): Event<Payload, State> {
      const action$: Subject<Payload> = subject()
      addPlainHandler(name, data => {
        action$.next(data)
      })
      const result = EventConstructor(
        '',
        dispatch,
        getState,
        state$,
        events,
        name,
        action$
      )
      return result
    },
  }
}

