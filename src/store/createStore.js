//@flow

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'

export function createStore<State>(
  state: State,
  opts: {name?: string} = {},
): Store<State> {
  return storeFabric({
    currentState: state,
    name: opts.name,
  })
}
