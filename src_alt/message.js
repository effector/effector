//@flow

import observable$$ from 'symbol-observable'
import type {Subscriber, Subscription, Stream} from 'most'
import {from} from 'most'

import {assignInstance} from './fixtures'
import {registerType} from './register'
import {on} from './pubsub'
import {Act, type ActTag} from './act'

export class Message<P = mixed, Tag/*:ActTag*/ = 'act', A = Act<P, Tag>> {
  $call: P => A
  typeId: number
  used: number = 0
  actionType: string
  actionConstructor: (typeId: number, type: string, payload: P) => A
  actionDestructor: A => P
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
    actionConstructor: (typeId: number, type: string, payload: P) => A,
    actionDestructor: A => P,
  ): Message<P, Tag, A> {
    const {type, id} = registerType(description)
    this.actionType = type
    this.typeId = id
    this.actionConstructor = actionConstructor
    this.actionDestructor = actionDestructor
    function message(payload: P): A {
      this.used += 1
      return actionConstructor(this.typeId, this.actionType, payload)
    }
    const actionBind = message.bind(this)
    return assignInstance(actionBind, this)
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
  apply(that: any, args: [P]): A {
    return this.actionConstructor(
      this.typeId,
      this.actionType,
      args[0]
    )
  }
  subscribe(subscriber: Subscriber<P>): Subscription<P> {
    const {actionDestructor, typeId} = this
    const handler = (x: A) => subscriber.next(
      actionDestructor(x)
    )
    return {
      unsubscribe: on(typeId, handler)
    }
  }
  //$off
  [observable$$]() {
    return this
  }
  raw$(): Stream<A> {
    const {typeId} = this
    const obs = {
      subscribe(subscriber: Subscriber<A>): Subscription<A> {
        return {
          unsubscribe: on(typeId, e => subscriber.next(e))
        }
      },
      //$off
      [observable$$]() {
        return obs
      }
    }
    return from(obs).multicast()
  }
  // epic<R, State>(
  //   epic: (data$: Stream<P>, state$: Stream<State>) => Stream<R>
  // ): Stream<R> {

  // }
}

export function message<P>(name: string): Message<P, 'act', Act<P, 'act'>> {
  return new Message(
    name,
    (typeId, type, payload) => new Act(typeId, type, payload),
    (act) => act.payload
  )
}

