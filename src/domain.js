//@flow
import {async as subject, type Subject} from 'most-subject'
import type {Stream} from 'most'

import type {Carrier, Event} from './carrier'
import type {Effect} from './carrier/effect'
import {effectFabric, eventFabric} from './store/fabric'
import type {Named, WithStateLink, Dispatcher, Emitter, EventRunner} from './index.h'
import {type ID, createIDType} from './id'

const nextID = createIDType()

export class Domain<State> implements Named, Dispatcher, EventRunner<State> {
  domainName: string
  id: ID = nextID()
  scopeName: string[]
  * scope(): Iterable<string> {
    yield* this.scopeName
    yield this.domainName
  }
  update$: Subject<$Exact<{
    state: State,
    data: Carrier<any>
  }>> = subject()
  state$: Stream<State> = this.update$
    .map(({state}) => state)
    .multicast()
  getState(): Stream<State> {
    return this.state$
  }
  dispatch: (value: any) => any
  dispatch$: Subject<any> = (() => {
    const subj = subject()
    subj.skipRepeats().observe((e) => {
      if (isAction(e))
        this.dispatch(e)
    })
    return subj
  })()
  mergeEvents(emitter: Emitter) {
    emitter.event$ = this.dispatch$
  }
  effect<Params, Done, Fail>(
    description: string
  ): Effect<Params, Done, Fail, State> {
    const result = effectFabric(
      description,
      this
    )
    return result
  }
  event<P>(
    description: string
  ): Event<P, State> {
    const result = eventFabric(description, this)
    // this.mergeEvents(result)
    return result
  }
  connect(domain: Domain<State>) {
    domain.dispatch = this.dispatch
    domain.stateGetter = this.stateGetter
    domain.reduxSubscribe = this.reduxSubscribe
    domain.dispatch$ = this.dispatch$
    domain.scopeName = [...this.scope(), domain.domainName]
    // domain.injector = this.injector
    // domain.getState = this.stateGetter
    domain.subscribe = this.subscribe
    // domain.replaceReducer = this.replaceReducer
  }
}


export function createDomain<State>(name: string): Domain<State> {
  const result = new Domain
  result.domainName = name
  return result
}

function isAction(value: mixed): boolean /*::%checks*/ {
  return (
    typeof value === 'object'
    && value != null
    && typeof value.type === 'string'
    && value.type.length > 0
  )
}
