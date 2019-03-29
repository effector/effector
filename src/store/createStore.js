//@flow

import invariant from 'invariant'

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'
import {type Config, type StoreConfigPart, normalizeConfig} from '../config'

export function createStore<State>(
  state: State,
  config: Config<StoreConfigPart> = {},
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
