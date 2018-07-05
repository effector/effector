//@flow

// import invariant from 'invariant'
// import warning from 'warning'
import $$observable from 'symbol-observable'
import type {GraphiteMeta, Subscription} from '../effector/index.h'
import type {Event} from './index.h'
import type {Store} from 'effector/store'
import type {Effect} from 'effector/effect'
import * as Kind from '../kind'

import {
 cmd as Cmd,
 ctx as Ctx,
 step as Step,
} from 'effector/datatype/FullDatatype.bs'
import {walkEvent, frame, seq} from 'effector/graphite'
import {eventRefcount} from '../refcount'
import {type CompositeName, createName} from '../compositeName'

export function eventFabric<Payload>({
 name: nameRaw,
 parent,
}: {
 name?: string,
 parent?: CompositeName,
}): Event<Payload> {
 const id = eventRefcount()
 const name = nameRaw || id
 const fullName = makeName(name, parent)
 const compositeName = createName(name, parent)
 const cmd = new Cmd.emit({
  subtype: 'event',
  fullName,
  runner: createGraphite,
 })
 const step: Step.Single = Step.single(cmd)
 const nextSteps: Step.Multi = Step.multi()
 const stepFull: Step.Seq = Step.seq([step, nextSteps])
 const graphite: GraphiteMeta = {
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
 const getType = () => compositeName.fullName
 Object.defineProperty((instance: any), 'toString', {
  configurable: true,
  value: getType,
 })
 instance.getType = getType
 ;(instance: any).create = (payload, fullName) => {
  walkEvent(payload, instanceAsEvent)
  return payload
 }
 ;(instance: any).kind = Kind.EVENT
 ;(instance: any)[$$observable] = () => instance
 instance.id = id
 instance.watch = watch
 instance.map = map
 instance.prepend = prepend
 instance.subscribe = subscribe
 instance.to = to
 // instance.epic = epic
 instance.shortName = name
 instance.domainName = parent
 instance.compositeName = compositeName
 instance.filter = filter
 function filter<Next>(fn: Payload => Next | void): Event<Next> {
  return filterEvent(instanceAsEvent, fn)
 }

 function map<Next>(fn: Payload => Next): Event<Next> {
  return mapEvent(instanceAsEvent, fn)
 }

 function to(
  target: Store<any> & Event<any> & Effect<any, any, any>,
  handler?: Function,
 ): Subscription {
  switch (Kind.readKind(target)) {
   case Kind.STORE:
    return watch(payload => target.setState(payload, handler))
   case Kind.EVENT:
   case Kind.EFFECT:
    return watch(target.create)
   default: {
    throw new TypeError('Unsupported kind')
   }
  }
 }

 function watch(
  watcher: (payload: Payload, type: string) => any,
 ): Subscription {
  return watchEvent(instanceAsEvent, watcher)
 }

 function subscribe(observer): Subscription {
  return watch(payload => observer.next(payload))
 }
 function prepend<Before>(fn: Before => Payload) {
  const contramapped: Event<Before> = eventFabric({
   name: `* → ${name}`,
   parent,
  })

  const computeCmd = Step.single(
   new Cmd.compute({
    reduce(_, newValue: Before, ctx) {
     return fn(newValue)
    },
   }),
  )
  const nextSeq = Step.seq([computeCmd, ...instanceAsEvent.graphite.seq.data])
  contramapped.graphite.next.data.add(nextSeq)
  return contramapped
 }

 return (instance: $todo)
}

declare function mapEvent<A, B>(event: Event<A>, fn: (_: A) => B): Event<B>
declare function mapEvent<A, B>(
 effect: Effect<A, any, any>,
 fn: (_: A) => B,
): Event<B>
function mapEvent<A, B>(event: Event<A> | Effect<A, any, any>, fn: A => B) {
 const mapped = eventFabric({
  name: `${event.shortName} → *`,
  parent: event.domainName,
 })
 const computeCmd = Step.single(
  new Cmd.compute({
   reduce(_, newValue: A, ctx) {
    return fn(newValue)
   },
  }),
 )
 const nextSeq = Step.seq([computeCmd, ...mapped.graphite.seq.data])
 event.graphite.next.data.add(nextSeq)
 return mapped
}

function filterEvent<A, B>(
 event: Event<A> | Effect<A, any, any>,
 fn: A => B | void,
): Event<B> {
 const mapped = eventFabric({
  name: `${event.shortName} →? *`,
  parent: event.domainName,
 })
 const computeCmd = Step.single(
  new Cmd.compute({
   reduce(_, newValue: A, ctx) {
    return fn(newValue)
   },
  }),
 )
 const filterCmd = Step.single(
  new Cmd.filter({
   filter(result, ctx: Ctx.emit) {
    return result !== undefined
   },
  }),
 )
 const nextSeq = Step.seq([computeCmd, filterCmd, ...mapped.graphite.seq.data])
 event.graphite.next.data.add(nextSeq)
 return mapped
}
export function watchEvent<Payload>(
 instanceAsEvent: Event<Payload>,
 watcher: (payload: Payload, type: string) => any,
): Subscription {
 const singleCmd = Step.single(
  new Cmd.run({
   runner(newValue: Payload) {
    return watcher(newValue, instanceAsEvent.getType())
   },
  }),
 )
 const sq = seq[1]()
 let runCmd
 let isWrited = false
 if (sq !== null) {
  if (sq.data.length > 0) {
   const last = sq.data[sq.data.length - 1]
   if (last.type === Step.MULTI) {
    last.data.add(singleCmd)
   } else {
    sq.data.push(singleCmd)
   }
   isWrited = true
  }
  runCmd = isWrited ? sq : Step.seq(sq.data.concat([singleCmd]))
 } else runCmd = singleCmd
 instanceAsEvent.graphite.next.data.add(runCmd)
 const unsubscribe = () => {
  instanceAsEvent.graphite.next.data.delete(runCmd)
 }
 unsubscribe.unsubscribe = () => {
  instanceAsEvent.graphite.next.data.delete(runCmd)
 }
 return unsubscribe
}
function makeName(name: string, compositeName?: CompositeName) {
 return [compositeName?.fullName, name].filter(Boolean).join('/')
}
