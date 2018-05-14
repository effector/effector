//@flow

// import invariant from 'invariant'
import $$observable from 'symbol-observable'
import warning from 'warning'
import {from, type Stream} from 'most'
import type {Event, Effect, GraphiteMeta} from './index.h'
import * as Kind from '../kind'
import {setProperty} from '../setProperty'
// import {runSyncGraph} from '../../graph'
import * as Cmd from './datatype/cmd'
import * as Step from './datatype/step'
import {walkEvent} from './walk'

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

 const cmd: Cmd.Emit = Cmd.emit({
  subtype: 'event',
  fullName,
  runner: createGraphite,
 })
 const step: Step.Single = Step.single(cmd)
 const nextSteps: Step.Multi = Step.multi()
 const stepFull: Step.Seq = Step.seq([step, nextSteps])
 const graphite: GraphiteMeta = {
  cmd,
  step,
  next: nextSteps,
  seq: stepFull,
 }
 const instance = (payload: Payload): Payload =>
  instanceAsEvent.create(payload, fullName)
 function createGraphite(payload: Payload): Payload {
  return instanceAsEvent.create(payload, fullName)
 }
 const instanceAsEvent: Event<Payload> = (instance: any)
 instanceAsEvent.graphite = graphite

 setProperty('create', create, instance)

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
 const seq = 0

 function create(payload, fullName) {
  walkEvent(payload, instanceAsEvent)
  return payload
 }
 function watch(watcher: (payload: Payload, type: string) => any) {
  const runCmd = Step.single(
   Cmd.run({
    runner(newValue: Payload) {
     return watcher(newValue, fullName)
    },
   }),
  )
  instanceAsEvent.graphite.next.data.add(runCmd)
  return () => {
   instanceAsEvent.graphite.next.data.delete(runCmd)
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
  const computeCmd = Step.single(
   Cmd.compute({
    reduce(_, newValue: Payload, ctx) {
     return fn(newValue)
    },
   }),
  )
  const nextSeq = Step.seq([computeCmd, ...mapped.graphite.seq.data])
  instanceAsEvent.graphite.next.data.add(nextSeq)
  return mapped
 }
 function prepend<Before>(fn: Before => Payload) {
  const contramapped: Event<Before> = eventConstructor({
   name: `* → ${name}`,
   domainName,
  })

  const computeCmd = Step.single(
   Cmd.compute({
    reduce(_, newValue: Before, ctx) {
     return fn(newValue)
    },
   }),
  )
  const nextSeq = Step.seq([computeCmd, ...instanceAsEvent.graphite.seq.data])
  contramapped.graphite.next.data.add(nextSeq)
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

function makeName(name, domainName) {
 return [name, domainName].filter(str => str.length > 0).join('/')
}
