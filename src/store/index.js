//@flow

import {
  createStore,
  applyMiddleware,
  type Reducer,
  type Middleware,
  type Dispatch,
} from 'redux'
import type {Stream} from 'most'

import {async as subject, type Subject} from 'most-subject'

import * as Carrier from '../carrier'
import {type Effect, effect} from '../carrier/effect'
import {UniqGuard} from '../uniq'
import {Dispose, Defer} from '../defer'
import {Lens} from '../lens'
import {type ID, createIDType, type SEQ, createSeq, incSeq} from '../id'

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
    const {scope, state$, update$, dispatch} = this
    const text = [...scope, description].join('/')
    const result = Carrier.message(text, dispatch)
    const epic$: Stream<$Exact<{
      state: State,
      data: Carrier.Carrier<P>
    }>> = update$
      .filter(
        ({data}) => data.typeId === result.typeId
      )
      .multicast()
    const payload$: Stream<$Exact<{
      state: State,
      data: P
    }>> = epic$
      .map(({data, state}) => ({data: data.payload, state}))
      .multicast()
    //$off
    result.epic$ = epic$
    result.epic = function<R>(epic: Carrier.EpicF<P, State, R>): Stream<R> {
      const result = epic(payload$, state$)
      result.observe(resultObserver)
      return result

      function resultObserver(value) {
        if (value instanceof Carrier.Carrier)
          return dispatch(value)
        if (
          typeof value === 'object'
          && value != null
          && typeof value.type === 'string'
        ) return dispatch(value)
      }
    }
    return result
  }
  effect<Params, Done, Fail>(
    description: string
  ): Effect<Params, Done, Fail, State> {
    return effect(
      [...this.scope, description].join('/'),
      this.dispatch
    )
  }
  // epic
}


function middleware<State>({
  store,
  // dispatch,
  getState,
  next,
  data,
}: {
  store: Store<State>,
  dispatch: Dispatch,
  getState: () => State,
  next: *,
  data: Carrier.Carrier<any>,
}) {
  const unwrapped = data.plain()
  next(unwrapped)
  store.seq = incSeq(store.seq)
  store.update$.next({data, state: getState()})
  data.dispose.disposed(data.payload)
  return data
}

function middlewareCurry<State>(
  store: Store<State>
): Middleware<State> {
  return ({dispatch, getState}) => (next) => (data) => {
    if (!Carrier.is(data)) return next(data)
    if (!store.uniq.isUniq(data)) return
    return middleware({
      dispatch, getState, next, data, store,
    })
  }
}

export function getStore<State>(
  description: string,
  reducer: Reducer<State>,
) {
  const storeContext: Store<State> = new Store
  storeContext.scope = [description]
  const store = createStore(
    reducer,
    applyMiddleware(
      middlewareCurry(storeContext)
    )
  )
  storeContext.dispatch = store.dispatch
  storeContext.getState = store.getState

  return store
}
