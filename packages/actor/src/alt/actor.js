//@flow

import invariant from 'invariant'
import type {
 OpaqueActor,
 OpaqueObserver,
 OpaqueHandler,
 OpaqueSeq,
} from './index.h'

import {seq} from './seq'

import {PlainActorSystem, defaultActorSystem} from './system'

export class Quant {
 /*::+*/ id: number = ++Quant.id
 static id = 0
 value: any
 constructor(value: any = null) {
  this.value = value
  //$off
  Object.defineProperties(this, {
   get: {
    value: this.get.bind(this),
    configurable: true,
    writable: true,
   },
   set: {
    value: this.set.bind(this),
    configurable: true,
    writable: true,
   },
  })
 }
 get() {
  return this.value
 }
 set(value: any) {
  if (value === this) return
  this.value = value
 }
 map(fn: any => any): Quant {
  return new Quant(fn(this.get()))
 }
}

export function createQuant(value: any = null) {
 return new Quant(value)
}

// const createSeqFromHandler = (handler: OpaqueHandler): OpaqueSeq =>
//  new Set([handler])
// function createHandlerFromSeq(seq: OpaqueSeq): OpaqueHandler {
//  return (context: any, event: OpaqueEvent, meta: any) => {
//   let currentMeta = meta
//   for (const handler of seq) {
//    currentMeta = handler(context, event, currentMeta)
//   }
//   return currentMeta
//  }
// }

export class OpaqueEvent {
 /*::+*/ id: number = ++OpaqueEvent.id
 type: any
 /*::+*/ payload: Quant
 meta: any
 static id = 0
 constructor(type: any, payload: Quant, meta: any) {
  this.type = type
  this.payload = payload
  this.meta = meta
 }
 valueOf() {
  return {
   id: this.id,
   payload: this.payload.get(),
   type: this.type,
  }
 }
}
export type Reducer = (
 state: any,
 event: OpaqueEvent,
 setState: (value: any) => void,
) => void
export class EventFabric {
 /*::+*/ id: number = ++EventFabric.id
 type: any
 subscribers: Set<PlainActor> = new Set()
 static id = 0
 constructor(type: any) {
  this.type = type
 }
 create(
  payload: any,
  meta: any,
  system: PlainActorSystem = defaultActorSystem,
 ) {
  const box = new Quant(payload)
  const event = new OpaqueEvent(this.type, box, meta)
  // console.error(box, event)
  invariant(event.payload, 'no payload')
  for (const actor of this.subscribers) {
   dispatch(event, actor, system)
  }
  seq(system)
  return event
 }
 add(actor: PlainActor) {
  this.subscribers.add(actor)
 }
}

export function createEvent<T>(type: T) {
 return new EventFabric(type)
}

export {createEvent as createEventFabric}

export function createActor(state: any) {
 return new PlainActor(state)
}

export class PlainActor {
 /*::+*/ state: Quant
 inbox: Set<OpaqueEvent>
 reducer: Set<*>
 //  childActors: Set<OpaqueActor>
 constructor(
  state: any,
  reducer: Set<Reducer> = new Set(),
  inbox: Set<OpaqueEvent> = new Set(),
  // childActors: Set<OpaqueActor> = new Set(),
 ) {
  const newState = state instanceof Quant ? state : new Quant(state)
  this.state = newState
  this.reducer = reducer
  this.inbox = inbox
  // this.childActors = childActors
 }
 getState(): any {
  return this.state.get()
 }
 replaceReducer(fn: (reducer: Set<Reducer>) => Set<Reducer>) {
  this.reducer = fn(this.reducer)
 }
 addReducer(reducer: Reducer) {
  this.replaceReducer(_ => _.add(reducer))
 }
 //  dispatch(event: OpaqueEvent, system: PlainActorSystem = defaultActorSystem) {
 //   dispatch(event, this, system)
 //  }
 //  subscribe(observer: OpaqueObserver): void {}
}

export function dispatch(
 event: OpaqueEvent,
 actor: PlainActor,
 system: PlainActorSystem = defaultActorSystem,
) {
 system.pending.add(actor)
 actor.inbox.add(event)
}
