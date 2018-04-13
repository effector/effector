//@flow

import invariant from 'invariant'
import warning from '@effector/warning'
import {nextID, type ID} from '@effector/id'

import {State, type Event} from './state'

export type Filter<A, B> = (_: A, e: Event) => ?B
export type Catch = (e: Event) => Promise<void>
export type Handler</*::-*/ A> = (_: A, e: Event) => Promise<any>
export type Keeper</*::-*/ T> = (_: T, e: Event) => Promise<any>
export type DefaultKeeper = (_: Error, e: Event) => Promise<any>

class ActorPrivateMeta {
 keepBy: ?Actor<any> = null
 keeperFor: WeakMap<ID, DefaultKeeper> = new WeakMap()
 handlers: Set<Catch> = new Set()
 needReadIncoming: boolean = false
}

const actorPrivateMeta: WeakMap<ID, ActorPrivateMeta> = new WeakMap()
function getMeta(id: ID): ActorPrivateMeta {
 const meta = actorPrivateMeta.get(id)
 if (meta !== undefined) return meta
 const newMeta = new ActorPrivateMeta()
 actorPrivateMeta.set(id, newMeta)
 return newMeta
}

export class Actor<T> {
 /*::+*/ id: ID = nextID()
 state: State<T>
 get meta(): ActorPrivateMeta {
  return getMeta(this.id)
 }

 lookAfter(keeper: DefaultKeeper, actor: Actor<*>) {
  this.meta.keeperFor.set(actor.id, keeper)
  actor.meta.keepBy = this
 }
 async getState(): Promise<T> {
  const result: T = await Promise.resolve(this.state.state)
  return result
 }
 pushMessage(message: Event) {
  this.meta.needReadIncoming = true
  this.state.events.add(message)
 }
 async sendMessage(message: Event) {
  const messageValue: Event = await Promise.resolve(message)
  this.pushMessage(messageValue)
 }
 hasEvents() {
  return this.state.events.size > 0
 }
 * events(): Iterable<Event> {
  yield* this.state.events
 }
 * handlers(): Iterable<Catch> {
  yield* this.meta.handlers
 }
 async readIncoming(): Promise<void> {
  this.meta.needReadIncoming = false
  await Promise.all(readIncoming(this))
  if (this.meta.needReadIncoming) {
   return this.readIncoming()
  }
 }
 after<B>(fn: Filter<T, B>, handler: Handler<B>): this {
  const catcher = after(this, fn, handler)
  this.meta.handlers.add(catcher)
  return this
 }
}
function after<A, B>(
 actor: Actor<A>,
 fn: Filter<A, B>,
 handler: Handler<B>,
): Catch {
 async function runner(e: Event) {
  const state = await actor.getState()
  const filtered = fn(state, e)
  if (filtered == null) return
  const result = await handler(filtered, e)
 }
 async function onCatch(err): Promise<void> {
  const actorKeeper = actor.meta.keepBy
  if (actorKeeper == null) {
   warning(`Actor without actor-keeper`)
   return Promise.reject(err)
  }
 }

 return (e: Event) => runner(e).catch(onCatch)
}

async function reactsOnMessage<A>(
 actor: Actor<A>,
 event: Event,
): Promise<void> {
 const reactions: Array<Promise<void>> = []
 const savedHandlers = [...actor.handlers()]
 const newHandlers: Set<Catch> = new Set()
 for (const catcher of actor.meta.handlers) {
  if (savedHandlers.includes(catcher)) {
   reactions.push(catcher(event))
  } else {
   newHandlers.add(catcher)
  }
 }
 let voids = await Promise.all(reactions)
 if (newHandlers.size === 0) return
 const newReactions: Array<Promise<void>> = []
 for (const catcher of [...newHandlers]) {
  newReactions.push(catcher(event))
 }
 voids = await Promise.all(newReactions)
}

function* readIncoming<A>(actor: Actor<A>): Iterable<Promise<void>> {
 const events = [...actor.events()]
 for (const e of events) {
  actor.state.events.delete(e)
  yield reactsOnMessage(actor, e)
 }
}

declare export function createActor<A, B, C>(value: [A, B, C]): Actor<[A, B, C]>
declare export function createActor<A, B>(value: [A, B]): Actor<[A, B]>
declare export function createActor<A>(value: A): Actor<A>
export function createActor<T>(value: T): Actor<T> {
 const state: State<T> = new State(value, new Set())
 const actor: Actor<T> = new Actor()
 actor.state = state
 return actor
}
