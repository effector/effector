//@flow

import $$observable from 'symbol-observable'
import {createStore, createEvent, forward} from 'effector'
import {ActionTypes} from './actionTypes'

function normalizeArgs<T>(reducer, defaultState, enhancer) {
  if (typeof defaultState === 'function' && typeof enhancer === 'undefined') {
    enhancer = defaultState
    defaultState = undefined
  }
  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }
    return enhancer(createReduxStore)(reducer, defaultState)
  }
  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }
  return reduxStoreFabric({
    reducer,
    defaultState,
  })
}

function reduxStoreFabric<T>({
  defaultState,
  reducer,
}: {
  defaultState: T,
  reducer: (state: T, payload: {+type: string, payload?: any, ...}) => T,
}) {
  let currentReducer = reducer

  const dispatch = createEvent<{+type: string, payload?: any, ...}>('dispatch')
  const update = createEvent('update')
  const store = createStore<T>(defaultState)
  store.on(dispatch, (state, event) => {
    try {
      return currentReducer(state, event)
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
  wrapper.subscribe = (listener: (data: T) => any) => {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }
    return update.watch((data, x) => {
      //console.log('update.watch', data, x)
      listener(data)
    })
  }

  wrapper.replaceReducer = (nextReducer: typeof currentReducer) => {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }
    currentReducer = nextReducer
    dispatch({type: ActionTypes.REPLACE})
  }

  dispatch({type: ActionTypes.INIT})

  return wrapper
}

export function createReduxStore<T>(
  reducer: (state: T, payload: {+type: string, payload?: any, ...}) => T,
  defaultState: T,
  enhancer: Function,
) {
  if (
    (typeof defaultState === 'function' && typeof enhancer === 'function') ||
    (typeof enhancer === 'function' && typeof arguments[3] === 'function')
  ) {
    throw new Error(
      'It looks like you are passing several store enhancers to ' +
        'createStore(). This is not supported. Instead, compose them ' +
        'together to a single function',
    )
  }
  return normalizeArgs<T>(reducer, defaultState, enhancer)
}

export {combineReducers} from './combineReducers'
