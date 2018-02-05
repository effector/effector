//@flow

// import observable$$ from 'symbol-observable'
import type {Dispatch} from 'redux'
import type {Subscriber, Subscription, Stream} from 'most'
import {from} from 'most'

import {type ID, createIDType} from '../id'
const nextID = createIDType()
// import {registerType} from './register'
// import {on} from './pubsub'
// import {Act, type ActTag} from './act'

import {check, add} from './register'
import * as Carrier from './carrier'

let id = 0

export type EpicF<P, State, R> = (
  data$: Stream<$Exact<{data: P, state: State}>>,
  state$: Stream<State>
) => Stream<R>


export class Message<P, C, State = any> {
  // $call: P => Carrier.Carrier<C>
  id: ID = nextID()
  typeId: number
  used: number = 0
  actionType: string
  actionConstructor: (
    typeId: number,
    type: string,
    payload: P,
    dispatch: Function
  ) => C
  getType() {
    return this.actionType
  }
  toString() {
    return this.getType()
  }
  inspect() {
    return `Message #${this.typeId} { type: ${this.actionType}, used: ${this.used} }`
  }
  constructor(
    description: string,
    actionConstructor: (
      typeId: number,
      type: string,
      payload: P,
      dispatch: Function,
    ) => C,
  ) {
    const isSerializable = (typeof description === 'string')
      && /^[0-9A-Z_]+$/.test(description)
    if (isSerializable) {
      check(description)
      add(description)
    } else {
      ++id
    }
    this.actionType = description
    this.typeId = id
    this.actionConstructor = actionConstructor
  }
  /**
   * Redux will do
   *
   *     dispatch(actionCreator.apply(undefined, arguments))
   *
   * @param {*} that
   * @param {[P]} args
   * @returns {A}
   * @memberof Message
   */
  apply(that: any, args: [P]): C {
    return this.actionConstructor(
      this.typeId,
      this.actionType,
      args[0],
      () => {}
    )
  }
  // subscribe(subscriber: Subscriber<P>): Subscription<P> {
  //   const {actionDestructor, typeId} = this
  //   const handler = (x: A) => subscriber.next(
  //     actionDestructor(x)
  //   )
  //   return {
  //     unsubscribe: on(typeId, handler)
  //   }
  // }
  //$off
  // [observable$$]() {
  //   return this
  // }
  epic: <R>(
    epic: EpicF<P, State, R>
  ) => Stream<R>
}
declare function ident<T>(x: T): T
export function message<P>(
  name: string,
  dispatch: typeof ident,
): Message<P, Carrier.Carrier<P>> {
  const msg = new Message(
    name,
    Carrier.carrier
  )
  function messageCarrier(payload: P): Carrier.Carrier<P> {
    msg.used += 1
    return msg.actionConstructor(
      msg.typeId,
      msg.actionType,
      payload,
      dispatch
    )
  }
  const actionBind: any = messageCarrier.bind(msg)
  Object.setPrototypeOf(actionBind, msg)
  return actionBind
}

