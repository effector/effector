//@flow

import type {Stream} from 'most'
import {subject, type Subject} from './subject'

import type {Event, RawAction, WarnMode} from './index.h'

import {nextPayloadID, type Tag} from './id'

import {port} from './port'

import {basicCommon, observable} from './event-common'
import {createWatcher} from './effect/watch'

export function createEvent<Payload>({
 name,
 kind = '_',
 dispatch,
}: {
  name: string,
  kind: '_' | 'plain',
  dispatch: <T>(value: T) => T,
}) {}

export function EventConstructor<State, Payload>(
 domainName: string,
 dispatch: <T>(value: T) => T,
 getState: () => State,
 state$: Stream<State>,
 events: Map<string | Tag, Event<any, State>>,
 name: string,
 action$: Subject<Payload> = subject(),
 config: {
    isPlain: boolean,
    watchFailCheck: WarnMode,
  } = {
  isPlain: false,
  watchFailCheck: 'warn',
 },
): Event<Payload, State> {
 const {eventID, nextSeq, getType} = basicCommon(domainName, name)
 const handlers = new Set()
 if (!config.isPlain)
  handlers.add((payload /*::, state*/) => action$.next(payload))
  // handlers.add((payload, state) => state$.next(state))

 const create = (payload: Payload) => ({
  type: getType(),
  payload,
  meta: {
   index: nextPayloadID(),
   eventID,
   seq: nextSeq(),
   passed: false,
   plain: config.isPlain,
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
     const dispatcher = dispatchHook ? dispatchHook : dispatch
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
 eventInstance.watch = createWatcher({
  event: eventInstance,
  domainName,
  name,
  opts: {
   watchFailCheck: () => config.watchFailCheck,
  },
 })
 eventInstance.epic = port(dispatch, state$, action$)
 eventInstance.subscribe = subscriber => action$.subscribe(subscriber)
 // eventInstance.port = function port<R>(events$: Stream<R>) {
 //   return events$.observe(data => safeDispatch(data, dispatch))
 // }
 eventInstance.trigger = function trigger(
  query: (state: State) => Payload,
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
   return eventInstance(queryResult)
  })

  return triggerEvent
 }
 observable(eventInstance, action$)
 events.set(getType(), eventInstance)
 return eventInstance
}
