//@flow

import invariant from 'invariant'
import type {Stream} from 'most'
import {subject, type Subject} from './subject'

import warning from '@effector/warning'
import {Emission} from '@effector/emission'
import {
 actor,
 event,
 type Event as ActorEvent,
 type Atom,
 type Actor,
} from '@effector/actor'
import {createStore} from '@effector/store'

import type {Event, RawAction, WarnMode} from './index.h'
import {nextPayloadID, type Tag} from './id'

import {port} from './port'

import {basicCommon, observable} from './event-common'
import {createWatcher} from './effect/watch'

export type EventParams<Payload> = {
 domainName: string,
 name: string,
}

export function createEvent<Payload>({name, domainName}: EventParams<Payload>) {
 const fullName = [name, domainName].filter(str => str.length > 0).join('/')
 const actorEvent = event(fullName)
 const subscribers = new Set()
 const unlockSymbol = {}
 let isLocked = unlockSymbol
 //$todo
 const eventCreator = payload => {
  invariant(isLocked === unlockSymbol || payload !== isLocked, 'already locked')
  const lastLocked = isLocked
  isLocked = payload
  const result = actorEvent.create(payload)
  for (const f of subscribers) {
   f(payload, result)
  }
  isLocked = lastLocked
  return result
 }
 eventCreator.getType = () => fullName
 //$todo
 eventCreator.toString = () => fullName //TODO that will throw
 //TODO Implement epic
 eventCreator.epic = (fn: Function) => {
  warning('event.epic is not implemented yet')
  return eventCreator
 }
 //TODO Implement map
 eventCreator.map = (fn: Function) => {
  const innerStore = createStore()
  innerStore.on(eventCreator, (_, payload) => fn(payload))
  return innerStore
 }
 //TODO Implement watch
 eventCreator.watch = (fn: Function) => {
  subscribers.add(fn)
  return () => {
   subscribers.delete(fn)
  }
 }

 eventCreator.to = (action: Function, reduce) => {
  const needReduce = action.kind() === 'store' && typeof reduce === 'function'
  return eventCreator.watch(data => {
   if (!needReduce) {
    action(data)
   } else {
    const lastState = action.getState()
    const reduced = reduce(lastState, data)
    if (lastState !== reduced) action.setState(reduced)
   }
  })
 }
 type Thru = (_: typeof eventCreator) => typeof eventCreator
 eventCreator.thru = (fn: Thru) => fn(eventCreator)
 return eventCreator
}

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
 const actorEvent = event(getType())
 const emission = new Emission()
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
     emission.dispatch(result)
     // action$.next(payload)
    }
    return toSend
   },
  }
 }
 eventInstance.emission = emission
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
   return altEvent(queryResult)
  })

  return triggerEvent
 }

 const altEvent = payload => actorEvent.create(payload)

 Object.assign(altEvent, eventInstance)
 //  observable(eventInstance, action$)
 observable(altEvent, action$)
 events.set(getType(), altEvent)

 Object.defineProperty(altEvent, 'kind', {
  writable: true,
  configurable: true,
  value() {
   return 'event'
  },
 })
 return altEvent
}
