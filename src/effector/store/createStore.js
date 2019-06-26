//@flow

import type {Store} from './index.h'
import {storeFabric} from './storeFabric'
import {type Config, type StoreConfigPart, normalizeConfig} from '../config'

export function createStore<State>(
  currentState: State,
  config?: Config<StoreConfigPart>,
): Store<State> {
  if (currentState === undefined)
    throw Error("current state can't be undefined, use null instead")
  return storeFabric({
    currentState,
    config: normalizeConfig(config),
  })
}
