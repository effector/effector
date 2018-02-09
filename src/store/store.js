//@flow

import type {Stream} from 'most'

import {async as subject, type Subject} from 'most-subject'

import type {Carrier, Event} from '../carrier'
import type {Effect} from '../carrier/effect'
import {UniqGuard} from '../uniq'
import {type ID, createIDType, type SEQ, createSeq} from '../id'
import {effectFabric, eventFabric} from './fabric'
import type {Named, WithStateLink, Dispatcher, Emitter, EventRunner} from '../index.h'
import {Domain} from '../domain'
import {storeInjector} from '../inject-reducer'

const nextID = createIDType()

export class Store<State>
implements Named, WithStateLink<State>, Dispatcher, EventRunner<State> {
  uniq = new UniqGuard
  injector: * = storeInjector()
  scopeName: string[]
  * scope(): Iterable<string> {
    yield* this.scopeName
  }
  id: ID = nextID()
  seq: SEQ = createSeq()
  update$: Subject<$Exact<{
    state: State,
    data: Carrier<any>
  }>> = subject()
  // state$: Subject<State> = subject()
  state$: Stream<State> = this.update$
    .map(({state}) => state)
    .multicast()
  getState(): Stream<State> {
    return this.state$
  }
  stateGetter: () => State
  reduxSubscribe: (handler: (action: any) => void) => any
  dispatch: Function
  dispatch$: Subject<any> = (() => {
    const subj = subject()
    subj.skipRepeats().observe((e) => {
      if (isAction(e))
        this.dispatch(e)
    })
    return subj
  })()
  mergeEvents(emitter: Emitter) {
    // emitter.event$ = subject()
    // emitter.event$.observe(e => this.dispatch$.next(e))
    emitter.event$ = this.dispatch$
  }
  event<P>(
    description: string
  ): Event<P, Carrier<P>, State> {
    const result = eventFabric(description, this)
    // this.mergeEvents(result)
    return result
  }
  effect<Params, Done, Fail>(
    description: string
  ): Effect<Params, Done, Fail, State> {
    const result = effectFabric(
      description,
      this
    )
    // this.mergeEvents(result)
    return result
  }
  subdomain(name: string): Store<State> {
    const result = new Store
    result.dispatch = this.dispatch
    result.stateGetter = this.stateGetter
    result.reduxSubscribe = this.reduxSubscribe
    result.dispatch$ = this.dispatch$
    result.scopeName = [...this.scopeName, name]
    result.injector = this.injector
    result.getState = this.stateGetter
    result.subscribe = this.reduxSubscribe
    result.replaceReducer = this.replaceReducer
    return result
  }
  connect(domain: Domain<State>) {
    domain.dispatch = this.dispatch
    domain.stateGetter = this.stateGetter
    domain.reduxSubscribe = this.reduxSubscribe
    domain.dispatch$ = this.dispatch$
    domain.scopeName = [...this.scope(), domain.domainName]
    domain.injector = this.injector
    // domain.getState = this.stateGetter
    domain.subscribe = this.reduxSubscribe
    domain.replaceReducer = this.replaceReducer
  }
}

export function hideProperties<State>(store: Store<State>): Store<State> {
  const {dispatch$, update$, state$} = store
  Object.defineProperties(store, {
    dispatch$: {
      value: dispatch$,
      ...nonEnumProp,
    },
    update$: {
      value: update$,
      ...nonEnumProp,
    },
    state$: {
      value: state$,
      ...nonEnumProp,
    }
  })
  return store
}

const nonEnumProp = {
  writable: true,
  enumerable: false,
  configurable: true,
}

function isAction(value: mixed): boolean /*::%checks*/ {
  return (
    typeof value === 'object'
    && value != null
    && typeof value.type === 'string'
    && value.type.length > 0
  )
}
