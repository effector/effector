//@flow

import {createStore, applyMiddleware, type Middleware, type Store, type Reducer} from 'redux'
import {effectorMiddleware, type Message, message, Effect} from '..'
// import {normalizeActions, tryAddUid} from '../../../state/middleware'

export const fooMessage = (): Message<{foo: 'bar'}> => message(
  'action'
)

export function delay<A>(data: A, time: number = 500): Promise<A> {
  return new Promise(rs => setTimeout(rs, time, data))
}

export const fooAsyncAction = (): Effect<{foo: 'bar'}, 'bar'> => {
  const eff = new Effect('effect')
  eff.serve(({foo}: {foo: 'bar'}) => delay(foo))
  return eff
}

function genericRootReducer<T>(actionSpy): Reducer<T> {
  return (state: T, action) => {
    actionSpy(action)
    return state
  }
}

export function fooStore(
  actionSpy: * = jest.fn(),
  rootReducer: Reducer<*> = genericRootReducer(actionSpy)
) {
  const state = {foo: 'bar'}
  // const addUid: Middleware<typeof state> = (tryAddUid/*:::any*/)
  const actionMid: Middleware<typeof state> = effectorMiddleware()

  const store: Store<typeof state> = createStore(
    rootReducer,
    state,
    applyMiddleware(
      // normalizeActions({ meta: {} }),
      // addUid,
      actionMid
    )
  )
  return store
}

export function getSend<S>(store: Store<S>) {
  const send: (<T>(x: T) => T) = (store.dispatch: any)
  return send
}

