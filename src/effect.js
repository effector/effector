//@flow

import type {Stream} from 'most'
import {async as subject, type Subject} from 'most-subject'

import type {Effect, Event, RawAction} from './index.h'
import {nextPayloadID, nextEventID, toTag, counter, type Tag} from './id'

import {EventConstructor} from './event'
import {safeDispatch, port} from './port'

import {basicCommon} from './event-common'

export function EffectConstructor<State, Params, Done, Fail>(
  domainName: string,
  dispatch: <T>(value: T) => T,
  getState: () => State,
  state$: Stream<State>,
  events: Map<string | Tag, Event<any, State>>,
  name: string,
  action$: Subject<Params> = subject()
): Effect<Params, Done, Fail, State> {
  const handlers = new Set

  const {eventID, nextSeq, getType} = basicCommon(domainName, name)

  handlers.add((payload, state) => action$.next(payload))
  // handlers.add((payload, state) => state$.next(state))
  let using: (params: Params) => Promise<Done> = never
  function use(thunk: (params: Params) => Promise<Done>) {
    using = thunk
  }
  const create = (payload: Params) => ({
    type: getType(),
    payload,
    meta: {
      index: nextPayloadID(),
      eventID,
      seq: nextSeq(),
    },
  })
  const effect = (params: Params) => {
    let run = () => {
      run = () => {}
      using(params).then(
        result => {
          const data = {params, result}
          dispatch(done(data))
          resolve(data)
        },
        error => {
          const data = {params, error}
          dispatch(fail(data))
          reject(data)
        },
      )
    }
    const runner = (dispatchHook) => {
      if (canDispatch) {
        const dispatcher = dispatchHook
          ? dispatchHook
          : dispatch
        canDispatch = false
        dispatcher(result)
        for (const handler of handlers) {
          handler(params, getState())
        }
        // action$.next(params)
        run()
      }
    }
    let resolve = (val) => {}
    let reject = (val) => {}
    const doneP: Promise<{params: Params, result: Done}> = new Promise(rs => resolve = rs)
    const failP: Promise<{params: Params, error: Fail}> = new Promise(rs => reject = rs)
    const toSend = Promise.resolve(params)
    const result = create(params)
    let canDispatch = true
    return {
      ...result,
      raw() {
        return result
      },
      send(dispatchHook) {
        runner(dispatchHook)
        return toSend
      },
      done() {
        runner()
        return doneP
      },
      fail() {
        runner()
        return failP
      },
      promise() {
        runner()
        return Promise.race([
          doneP,
          failP.then(data => Promise.reject(data)),
        ])
      }
    }
  }
  const done: Event<{params: Params, result: Done}, State> = EventConstructor(
    domainName,
    dispatch,
    getState,
    state$,
    events,
    [name, 'done'].join(' ')
  )
  const fail: Event<{params: Params, error: Fail}, State> = EventConstructor(
    domainName,
    dispatch,
    getState,
    state$,
    events,
    [name, 'fail'].join(' ')
  )
  function watch<R>(fn: (params: Params, state: State) => R) {
    handlers.add((params, state) => {
      const result = fn(params, state)
      safeDispatch(result, dispatch)
    })
  }

  effect.use = use
  effect.getType = getType
  effect.done = done
  effect.fail = fail
  effect.watch = watch
  effect.epic = port(dispatch, state$, action$)
  return effect
}

function never(props: any): Promise<any> {
  console.warn(`


  Running an effect without implementation

`, props)
  return new Promise(() => {})
}
