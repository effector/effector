//@noflow

import {type Store, type Dispatch, combineReducers} from 'redux'

import type {ReducerRedux} from './index.h'

export function storeInjector<State>() {

  type ReduxStore = Store<State, any>

  type StateReducer = ReducerRedux<State, any>

  const loaders: Map<string, () => Promise<StateReducer>> = new Map

  let injected: { [field: string]: StateReducer } = {}

  let staticReducers: { [field: string]: StateReducer } = {}

  let store: ReduxStore

  const dispatch: Dispatch = action => store.dispatch(action)


  const setStore = (newStore: ReduxStore) => store = newStore

  const saveStatic = (reducers: { [field: string]: StateReducer }) => {
    staticReducers = reducers
  }

  const getRootReducer = (): StateReducer => (combineReducers({
    ...staticReducers,
    ...injected,
  }): any)

  const replaceReducer = () => {
    const rootReducer = getRootReducer()
    store.replaceReducer(rootReducer)
  }

  /**
   * Add reducer to store dynamically.
   *
   * Accepts reducer's name and it's loader - async function, which returns reducer itself
   *
   * Also, function correctly handles some typical cases:
   *  - Resolves default export in case of es6 modules import
   *  - Transforms object with reducers into plain reducer function (therefore you can import reducers without calling combineReducers by yourself)
   *
   * Returns boolean, which shows were reducer been imported or taken from the cache
   *
   *
   * @exports
   * @param {string} name
   * @param {() => Promise<StateReducer>} reducerThunk
   * @returns {Promise<boolean>}
   */
  async function importReducer(
    name: string,
    reducerThunk: () => Promise<StateReducer>
  ) {
    if (loaders.has(name))
      return true
    const reducer = await thunkLoader(reducerThunk)
    injected[name] = reducer
    loaders.set(name, reducerThunk)
    replaceReducer()
    return false
  }

  async function reload(
    reducers: { [field: string]: StateReducer }
  ) {
    saveStatic(reducers)
    injected = {}
    for (const [key, thunk] of loaders.entries()) {
      const reducer = await thunkLoader(thunk)
      injected[key] = reducer
    }
    replaceReducer()
  }

  async function thunkLoader(thunk: () => Promise<mixed>): Promise<Function> {
    const loaded = await thunk()

    if (typeof loaded === 'function') return loaded
    if (typeof loaded !== 'object' || loaded == null) {
      const message = wrongTypeError(loaded)
      throw new TypeError(message)
    }

    const def = loaded.default
    if (typeof def === 'function') return def
    if (def == null) return combineReducers(loaded)
    if (typeof def === 'object') return combineReducers(def)

    const message = wrongTypeError(def)
    throw new TypeError(message)
  }
  return {
    dispatch,
    setStore,
    saveStatic,
    getRootReducer,
    importReducer,
    reload,
  }
}

const wrongTypeError = loaded => `
Thunk must be object with reducers or reducer itself;
got ${typeof loaded} ${String(loaded)}
`

