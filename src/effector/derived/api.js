//@flow

import invariant from 'invariant'
import $$observable from 'symbol-observable'
import warning from '../../warning'
import {from} from 'most'
import {atom, type Atom} from '../../derive'

export function createEvent<Payload>(name: string) {
 return eventConstructor({name, domainName: ''})
}

export function createEffect<Payload, Done>(name: string) {
 return effectConstructor({name, domainName: ''})
}

function eventConstructor<Payload>({
 name,
 domainName,
}: {
 name: string,
 domainName: string,
}) {
 const fullName = makeName(name, domainName)
 const eventState: Atom<Payload> = atom({payload: null})

 const instance = (payload: Payload) => instance.create(payload, fullName)

 setProperty('create', create, instance)
 setProperty('eventState', eventState, instance)
 setProperty('toString', getType, instance)
 setProperty('getType', getType, instance)
 setProperty('kind', () => ('event': 'event'), instance)
 setProperty($$observable, () => instance, instance)

 instance.watch = watch
 instance.map = map
 instance.subscribe = subscribe
 instance.to = to
 instance.epic = epic
 function epic(fn: Function) {
  const instance$ = from(instance).multicast()
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
  instance.eventState.set({payload})
  return payload
 }
 function watch(watcher: (payload: Payload) => any) {
  instance.eventState.react(
   () => {
    watcher(instance.eventState.get().payload)
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
 function getType() {
  return fullName
 }
 return instance
}

function effectConstructor<Payload, Done>({
 name,
 domainName,
}: {
 name: string,
 domainName: string,
}) {
 const instance = eventConstructor({
  name,
  domainName,
 })
 const eventCreate = instance.create
 const done = eventConstructor({
  name: `${name  } done`,
  domainName,
 })
 const fail = eventConstructor({
  name: `${name  } fail`,
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
  thunk = fn /*params => {
     let req
     try {
       req = fn(params)
     } catch (err) {
       return Promise.reject(err)
     }
   }*/
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
  if (isPromise) req.then(done, fail)
  else if (isSyncError) fail(syncError)
  else done(req)
  eventCreate(payload, instance.getType())
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
