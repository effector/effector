//@flow

import {from, of, fromPromise, type Stream} from 'most'
// import type {Subject} from 'most-subject'

// import type {Named, Typed, WithStateLink, Emitter} from '../index.h'
import type {EpicFun} from '../index.h'
import {carrier, type Carrier} from './carrier'
import {type ID, createIDType} from '../id'
import {BareEvent} from './bare-event'
const nextID = createIDType()
// import {registerType} from './register'
// import {on} from './pubsub'
// import {Act, type ActTag} from './act'

import {add} from './register'

export class Event<P, State = any> extends BareEvent<P, Carrier<P>> {
  $call: P => Carrier<P>
  id: ID = nextID()
  used: number = 0
  dispatch: (x: Carrier<P>) => Carrier<P>
  constructor(
    description: string
  ) {
    super()
    const isSerializable = (typeof description === 'string')
      && /^[0-9A-Z_]+$/.test(description)
    if (isSerializable) {
      add(description)
    }
  }

  run(payload: P): Carrier<P> {
    this.used += 1
    return carrier(
      this.id,
      this.getType(),
      payload,
      this.dispatch
    )
  }

  watch<R>(
    handler: (data: P, state: State) => R
  ): Stream<R> {
    const result = this.epic(
      (data$, state$) => watcher(data$, state$, handler)
    )
    // result.observe(e => console.log(e))
    // result.observe(e => this.emit(e))
    return result
  }
  epic: <R>(epic: EpicFun<P, State, R>) => Stream<R>
}

function watcher<P, State, R>(
  data$: Stream<$Exact<{data: P, state: State}>>,
  state$: Stream<State>,
  handler: (data: P, state: State) => R
): Stream<R> {
  return data$
    .map(
      async({data, state}): Promise<Stream<R>> => {
        try {
          const handled = handler(data, state)
          let result: R
          if (handled != null && typeof handled.then === 'function')
            result = await handled
          else
            result = handled
          return of(result)
        } catch (error) {
          console.warn(`\n  Watcher throw\n  ${error && error.message || ''}`)
          const none: R[] = []
          return from(none)
        }
      }
    )
    .map(fromPromise)
    .join()
    .join()
}
