//@flow

// import invariant from 'invariant'
import $$observable from 'symbol-observable'
import {from, type Stream} from 'most'
import type {Event, Effect, GraphiteMeta} from '../effector/index.h'
import * as Kind from '../kind'
import {setProperty} from '../setProperty'

import * as Cmd from '../effector/datatype/cmd'
import * as Step from '../effector/datatype/step'
import {walkEvent} from '../effector/graphite/walk'

export function eventFabric<Payload>({
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
 instance.shortName = name
 instance.domainName = domainName

 function map<Next>(fn: Payload => Next): Event<Next> {
  return mapEvent(instanceAsEvent, fn)
 }

 function epic<T>(fn: (Stream<Payload>) => Stream<T>): Event<T> {
  const instance$ = from(instanceAsEvent).multicast()
  const epic$ = fn(instance$).multicast()
  const mapped = eventFabric({name: `${name}$ ~> *`, domainName})
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
 function prepend<Before>(fn: Before => Payload) {
  const contramapped: Event<Before> = eventFabric({
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
  Cmd.compute({
   reduce(_, newValue: A, ctx) {
    return fn(newValue)
   },
  }),
 )
 const nextSeq = Step.seq([computeCmd, ...mapped.graphite.seq.data])
 event.graphite.next.data.add(nextSeq)
 return mapped
}

function makeName(name, domainName) {
 return [name, domainName].filter(str => str.length > 0).join('/')
}
