//@flow

import {type Stream, from} from 'most'

import invariant from 'invariant'

import {subject, type Subject} from './subject'
import warning from '@effector/warning'

import type {
 Domain,
 Effect,
 Event,
 Store,
 DomainConfig,
 UserlandConfig,
 RawAction,
} from './index.h'
import typeof {Dispatch} from './index.h'
import {type Tag, toTag} from './id'

import {PING, createHaltAction, type Config} from './config'

import {safeDispatch} from './port'
import {EventConstructor} from './event'
import {EffectConstructor} from './effect'

export function createDomain<State>(
 store: Store<State>,
 domainName: string = '',
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
  new Map(),
  addPlainHandler,
 )
}

export function createRootDomain<State>(
 domainName: string = '',
): Domain<State> {
 const addPlainHandler = (name, fn) => {
  config.plain.set(name, fn)
 }
 let redux: any
 let reduxStore: Store<State>
 const config: Config = {
  plain: new Map(),
 }
 const dispatch: Dispatch = function dispatch(data) {
  return redux.dispatch(data)
 }
 function getState(): State {
  return reduxStore.getState()
 }

 const state$: Subject<State> = subject()
 let unsubscribe
 function disablePrevious(previousDispatch) {
  previousDispatch(createHaltAction())
  if (typeof unsubscribe === 'function') {
   unsubscribe()
  }
 }
 function register(store: Store<State>) {
  const previousDispatch = redux != null ? redux.dispatch : v => v
  redux = reduxStore = store
  const pong = redux.dispatch({
   type: PING,
   payload: undefined,
  })
  if (pong) {
   const payload: any = pong.payload
   const plain: Map<*, *> = payload.plain
   const oldPlain = config.plain
   oldPlain.clear()
   // for (const [key, val] of oldPlain.entries()) {
   //   // if (!plain.has(key)) {
   //   plain.set(key, val)
   //   // }
   // }
   config.plain = plain
  }
  disablePrevious(previousDispatch)

  //$off
  const unsub = from(store)
   .map(() => getState())
   .subscribe({
    next(value) {
     state$.next(value)
    },
    error(err) {},
    complete() {},
   })
  unsubscribe = () => unsub.unsubscribe()
 }
 const domain: Domain<State> = DomainConstructor(
  domainName,
  dispatch,
  getState,
  state$,
  new Map(),
  addPlainHandler,
 )
 domain.register = register
 return domain
}

function optsReducer([key, value]) {
 if (!(key in this)) return
 const newVal = () => value
 ;(newVal: $ElementType<DomainConfig, typeof key>)
 this[key] = newVal
}

function mergeEffectOpts(
 defaults: DomainConfig,
 opts?: $Shape<UserlandConfig>,
) {
 if (opts === undefined) return {...defaults}
 invariant(
  typeof opts === 'object' && opts != null,
  'effect options should be object, got %s',
  typeof opts,
 )
 const resultObj: DomainConfig = {...defaults}
 Object.keys(opts)
  .map(key => [key, opts[key]])
  .forEach(optsReducer, resultObj)
 return resultObj
}

function DomainConstructor<State>(
 domainName: string,
 dispatch: Dispatch,
 getState: () => State,
 state$: Stream<State>,
 events: Map<string | Tag, Event<any, State>> = new Map(),
 addPlainHandler: <T>(name: string, fn: (data: T) => any) => void = () => {},
 configGetter?: () => DomainConfig,
): Domain<State> {
 let getConfig: () => DomainConfig
 if (typeof configGetter !== 'function') {
  const config = {
   unused: () => 'warn',
   watchFailCheck: () => 'warn',
   dispatch,
  }
  getConfig = () => config
 } else getConfig = configGetter
 const disp = getDispatch(getConfig)
 const effectOpts: DomainConfig = {
  unused() {
   return getConfig().unused()
  },
  watchFailCheck() {
   return getConfig().watchFailCheck()
  },
  dispatch: disp,
 }
 function recoverable<R>(events$: Stream<R>): Stream<R> {
  const str$ = events$.multicast()
  const failureHandler = e => {
   portFailWarn({domainName}, e)
   return str$
  }
  return str$.recoverWith(failureHandler)
 }
 return {
  port<R>(events$: Stream<R>): Promise<void> {
   return recoverable(events$).observe(data => {
    safeDispatch(data, dispatch)
   })
  },
  register(store) {
   warning(`Not implemented`)
  },
  effect<Params, Done, Fail>(
   name: string,
   opts?: $Shape<UserlandConfig>,
  ): Effect<Params, Done, Fail, State> {
   const optsFull = mergeEffectOpts(effectOpts, opts)
   return EffectConstructor(
    domainName,
    dispatch,
    getState,
    state$,
    events,
    name,
    optsFull,
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
    getConfig,
   )
  },
  event<Payload>(name: string): Event<Payload, State> {
   return EventConstructor(domainName, dispatch, getState, state$, events, name)
  },
  typeConstant<Payload>(name: string): Event<Payload, State> {
   const action$: Subject<Payload> = subject()

   addPlainHandler(name, data => {
    if (data.meta == null) data.meta = {}
    data.meta.plain = true
    const resultEvent = result(data.payload)
    resultEvent.meta.passed = true
    resultEvent.meta.plain = true
    action$.next(data.payload)
    getConfig().dispatch(resultEvent)
   })
   const result = EventConstructor(
    '',
    dispatch,
    getState,
    state$,
    events,
    name,
    action$,
    {
     isPlain: true,
     watchFailCheck: effectOpts.watchFailCheck(),
    },
   )
   return result
  },
 }
}

function getDispatch(getConfig): Dispatch {
 const dispatch: any = value => {
  const result = getConfig().dispatch(value)
  return result
 }
 return dispatch
}

function portFailWarn({domainName}, error) {
 warning(`


  Port stream should not fail.
  Next failure will throw.

  Domain:
    ${domainName}
  Error:
    ${error}

`)
}
