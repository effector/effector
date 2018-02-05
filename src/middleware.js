//@flow

import {
  createStore,
  applyMiddleware,
  type Reducer,
  type Middleware,
  type Dispatch,
} from 'redux'

import {type Carrier, is} from './carrier/carrier'
import {Store} from './store'
import {incSeq} from './id'

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
  data: Carrier<any>,
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
    if (!is(data)) return next(data)
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

  return storeContext
}
