//@flow
import $$observable from 'symbol-observable'
import {createStore, createEvent, forward} from 'effector'

function normalizeArgs<T>(
  reducers,
  defaultState,
  enhancer,
):
  | {|
      +willContinue: false,
      +result: *,
    |}
  | {|
      +willContinue: true,
      +defaultState: T,
    |} {
  if (typeof reducers !== 'function') throw Error('not a function')
  if (typeof defaultState === undefined)
    //$off
    defaultState = reducers(undefined, {type: 'HI'})
  if (typeof enhancer === 'function')
    return {
      result: enhancer(createReduxStore)(reducers, defaultState),
      willContinue: false,
    }
  if (typeof enhancer === 'undefined' && typeof defaultState === 'function') {
    return {
      //$off
      result: defaultState(createReduxStore)(
        reducers,
        //$off
        reducers(undefined, {type: 'HI'}),
      ),
      willContinue: false,
    }
  }
  return {
    //$off
    defaultState,
    willContinue: true,
  }
}

function reduxStoreFabric<T>({
  defaultState,
  reducers,
}: {
  defaultState: T,
  reducers: (state: T, payload: {+type: string, payload?: any, ...}) => T,
}) {
  const dispatch = createEvent<{+type: string, payload?: any, ...}>('dispatch')
  const update = createEvent('update')
  const store = createStore<T>(defaultState)
  store.on(dispatch, (state, event) => {
    try {
      return reducers(state, event)
    } catch (err) {
      console.error(err)
    }
    return state
  })

  forward({
    from: store,
    to: update,
  })
  const wrapper = {}
  //$off
  wrapper[$$observable] = store[$$observable]
  wrapper.getState = store.getState
  wrapper.dispatch = dispatch
  /**
   * NOTE that's mean that symbol.observable subscribers
   * will always been called before ones which used .subscribe
   */
  wrapper.subscribe = (fn: (data: T) => any) =>
    update.watch((data, x) => {
      console.log('update.watch', data, x)
      try {
        fn(data)
      } catch (err) {
        console.error(err)
      }
    })

  wrapper.replaceReducer = (newReducers: typeof reducers) => {
    reducers = newReducers
    dispatch({type: 'HI'})
  }
  return wrapper
}

export function createReduxStore<T>(
  reducers: (state: T, payload: {+type: string, payload?: any, ...}) => T,
  defaultState: T,
  enhancer: Function,
) {
  const normalized = normalizeArgs<T>(reducers, defaultState, enhancer)
  if (!normalized.willContinue) return normalized.result
  return reduxStoreFabric({
    reducers,
    defaultState: normalized.defaultState,
  })
}
