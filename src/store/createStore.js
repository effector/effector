//@flow

import invariant from 'invariant'

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'
import {type Config, normalizeConfig} from './storeConfig'

export function createStore<State>(
  state: State,
  config: Config = {},
): Store<State> {
  invariant(
    typeof state !== 'undefined',
    "createStore: First argument can't be undefined, use null instead.",
  )
  const opts = normalizeConfig(config)
  return storeFabric({
    currentState: state,
    config: opts,
  })
}
