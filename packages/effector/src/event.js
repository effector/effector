//@flow

import invariant from 'invariant'
import observable$$ from 'symbol-observable'
// import type {Stream} from 'most'
// import {from} from 'most'
// import {subject, type Subject} from './subject'

import warning from '@effector/warning'
// import {Emission} from '@effector/emission'
// import {
//  actor,
//  event,
//  type Event as ActorEvent,
//  type Atom,
//  type Actor,
// } from '@effector/actor'
import {createStore} from '@effector/store'

// import type {Event, RawAction, WarnMode} from './index.h'
// import {nextPayloadID, type Tag} from './id'

// import {port} from './port'

// import {basicCommon, observable} from './event-common'
// import {createWatcher} from './effect/watch'

export type EventParams<Payload> = {
 domainName: string,
 name: string,
}

export function createEvent<Payload>({name, domainName}: EventParams<Payload>) {
 const fullName = [name, domainName].filter(str => str.length > 0).join('/')
 //  const actorEvent = event(fullName)
 const eventStore = createStore()
 const subscribers = new Set()
 const unlockSymbol = {}
 let isLocked = unlockSymbol
 let index = 0
 //$todo
 const eventCreator = payload => {
  invariant(isLocked === unlockSymbol || payload !== isLocked, 'already locked')
  const lastLocked = isLocked
  isLocked = payload
  const plainAction = {
   type: fullName,
   payload,
   meta: {id: eventStore.id, index: (++index).toString(36)},
  }
  if (__DEV__) {
   console.log('payload', fullName, payload)
  }
  eventStore.setState(payload)
  // const result = actorEvent.create(payload)
  for (const f of subscribers) {
   f(payload, plainAction)
  }
  isLocked = lastLocked
  return plainAction
 }

 eventCreator.getType = getType
 //$todo
 eventCreator.toString = getType //TODO that will throw
 //$off
 eventCreator[observable$$] = eventStore[observable$$]
 /* */
 eventCreator.map = function map(fn: Function) {
  const innerStore = createEvent({name: `${name} -> *`, domainName})
  //  innerStore.on(eventCreator, (_, payload) => fn(payload))
  eventCreator.watch(_ => {
   const mapped = fn(_)
   if (__DEV__) {
    console.log('mapped store', _, mapped)
   }
   innerStore(mapped)
  })
  return innerStore
 }
 eventCreator.watch = function watch(fn: (payload: any, result: any) => any) {
  subscribers.add(fn)
  return () => {
   subscribers.delete(fn)
  }
 }
 //$todo wtf
 eventCreator.to = function to(action: Function, reduce) {
  const needReduce = action.kind() === 'store' && typeof reduce === 'function'
  return eventCreator.watch(data => {
   if (!needReduce) {
    action(data)
   } else {
    const lastState = action.getState()
    const reduced = reduce(lastState, data)
    if (__DEV__) {
     console.log(fullName, reduced, lastState, '~~')
    }
    //  if (lastState !== reduced)
    action.setState(reduced)
   }
  })
 }
 //$todo wtf
 eventCreator.epic = eventStore.epic
 // eventCreator[Symbol.iterator] = observable
 function getType() {
  return fullName
 }
 type Thru = (_: typeof eventCreator) => typeof eventCreator
 function thru(fn: Thru) {
  return fn(eventCreator)
 }
 eventCreator.thru = thru

 return eventCreator
}

// function getType() {
//   return fullName
//  }
//  function observable() {
//   const outerSubscribe = watch
//   return {
//    subscribe(observer) {
//     invariant(
//      typeof observer === 'object' && observer !== null,
//      'Expected the observer to be an object.',
//     )

//     function observeState(payload, result) {
//      if (observer.next) {
//       observer.next(payload)
//      }
//     }

//     // observeState()
//     const unsubscribe = outerSubscribe(observeState)
//     return {unsubscribe}
//    },
//    //$off
//    [observable$$]() {
//     return this
//    },
//   }
//  }
//  function epic(fn: Function) {
//   //$off
//   const event$ = from(eventCreator).multicast()
//   const innerStore = (createStore: any)()
//   watch(_ => innerStore.setState(_))
//   return innerStore
//  }

//  function map(fn: Function) {
//   const innerStore = createStore()
//   innerStore.on(eventCreator, (_, payload) => fn(payload))
//   return innerStore
//  }

//  function watch(fn: (payload: any, result: any) => any) {
//   subscribers.add(fn)
//   return () => {
//    subscribers.delete(fn)
//   }
//  }

//  function to(action: Function, reduce) {
//   const needReduce = action.kind() === 'store' && typeof reduce === 'function'
//   return eventCreator.watch(data => {
//    if (!needReduce) {
//     action(data)
//    } else {
//     const lastState = action.getState()
//     const reduced = reduce(lastState, data)
//     if (lastState !== reduced) action.setState(reduced)
//    }
//   })
//  }
//  type Thru = (_: typeof eventCreator) => typeof eventCreator
//  function thru(fn: Thru) {
//   return fn(eventCreator)
//  }

