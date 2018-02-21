//@flow

import {type Stream, combine} from 'most'
import {subject, type Subject} from '../subject'

import type {Effect, Event, RawAction, DomainConfig} from '../index.h'
import {nextPayloadID, nextEventID, toTag, counter, type Tag} from '../id'

import {EventConstructor} from '../event'
import {port} from '../port'

import {basicCommon, observable} from '../event-common'
import {implWarn, implError, watchWarn} from './warn'

export function EffectConstructor<State, Params, Done, Fail>(
  domainName: string,
  dispatch: <T>(value: T) => T,
  getState: () => State,
  state$: Stream<State>,
  events: Map<string | Tag, Event<any, State>>,
  name: string,
  opts: DomainConfig,
  action$: Subject<Params> = subject(),
): Effect<Params, Done, Fail, State> {
  const handlers = new Set()

  const {eventID, nextSeq, getType} = basicCommon(domainName, name)

  handlers.add((payload, state) => action$.next(payload))
  let using: (params: Params) => Promise<Done> = getWarn({
    domainName,
    name,
    mode: () => opts.effectImplementationCheck(),
  })
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
      passed: false,
    },
  })
  const effect = (params: Params) => {
    let run = () => {
      run = () => {}
      using(params).then(
        result => {
          const data = {params, result}
          dispatcher(done(data), dispatch)
          resolve(data)
        },
        error => {
          const data = {params, error}
          dispatcher(fail(data), dispatch)
          reject(data)
        },
      )
    }
    const runner = dispatchHook => {
      if (canDispatch) {
        canDispatch = false
        dispatcher(result, dispatch, dispatchHook)
        for (const handler of handlers) {
          handler(params, getState())
        }
        run()
        // action$.next(params)
      }
    }
    let resolve = val => {}
    let reject = val => {}
    const doneP: Promise<{params: Params, result: Done}> = new Promise(
      rs => (resolve = rs),
    )
    const failP: Promise<{params: Params, error: Fail}> = new Promise(
      rs => (reject = rs),
    )
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
        return Promise.race([doneP, failP.then(data => Promise.reject(data))])
      },
    }
  }
  const done: Event<{params: Params, result: Done}, State> = EventConstructor(
    domainName,
    dispatch,
    getState,
    state$,
    events,
    [name, 'done'].join(' '),
  )
  const fail: Event<{params: Params, error: Fail}, State> = EventConstructor(
    domainName,
    dispatch,
    getState,
    state$,
    events,
    [name, 'fail'].join(' '),
  )
  function watch<R>(fn: (params: Params, state: State) => R) {
    effect.epic(
      (data$, state$) => combine(
        (data, state) => ({ data, state }),
        data$, state$
      ).sampleWith(data$)
        .map(({data, state}) => {
          try {
            const result = fn(data, state)
            return result
          } catch (err) {
            watchFailWarn({
              domainName, name,
              mode: opts.watchFailCheck()
            }, err)
          }
        })
    )
  }

  effect.use = use
  effect.getType = getType
  setToString(effect, getType)
  effect.done = done
  effect.fail = fail
  effect.watch = watch
  effect.epic = port(dispatch, state$, action$)
  effect.trigger = function trigger(
    query: (state: State) => Params,
    eventName: string = 'trigger',
  ): Event<void, State> {
    const triggerEvent = EventConstructor(
      domainName,
      dispatch,
      getState,
      state$,
      events,
      [name, eventName].join(' '),
    )
    triggerEvent.watch((_, state) => {
      const queryResult = query(state)
      return effect(queryResult)
    })

    return triggerEvent
  }
  // effect.port = function port<R>(events$: Stream<R>) {
  //   return events$.observe(data => safeDispatch(data, dispatch))
  // }
  effect.subscribe = subscriber => action$.subscribe(subscriber)
  observable(effect, action$)
  return effect
}

function setToString(effect: any, getType) {
  effect.toString = getType
}

function dispatcher(value, dispatchDefault, dispatchHook, isBatch = false) {
  if (!isAction(value)) {
    if (__DEV__) {
      console.warn(`Not an action`, value)
    }
    return value
  }
  const dispatch =
    typeof dispatchHook === 'function' ? dispatchHook : dispatchDefault
  const result = dispatch(value)
  return result
}

function isAction(data): boolean %checks {
  return (
    typeof data === 'object' && data != null && typeof data.type === 'string'
  )
}

function watchFailWarn({domainName, name, mode}, error) {
  switch (mode) {
    case 'throw': {
      throw error
    }
    case 'warn': {
      watchWarn(domainName, name, error)
    }
    case 'off':
    default: {
      return
    }
  }
}

const getWarn = ({domainName, name, mode}) =>
  function never(props: any): Promise<any> {
    switch (mode()) {
      case 'throw': {
        return Promise.reject(implError(domainName, name, props))
      }
      case 'warn': {
        implWarn(domainName, name, props)
      }
      case 'off':
      default: {
        return new Promise(() => {})
      }
    }
  }
