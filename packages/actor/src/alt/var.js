//@flow

import {createActorState, type EventFabric, type Actor} from './atom'

import {createAVar} from '@effector/avar'
import type {AVar} from '@effector/avar'

type Action<A> = {type: string, payload: A}

// const logGroup: Function = function logGroup() {}

function syncSetter<T>(
 reducer: *,
 state,
 act,
 avar: AVar<T>,
 setState: T => void,
) {
 const result = reducer(state, act, (_: T) => {
  if (avar.status().filled) avar.tryTake()
  //  const isPut = avar.tryPut(_)
  //  invariant(isPut, 'put unavailable')
  setState(_)
  // logGroup('sync setter', [
  //  ['state before', 'action', 'state after'],
  //  [state, act, avar.tryRead()],
  // ])
 })
 console.log(result)
}
async function asyncSetter<T>(
 reducer: *,
 act,
 avar: AVar<T>,
 setState: T => void,
) {
 // throw new Error('no async')
 const state = await avar.asyncTake()
 const payload = await new Promise(_ =>
  reducer(state, act, val => (setState(val), _(val))),
 )
 // setState(payload)
 //  logGroup('async setter', [
 //   ['state before', 'action', 'payload', 'state after'],
 //   [state, act, payload, avar.tryRead()],
 //  ])

 // setState(avar)
}
export class ActorVar<T> {
 /*::;+*/ avar: AVar<T> = createAVar()
 /*::;+*/ actor: Actor<AVar<T>> = createActorState(this.avar)
 constructor(value?: T) {
  if (value !== undefined) this.avar.tryPut(value)
 }
 on<E>(
  event: EventFabric<E>,
  reducer: (state: T, action: Action<E>, setState: (T) => void) => any,
 ): this {
  this.actor.on(event, (state: AVar<T>, data, setState) => {
   const setter = (_: T) => {
    // logGroup('setter', ['_', _])
    state.asyncPut(_)
    //  setState(state)
    //  state.asyncReplace(_).then(() => {
    //   setState(state)
    //  })
   }
   const stateValue = state.tryTake()
   const act = data.raw()
   //  logGroup('unwrapReducer', [['state', 'action'], [stateValue, act]])
   if (stateValue !== null && stateValue !== undefined) {
    return syncSetter(reducer, stateValue, act, state, setter)
   }
   asyncSetter(reducer, act, state, setter)
  })
  //  event.add(this.actor)
  return this
 }
 status() {
  return this.avar.status()
 }
 take(): Promise<T> {
  return this.avar.asyncTake()
 }
 read(): Promise<T> {
  return this.avar.asyncRead()
 }
 put(value: T): Promise<T> {
  return this.avar.asyncPut(value)
 }
 readSync(): T | null {
  return this.avar.tryRead()
 }
 takeSync(): T | null {
  return this.avar.tryTake()
 }
 putSync(value: T): boolean {
  return this.avar.tryPut(value)
 }
}

export function createActor<T>(value?: T): ActorVar<T> {
 return new ActorVar(value)
}
