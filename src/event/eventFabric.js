//@flow

// import invariant from 'invariant'
import warning from 'warning'
import $$observable from 'symbol-observable'
import {from, type Stream} from 'most'
import type {GraphiteMeta, Subscription} from '../effector/index.h'
import type {Event} from './index.h'
import type {Store} from 'effector/store'
import type {Effect} from 'effector/effect'
import * as Kind from '../kind'
import {setProperty} from '../setProperty'

import * as Cmd from 'effector/datatype/cmd'
import * as Ctx from 'effector/datatype/context'
import * as Step from 'effector/datatype/step'
import {walkEvent, frame, seq} from 'effector/graphite'
import {eventRefcount} from '../refcount'
import {type CompositeName, createName} from '../compositeName'

export function eventFabric<Payload>({
 name: nameRaw,
 domainName,
 parent,
}: {
 name?: string,
 domainName: string,
 parent?: CompositeName,
}): Event<Payload> {
 const id = eventRefcount()
 const name = nameRaw || id
 const fullName = makeName(name, domainName)
 const compositeName = createName(name, parent)
 const cmd = new Cmd.Emit({
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

 setProperty('create', create, instance)

 setProperty('toString', getType, instance)
 setProperty('getType', getType, instance)
 setProperty('kind', Kind.EVENT, instance)
 setProperty($$observable, () => instance, instance)
 instance.id = id
 instance.watch = watch
 instance.map = map
 instance.prepend = prepend
 instance.subscribe = subscribe
 instance.to = to
 instance.epic = epic
 instance.shortName = name
 instance.domainName = domainName
 instance.compositeName = compositeName
 instance.filter = filter
 function filter<Next>(fn: Payload => Next | void): Event<Next> {
  return filterEvent(instanceAsEvent, fn)
 }

 function map<Next>(fn: Payload => Next): Event<Next> {
  return mapEvent(instanceAsEvent, fn)
 }

 function epic<T>(fn: (Stream<Payload>) => Stream<T>): Event<T> {
  warning(false, '.epic is deprecated, use from(event) of Observable.of(event)')
  const instance$ = from(instanceAsEvent).multicast()
  const epic$ = fn(instance$).multicast()
  const mapped = eventFabric({name: `${name}$ ~> *`, domainName})
  epic$.observe(e => {
   mapped.create(e, fullName)
  })
  return mapped
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
    throw new TypeError(`Unsupported kind`)
   }
  }
 }

 function create(payload, fullName) {
  walkEvent(payload, instanceAsEvent)
  return payload
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
   domainName,
  })

  const computeCmd = Step.single(
   new Cmd.Compute({
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
  return compositeName.fullName
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
  domainName: event.domainName,
 })
 const computeCmd = Step.single(
  new Cmd.Compute({
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
  domainName: event.domainName,
 })
 const computeCmd = Step.single(
  new Cmd.Compute({
   reduce(_, newValue: A, ctx) {
    return fn(newValue)
   },
  }),
 )
 const filterCmd = Step.single(
  new Cmd.Filter({
   filter(result, ctx: Ctx.EmitContext) {
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
  new Cmd.Run({
   runner(newValue: Payload) {
    return watcher(newValue, instanceAsEvent.getType())
   },
  }),
 )
 const sq = seq.get()
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
function makeName(name, domainName) {
 return [domainName, name].filter(str => str.length > 0).join('/')
}
