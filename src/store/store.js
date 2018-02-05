//@flow

import type {Stream} from 'most'

import {async as subject, type Subject} from 'most-subject'

import * as Carrier from '../carrier'
import type {Effect} from '../carrier/effect'
import {UniqGuard} from '../uniq'
import {type ID, createIDType, type SEQ, createSeq} from '../id'
import {effectFabric, eventFabric} from './fabric'

const nextID = createIDType()

export class Store<State> {
  uniq = new UniqGuard
  scope: string[]
  id: ID = nextID()
  seq: SEQ = createSeq()
  update$: Subject<$Exact<{
    state: State,
    data: Carrier.Carrier<any>
  }>> = subject()
  state$: Stream<State> = this.update$
    .map(({state}) => state)
    .multicast()
  getState: () => State
  dispatch: Function
  event<P>(
    description: string
  ): Carrier.Message<P, Carrier.Carrier<P>, State> {
    return eventFabric(description, this)
  }
  effect<Params, Done, Fail>(
    description: string
  ): Effect<Params, Done, Fail, State> {
    return effectFabric(
      description,
      this
    )
  }
  // epic
}

