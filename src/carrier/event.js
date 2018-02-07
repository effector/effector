//@noflow

import {of, fromPromise, type Stream} from 'most'
// import type {Subject} from 'most-subject'

// import type {Named, Typed, WithStateLink, Emitter} from '../index.h'
// import {carrier, type Carrier} from './carrier'
import {type ID, createIDType} from '../id'
const nextID = createIDType()
// import {registerType} from './register'
// import {on} from './pubsub'
// import {Act, type ActTag} from './act'

import {check, add} from './register'

export function Event<P, C, State>(
  description: string,
  actionConstructor: (
    typeId: number,
    type: string,
    payload: P,
    dispatch: Function,
  ) => C,
) {

  this.id = nextID()
  this.used = 0
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

  function event(payload) {
    return event.run(payload)
  }
  Object.setPrototypeOf(event, Event.prototype)
  Object.assign(event, this)
  return event
}

Event.prototype.run = function run(payload: P): C {
  this.used += 1
  return this.actionConstructor(
    this.typeId,
    this.getType(),
    payload,
    e => this.emit(e)
  )
}

Event.prototype.getType = function getType() {
  return [...this.scope(), this.actionType].join('/')
}

Event.prototype.emit = function emit(value: any) {
  this.event$.next(value)
}

Event.prototype.apply = function apply(that: any, args: [P]): C {
  return this.run(args[0])
}

Event.prototype.watch = function watch<R>(
  handler: (data: P, state: State) => R
): Stream<R> {
  const result = this.epic(
    (data$) => watcher(data$, handler)
  )
  // result.observe(e => this.emit(e))
  return result
}

let id = 0


function watcher<P, State, R>(
  data$: Stream<$Exact<{data: P, state: State}>>,
  handler: (data: P, state: State) => R
): Stream<R> {
  return data$
    .map(
      async({data, state}) => {
        try {
          const result = await Promise.resolve(handler(data, state))
          return result
        } catch (error) {
          console.warn(`\n  Watcher throw\n  ${error && error.message || ''}`)
        }

      }
    )
    .map(fromPromise)
    .join()
}