export function createEffect<Payload>({
 name,
 domainName,
}: EventParams<Payload>) {
 const fullName = [name, domainName].filter(str => str.length > 0).join('/')
 // const actorEvent = event(fullName)
 const startEvent = createEvent({name: fullName, domainName})
 startEvent.watch(payload => {
  if (__DEV__) {
   console.log('effect ', fullName, 'payload', payload)
  }
  thunk(payload)
 })
 //$todo
 //  const eventCreator = payload => {
 //    const req = thunk(payload).then(e => done(e).send(), e => fail(e).send())
 //   const e = startEvent(payload)
 //   return req
 //  }
 let thunk
 async function thunkDefaults(_: any) {
  warning(`Effect ${fullName} called without implementation`)
 }
 use(thunkDefaults)
 function use(fn) {
  thunk = param =>
   fn(param).then(
    e => {
     console.log(fullName, e)
     return done(e)
    },
    e => fail(e),
   )
 }
 const done = createEvent({name: `${fullName} done`, domainName})
 const fail = createEvent({name: `${fullName} fail`, domainName})
 startEvent.done = done
 startEvent.fail = fail
 startEvent.use = use

 //  eventCreator.getType = startEvent.getType
 //  //$todo
 //  eventCreator.toString = startEvent.getType
 //  eventCreator.map = startEvent.map
 //  eventCreator.watch = startEvent.watch
 //  eventCreator.to = startEvent.to
 //  eventCreator.epic = startEvent.epic
 //  eventCreator.thru = startEvent.thru
 //  //$off
 //  eventCreator[observable$$] = startEvent[observable$$]

 return startEvent
}

// export function EventConstructor<State, Payload>(
//  domainName: string,
//  dispatch: <T>(value: T) => T,
//  getState: () => State,
//  state$: Stream<State>,
//  events: Map<string | Tag, Event<any, State>>,
//  name: string,
//  action$: Subject<Payload> = subject(),
//  config: {
//   isPlain: boolean,
//   watchFailCheck: WarnMode,
//  } = {
//   isPlain: false,
//   watchFailCheck: 'warn',
//  },
// ): Event<Payload, State> {
//  const {eventID, nextSeq, getType} = basicCommon(domainName, name)
//  const actorEvent = event(getType())
//  const emission = new Emission()
//  const handlers = new Set()
//  if (!config.isPlain)
//   handlers.add((payload /*::, state*/) => action$.next(payload))
//  // handlers.add((payload, state) => state$.next(state))

//  const create = (payload: Payload) => ({
//   type: getType(),
//   payload,
//   meta: {
//    index: nextPayloadID(),
//    eventID,
//    seq: nextSeq(),
//    passed: false,
//    plain: config.isPlain,
//   },
//  })
//  function eventInstance(payload: Payload) {
//   const toSend = Promise.resolve(payload)
//   const result = create(payload)
//   let canDispatch = true
//   return {
//    ...result,
//    raw(): RawAction<Payload> {
//     return result
//    },
//    send(dispatchHook) {
//     if (canDispatch) {
//      const dispatcher = dispatchHook ? dispatchHook : dispatch
//      canDispatch = false
//      dispatcher(result)
//      for (const handler of handlers) {
//       handler(payload, getState())
//      }
//      emission.dispatch(result)
//      // action$.next(payload)
//     }
//     return toSend
//    },
//   }
//  }
//  eventInstance.emission = emission
//  eventInstance.getType = getType
//  //$off
//  eventInstance.toString = getType
//  eventInstance.watch = createWatcher({
//   event: eventInstance,
//   domainName,
//   name,
//   opts: {
//    watchFailCheck: () => config.watchFailCheck,
//   },
//  })
//  eventInstance.epic = port(dispatch, state$, action$)
//  eventInstance.subscribe = subscriber => action$.subscribe(subscriber)
//  // eventInstance.port = function port<R>(events$: Stream<R>) {
//  //   return events$.observe(data => safeDispatch(data, dispatch))
//  // }
//  eventInstance.trigger = function trigger(
//   query: (state: State) => Payload,
//   eventName: string = 'trigger',
//  ): Event<void, State> {
//   const triggerEvent = EventConstructor(
//    domainName,
//    dispatch,
//    getState,
//    state$,
//    events,
//    [name, eventName].join(' '),
//   )
//   triggerEvent.watch((_, state) => {
//    const queryResult = query(state)
//    return altEvent(queryResult)
//   })

//   return triggerEvent
//  }

//  const altEvent = payload => actorEvent.create(payload)

//  Object.assign(altEvent, eventInstance)
//  //  observable(eventInstance, action$)
//  observable(altEvent, action$)
//  events.set(getType(), altEvent)

//  Object.defineProperty(altEvent, 'kind', {
//   writable: true,
//   configurable: true,
//   value() {
//    return 'effect'
//   },
//  })
//  return altEvent
// }
