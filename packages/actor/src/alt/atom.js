//@flow

import invariant from 'invariant'

import {
 createEventFabric,
 EventFabric as OpaqueEventFabric,
 createActor,
 createQuant,
 PlainActor,
 OpaqueEvent,
 Quant,
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
  super(type, new Atom(value))
 }
}

export type TypedReducer<S, E> = (
 state: S,
 event: Event<E> | *,
 setState: (state: S) => void,
) => void

declare function iter<T>(
 Statics: Class<IterableInstance<T>>,
): Class<IteratorInstance<T>>
function iter<T>(
 Statics: Class<IterableInstance<T>>,
): Class<IterableInstance<T>> {
 Statics.prototype[Symbol.iterator] = function iterator() {
  return this.iter()
 }
 return Statics
}

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
 /*::+*/ Event: Class<Event<T>> = class extends Event<T> {}
 constructor(type: string) {
  super(type)
 }
 eventCreator(): Class<Event<T>> {
  return this.Event
 }
 create(payload: T): Event<T> {
  const opaqueEvent = super.create(payload)
  invariant(opaqueEvent instanceof Event, 'wrong subclass')
  return opaqueEvent
 }
 is(event: Event<any>) {
  return event instanceof this.Event
 }
}

export function createEvent<T>(type: string, value: T): Event<T> {
 return new Event(type, value)
}

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
 on<S>(fabric: EventFabric<S>, handler: TypedReducer<T, S>): this {
  fabric.add(this)
  this.addReducer((state, event: Event<S>, setState) => {
   if (fabric.is(event)) {
    handler(state, event, setState)
   }
  })
  return this
 }

 //  dispatch(event: OpaqueEvent, system: PlainActorSystem = defaultActorSystem) {
 //   dispatch(event, this, system)
 //  }
 //  subscribe(observer: OpaqueObserver): void {}
}

export function createActorState<T>(value: T): Actor<T> {
 return new Actor(new Atom(value))
}
