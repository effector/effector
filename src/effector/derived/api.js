//@flow

import invariant from 'invariant'
import $$observable from 'symbol-observable'
import warning from 'warning'
import {from, type Stream} from 'most'
import {atom, atomically, type Atom} from '../../derive'
import type {Event, Effect} from '../index.h'
import * as Kind from '../../kind'
import {setProperty} from '../../setProperty'

export function createEvent<Payload>(name: string): Event<Payload> {
 return eventConstructor({name, domainName: ''})
}

export function createEffect<Payload, Done>(
 name: string,
): Effect<Payload, Done, *> {
 return effectConstructor({name, domainName: ''})
}

function link<A, B>(
 a: Event<A> | Effect<A, any, any>,
 b: Event<B> | Effect<B, any, any>,
 ab: A => B,
 ba: B => A,
) {
 let halt = false
 // let active =
 let current: 0 | 1 | 2 = 0
 const whenAB = () => current !== 2
 const whenBA = () => current !== 1
 const until = () => halt
 let lastAseq = -1
 let lastBseq = -1
 a.eventState.react(
  ({payload, seq}) => {
   if (seq === lastAseq) return
   // atomically(() => {
   lastAseq = seq
   current = 1
   const nextB = ab(payload)
   b(nextB)
   current = 0
   // })
  },
  {until, skipFirst: true, when: whenAB},
 )
 b.eventState.react(
  ({payload, seq}) => {
   if (seq === lastBseq) return
   // atomically(() => {
   lastBseq = seq
   current = 2
   const nextA = ba(payload)
   a(nextA)
   current = 0
   // })
  },
  {until, skipFirst: true, when: whenBA},
 )
 return () => {
  halt = true
 }
}

function eventConstructor<Payload>({
 name,
 domainName,
}: {
 name: string,
 domainName: string,
}): Event<Payload> {
 const fullName = makeName(name, domainName)
 const eventState: Atom<{payload: Payload, seq: string}> = atom(
  ({payload: null, seq: -1}: any),
 )

 const instance = (payload: Payload): Payload =>
  instanceAsEvent.create(payload, fullName)
 const instanceAsEvent: Event<Payload> = (instance: any)
 setProperty('create', create, instance)
 setProperty('eventState', eventState, instance)
 setProperty('toString', getType, instance)
 setProperty('getType', getType, instance)
 setProperty('kind', Kind.EVENT, instance)
 setProperty($$observable, () => instance, instance)

 instance.watch = watch
 instance.map = map
 instance.prepend = prepend
 instance.subscribe = subscribe
 instance.to = to
 instance.epic = epic
 // instance.link = (b, ab, ba) => link(instanceAsEvent, b, ab, ba)
 function epic<T>(fn: (Stream<Payload>) => Stream<T>): Event<T> {
  const instance$ = from(instanceAsEvent).multicast()
  const epic$ = fn(instance$).multicast()
  const mapped = eventConstructor({name: `${name}$ ~> *`, domainName})
  epic$.observe(e => {
   mapped.create(e, fullName)
  })
  return mapped
 }
 function to(target, handler?: Function) {
  switch (Kind.readKind(target)) {
   case Kind.STORE:
    return watch(payload => target.setState(payload, handler))
   case Kind.EVENT:
   case Kind.EFFECT:
    return watch(target.create)
   default: {
    throw new TypeError(`Unsupported kind`)
   }
  }
 }
 let seq = 0
 function create(payload, fullName) {
  atomically(() => {
   instanceAsEvent.eventState.set({payload, seq: ++seq})
  })
  return payload
 }
 function watch(watcher: (payload: Payload, type: string) => any) {
  let halt = false
  let lastSeq = -1
  const until = () => halt
  const unsub = instanceAsEvent.eventState.react(
   ({payload, seq}) => {
    if (halt) return
    if (seq === lastSeq) return
    lastSeq = seq
    atomically(() => {
     watcher(payload, fullName)
    })
   },
   {skipFirst: true, until},
  )
  return () => {
   if (halt) return
   halt = true
   unsub()
  }
 }

 function subscribe(observer) {
  const unsub = watch(payload => observer.next(payload))
  function unsubscribe() {
   unsub()
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
 const done: Event<{params: Payload, result: Done}> = eventConstructor({
  name: `${name} done`,
  domainName,
 })
 const fail: Event<{params: Payload, error: *}> = eventConstructor({
  name: `${name} fail`,
  domainName,
 })
 instance.done = done
 instance.fail = fail
 instance.use = use
 setProperty('create', create, instance)
 setProperty('kind', Kind.EFFECT, instance)
 let thunk = async(value: Payload): Promise<Done> => {
  warning(false, 'no thunk used')
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
  const onDone = result => done({params: payload, result})
  const onFail = error => fail({params: payload, error})
  //$todo
  if (isPromise) req.then(onDone, onFail)
  else if (isSyncError) onFail(syncError)
  else onDone(req)
  eventCreate(payload, instanceAsEvent.getType())
  return {
   done() {
    return new Promise(rs => {
     if (isPromise) req.then(result => rs({params: payload, result}))
     else if (!isSyncError) rs({params: payload, result: req})
    })
   },
   fail() {
    return new Promise(rs => {
     if (isPromise) req.catch(error => rs({params: payload, error}))
     else if (isSyncError) rs({params: payload, error: syncError})
    })
   },
   promise() {
    return new Promise((rs, rj) => {
     if (isPromise) req.then(rs, rj)
     else if (isSyncError) rj(syncError)
     else rs(req)
    })
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
