//@flow

import invariant from 'invariant'
import warning from '@effector/warning'
import {nextID, type ID} from '@effector/id'

import type {
 Filter,
 Handler,
 Event,
 Catch,
 DefaultKeeper,
 ActorPrivateMeta,
} from './index.h'
import {getMeta} from './meta'

export class Actor<T> {
 /*::+*/ id: ID = nextID()
 state: T
 get meta(): ActorPrivateMeta {
  return getMeta(this.id)
 }

 lookAfter<S>(keeper: DefaultKeeper<T>, actor: Actor<S>) {
  this.meta.keeperFor.set(actor.id, keeper)
  actor.meta.keepBy = this
 }
 async getState(): Promise<T> {
  const result: T = await Promise.resolve(this.state)
  return result
 }

 async sendMessage(message: Event, target: Actor<any> = this) {
  const messageValue: Event = await Promise.resolve(message)
  InboxMediator.add(messageValue, target)
 }
 * events(): Iterable<Event> {
  yield* this.meta.incoming
 }
 * handlers(): Iterable<Catch> {
  yield* this.meta.handlers
 }
 readIncoming(): Promise<void> {
  return InboxMediator.readIncoming(this)
 }
 after<B>(selector: Filter<T, B>, handler: Handler<B, T>): this {
  const catcher = after(this, selector, handler)
  HandlerMediator.add(catcher, this)
  return this
 }
 saveHandlers() {
  HandlerMediator.moveNew(this)
 }
}

export async function readAllIncoming(actors: Iterable<Actor<any>>) {
 const list = [...actors]
 const isComplete = () =>
  list.every(
   actor =>
    actor.meta.newIncoming.size === 0 && actor.meta.newHandlers.size === 0,
  )
 do {
  for (const actor of actors) {
   await actor.readIncoming()
  }
 } while (!isComplete())
}

const HandlerMediator = {
 has<A>(handler: Catch, actor: Actor<A>, meta = actor.meta) {
  return meta.handlers.has(handler) || meta.newHandlers.has(handler)
 },
 add<A>(handler: Catch, actor: Actor<A>, meta = actor.meta) {
  if (HandlerMediator.has(handler, actor, meta)) return
  meta.newHandlers.add(handler)
 },
 moveNew<A>(actor: Actor<A>, meta = actor.meta) {
  if (meta.newHandlers.size === 0) return
  for (const handler of meta.newHandlers) {
   meta.handlers.add(handler)
  }
  meta.newHandlers.clear()
 },
}

const InboxMediator = {
 //  has(event: Event, actor: Actor<*>, meta = actor.meta) {
 //   return meta.newIncoming.has(event) || meta.incoming.has(event)
 //  },
 add<A>(event: Event, actor: Actor<A>, meta = actor.meta) {
  // if (InboxMediator.has(event, actor, meta)) return
  meta.newIncoming.add(event)
 },
 moveNew<A>(actor: Actor<A>, meta = actor.meta) {
  meta.incoming.clear()
  if (meta.newIncoming.size === 0) return
  for (const incoming of meta.newIncoming) {
   meta.incoming.add(incoming)
  }
  meta.newIncoming.clear()
 },
 async readIncoming<A>(actor: Actor<A>, meta = actor.meta): Promise<void> {
  invariant(meta.incoming.size === 0, 'need to read previous incoming messages')
  const events = []
  do {
   HandlerMediator.moveNew(actor, meta)
   InboxMediator.moveNew(actor, meta)

   const handlers = [...actor.handlers()]

   for (const e of [...actor.events()]) {
    const promises = []
    events.push(e)
    for (const handler of handlers) {
     promises.push(handler(e))
    }
    await Promise.all(promises)
   }
   //  console.log(meta)
   const newHandlers = [...meta.newHandlers]
   InboxMediator.moveNew(actor, meta)
   HandlerMediator.moveNew(actor, meta)
   if (newHandlers.length > 0) {
    for (const e of events) {
     const additionalPromises = []
     for (const handler of newHandlers) {
      additionalPromises.push(handler(e))
     }
     await Promise.all(additionalPromises)
    }
   }
  } while (meta.newIncoming.size > 0)
 },
}

function after<A, B>(
 actor: Actor<A>,
 fn: Filter<A, B>,
 handler: Handler<B, A>,
): Catch {
 async function runner(e: Event) {
  const state = await actor.getState()
  const filtered = fn(state, e)
  // console.log(filtered)
  if (filtered === null || filtered === undefined) return
  const result = await handler(filtered, e, actor)
 }
 async function onCatch(err): Promise<void> {
  const actorKeeper = actor.meta.keepBy
  if (actorKeeper === null || actorKeeper === undefined) {
   warning(`Actor without actor-keeper`)
   return Promise.reject(err)
  }
 }

 return (e: Event) => runner(e).catch(onCatch)
}

declare export function createActor<A, B, C>(value: [A, B, C]): Actor<[A, B, C]>
declare export function createActor<A, B>(value: [A, B]): Actor<[A, B]>
declare export function createActor<A>(value: A): Actor<A>
export function createActor<T>(value: T): Actor<T> {
 const actor: Actor<T> = new Actor()
 actor.state = value
 return actor
}
