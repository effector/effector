//@flow

import invariant from 'invariant'

import {seq} from './seq'

import {PlainActorSystem, defaultActorSystem} from './system'

import {
 createEventFabric,
 EventFabric as OpaqueEventFabric,
 createActor,
 createQuant,
 PlainActor,
 OpaqueEvent,
 Quant,
 dispatch,
} from './actor'

/*::
interface IterableInterface<T> {
  iter(): Iterable<T>,
  // @@iterator(): Iterable<T>,
}
type IterableInstance<T> = {
  iter(): Iterable<T>,
};
type IteratorInstance<T> = {
  iter(): Iterable<T>,
  @@iterator(): Iterator<T>,
};
*/

export class Event<T> extends OpaqueEvent {
 /*::+*/ payload: Atom<T>
 constructor(type: string, value: T) {
  const data = value instanceof Atom ? value : new Atom(value)
  super(type, data)
 }
}

export type TypedReducer<S, E> = (
 state: S,
 event: Event<E> | *,
 setState: (state: S) => void,
) => void

// declare function iter<T>(
//  Statics: Class<IterableInstance<T>>,
// ): Class<IteratorInstance<T>>
// function iter<T>(
//  Statics: Class<IterableInstance<T>>,
// ): Class<IterableInstance<T>> {
//  Statics.prototype[Symbol.iterator] = function iterator() {
//   return this.iter()
//  }
//  return Statics
// }

export class Atom<T> extends Quant {
 /*::
  +@@iterator: *;
  +iter: () => *;
  */
 constructor(value: T) {
  super(value)
 }
 //$off
 * [Symbol.iterator]() {
  yield* this.iter()
 }
 get(): T {
  return super.get()
 }
 set(value: T) {
  return super.set(value)
 }
}

export class EventFabric<T> extends OpaqueEventFabric {
 /*::+*/ Event: Class<Event<T>>
 constructor(type: string) {
  super(type)
  class TypedEvent extends Event<T> {}
  this.Event = TypedEvent
 }
 create(
  payload: T,
  meta: any,
  system: PlainActorSystem = defaultActorSystem,
 ): Event<T> {
  const {Event} = this
  // const box = new Atom(payload)
  // console.error(payload)
  const event = new Event(this.type, payload)
  //$todo
  event.payload = new Atom(payload)
  // console.log(event)
  invariant(event.payload, 'no payload')
  for (const actor of this.subscribers) {
   dispatch(event, actor, system)
  }
  seq(system)
  return event
 }
 //  create(payload: T): Event<T> {
 //   const opaqueEvent = super.create(payload)
 //   invariant(opaqueEvent instanceof Event, 'wrong subclass')
 //   return opaqueEvent
 //  }
 is(event: Event<any>) {
  return event instanceof this.Event
 }
}

// export function createEvent<T>(type: string, value: T): Event<T> {
//  return new Event(type, value)
// }

export function eventFabric<T>(type: string): EventFabric<T> {
 return new EventFabric(type)
}

export class Actor<T> extends PlainActor {
 /*::+*/ state: Atom<T>
 inbox: Set<Event<any> | *>
 reducer: Set<TypedReducer<T, any>>
 //  childActors: Set<OpaqueActor>
 constructor(
  state: Atom<T>,
  reducer: Set<TypedReducer<T, any>> = new Set(),
  inbox: Set<Event<any>> = new Set(),
  // childActors: Set<OpaqueActor> = new Set(),
 ) {
  super(state)
  this.state = state
  this.reducer = reducer
  this.inbox = inbox
  // this.childActors = childActors
 }
 getState(): T {
  return this.state.get()
 }
 replaceReducer(
  fn: (reducer: Set<TypedReducer<T, any>>) => Set<TypedReducer<T, any>>,
 ) {
  this.reducer = fn(this.reducer)
 }
 addReducer(reducer: TypedReducer<T, *>) {
  this.replaceReducer(_ => _.add(reducer))
 }
 on<S>(
  eventCreator: EventFabric<S> | Iterable<EventFabric<S>>,
  handler: TypedReducer<T, S>,
 ): this {
  const fabric: Array<EventFabric<S>> =
   eventCreator instanceof EventFabric ? [eventCreator] : [...eventCreator]
  for (const fab of fabric) fab.add(this)
  const isEvent = _ => fabric.some(fab => fab.is(_))
  this.addReducer((state, event: Event<S>, setState) => {
   //  console.trace('addRed')
   //  console.log(`\n\n\n`, state, event)
   if (isEvent(event)) {
    handler(state, event, setState)
   }
  })
  return this
 }
 raise<E, S>(value: E, fabric: EventFabric<E>, actor: Actor<S>) {
  dispatch(fabric.create(value), actor)
 }

 //  dispatch(event: OpaqueEvent, system: PlainActorSystem = defaultActorSystem) {
 //   dispatch(event, this, system)
 //  }
 //  subscribe(observer: OpaqueObserver): void {}
}

export function createActorState<T>(value: T): Actor<T> {
 return new Actor(new Atom(value))
}
