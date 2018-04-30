//@flow

import invariant from 'invariant'
import $$observable from 'symbol-observable'
import warning from '../../warning'
import {from, type Stream} from 'most'
import {atom, type Atom} from '../../derive'
import type {Event, Effect} from '../index.h'

export function createEvent<Payload>(name: string): Event<Payload> {
 return eventConstructor({name, domainName: ''})
}

export function createEffect<Payload, Done>(
 name: string,
): Effect<Payload, Done, *> {
 return effectConstructor({name, domainName: ''})
}

function eventConstructor<Payload>({
 name,
 domainName,
}: {
 name: string,
 domainName: string,
}): Event<Payload> {
 const fullName = makeName(name, domainName)
 const eventState: Atom<Payload> = atom(({payload: null}: any))

 const instance = (payload: Payload): Payload =>
  instanceAsEvent.create(payload, fullName)
 const instanceAsEvent: Event<Payload> = (instance: any)
 setProperty('create', create, instance)
 setProperty('eventState', eventState, instance)
 setProperty('toString', getType, instance)
 setProperty('getType', getType, instance)
 setProperty('kind', () => ('event': 'event'), instance)
 setProperty($$observable, () => instance, instance)

 instance.watch = watch
 instance.map = map
 instance.prepend = prepend
 instance.subscribe = subscribe
 instance.to = to
 instance.epic = epic
 function epic<T>(fn: (Stream<Payload>) => Stream<T>): Event<T> {
  const instance$ = from(instanceAsEvent).multicast()
  const epic$ = fn(instance$).multicast()
  const mapped = eventConstructor({name: `${name}$ ~> *`, domainName})
  epic$.observe(mapped)
  return mapped
 }
 function to(target, handler?: Function) {
  invariant(target.kind() === 'store', 'right now event.to support only stores')
  invariant(
   typeof target.setState === 'function',
   'right now event.to support only stores',
  )
  watch(payload => target.setState(payload, handler))
  //return instance
 }
 function create(payload, fullName) {
  let definedPayload = payload
  if (definedPayload === undefined) definedPayload = null
  instanceAsEvent.eventState.set({payload})
  return payload
 }
 function watch(watcher: (payload: Payload) => any) {
  instanceAsEvent.eventState.react(
   () => {
    watcher(instanceAsEvent.eventState.get().payload)
   },
   {skipFirst: true},
  )
 }
 function subscribe(observer) {
  watch(payload => observer.next(payload))
  function unsubscribe() {
   warning('TODO event.unsubscribe is not implemented')
  }

  unsubscribe.unsubscribe = unsubscribe

  return unsubscribe
 }
 function map<Next>(fn: Payload => Next) {
  const mapped = eventConstructor({name: `${name} → *`, domainName})
  watch(payload => {
   mapped(fn(payload))
  })
  return mapped
 }
 function prepend<Before>(fn: Before => Payload) {
  const contramapped: Event<Before> = eventConstructor({
   name: `* → ${name}`,
   domainName,
  })
  contramapped.watch((_: Before) => {
   instance(fn(_))
  })
  return contramapped
 }
 function getType() {
  return fullName
 }
 return (instance: $todo)
}

function effectConstructor<Payload, Done>({
 name,
 domainName,
}: {
 name: string,
 domainName: string,
}): Effect<Payload, Done, *> {
 const instanceAsEvent: Event<Payload> = eventConstructor({
  name,
  domainName,
 })
 const instance: Effect<Payload, Done, any> = (instanceAsEvent: any)
 const eventCreate = instanceAsEvent.create
 const done: Event<Done> = eventConstructor({
  name: `${name} done`,
  domainName,
 })
 const fail = eventConstructor({
  name: `${name} fail`,
  domainName,
 })
 instance.done = done
 instance.fail = fail
 instance.use = use
 setProperty('create', create, instance)
 setProperty('kind', () => ('effect': 'effect'), instance)
 let thunk = async(value: Payload): Promise<Done> => {
  warning('no thunk used')
  declare var result: Done
  /*::return result*/
 }
 function use(fn) {
  thunk = fn
 }
 function create(payload: Payload) {
  const throwSymbol = {}
  let syncError = throwSymbol
  let req
  try {
   req = thunk(payload)
  } catch (err) {
   syncError = err
  }
  const isSyncError = syncError !== throwSymbol
  const isPromise = !isSyncError && hasPromise(req)
  //$todo
  if (isPromise) req.then(done, fail)
  else if (isSyncError) fail(syncError)
  //$todo
  else done(req)
  eventCreate(payload, instanceAsEvent.getType())
  return {
   done() {
    return new Promise(rs => {
     if (isPromise) req.then(rs)
     else if (!isSyncError) rs(req)
    })
   },
   fail() {
    return new Promise(rs => {
     if (isPromise) req.catch(rs)
     else if (isSyncError) rs(syncError)
    })
   },
   promise() {
    if (isPromise) return req
    if (isSyncError) return Promise.reject(syncError)
    return Promise.resolve(req)
   },
  }
 }

 return instance
}

function hasPromise(req: mixed): boolean %checks {
 return (
  typeof req === 'object' && req !== null && typeof req.then === 'function'
 )
}

function makeName(name, domainName) {
 return [name, domainName].filter(str => str.length > 0).join('/')
}

function setProperty(prop, value, obj: any) {
 Object.defineProperty(obj, prop, {
  value,
  writable: true,
  configurable: true,
 })
}
