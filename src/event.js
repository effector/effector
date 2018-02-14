//@flow

// import type {Store} from 'redux'
import {type Stream, subscribe} from 'most'
import {async as subject, type Subject} from 'most-subject'

import type {Event, RawAction} from './index.h'

import {nextPayloadID, type Tag} from './id'

import {port} from './port'

import {basicCommon} from './event-common'

export function EventConstructor<State, Payload>(
  domainName: string,
  dispatch: <T>(value: T) => T,
  getState: () => State,
  state$: Stream<State>,
  events: Map<string | Tag, Event<any, State>>,
  name: string,
  action$: Subject<Payload> = subject()
): Event<Payload, State> {
  const {eventID, nextSeq, getType} = basicCommon(domainName, name)
  const handlers = new Set
  function watch<R>(
    fn: (params: Payload, state: State) => R
  ) {
    handlers.add(fn)
  }
  handlers.add((payload, state) => action$.next(payload))
  // handlers.add((payload, state) => state$.next(state))

  const create = (payload: Payload) => ({
    type: getType(),
    payload,
    meta: {
      index: nextPayloadID(),
      eventID,
      seq: nextSeq(),
    },
  })
  function eventInstance(payload: Payload) {
    const toSend = Promise.resolve(payload)
    const result = create(payload)
    let canDispatch = true
    return {
      ...result,
      raw(): RawAction<Payload> {
        return result
      },
      send(dispatchHook) {
        if (canDispatch) {
          const dispatcher = dispatchHook
            ? dispatchHook
            : dispatch
          canDispatch = false
          dispatcher(result)
          for (const handler of handlers) {
            handler(payload, getState())
          }
          // action$.next(payload)
        }
        return toSend
      },
    }
  }
  eventInstance.getType = getType
  //$off
  eventInstance.toString = getType
  eventInstance.watch = watch
  eventInstance.epic = port(dispatch, state$, action$)
  eventInstance.subscribe = (subscriber) => subscribe(subscriber, action$)

  events.set(getType(), eventInstance)
  return eventInstance
}
