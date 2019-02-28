//@flow

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'

export function createStore<State>(
  state: State,
  config: {name?: string} = {},
): Store<State> {
  return storeFabric({
    currentState: state,
    name: config.name,
  })
}
