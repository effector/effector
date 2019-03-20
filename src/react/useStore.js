//@flow

import {type Store, isStore} from 'effector'
import invariant from 'invariant'
import {useState, useReducer, useEffect} from 'react'

export function useStore<State>(store: Store<State>): State {
  invariant(
    isStore(store),
    'useStore: The argument must be Store, but you passed %s.',
    store,
  )
  const [state, setState] = useState(store.getState)
  useEffect(() => store.watch(newState => setState(() => newState)), [store])
  return state
}
