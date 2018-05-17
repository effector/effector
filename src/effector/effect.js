//@flow

// import invariant from 'invariant'
import warning from 'warning'
import type {Event, Effect, GraphiteMeta} from './index.h'
import * as Kind from '../kind'
import {setProperty} from '../setProperty'

import {eventConstructor} from './event'

export function createEffect<Payload, Done>(
 name: string,
): Effect<Payload, Done, *> {
 return effectConstructor({name, domainName: ''})
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

 // instanceAsEvent.step.data.delete(instanceAsEvent.cmd)
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
