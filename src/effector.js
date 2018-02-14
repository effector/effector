//@flow

import type {Store} from 'redux'
import {Stream, from} from 'most'
import {async as subject, type Subject} from 'most-subject'

import type {Domain, Effect, Event, RawAction} from './index.h'
import {nextPayloadID, nextEventID, toTag, counter, type Tag} from './id'

import {PING, PONG, type Config} from './config'

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

export function domain<State>(
  domainName: string,
  dispatch: <T>(value: T) => T,
  getState: () => State,
  state$: Stream<State>,
): Domain<State> {
  return DomainConstructor(
    domainName,
    dispatch,
    getState,
    state$,
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
    })
    if (pong) {
      const plain: Map<*, *> = pong.payload.plain
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
        [domainName, name].join('/'),
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

