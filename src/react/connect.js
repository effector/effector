//@flow

import * as React from 'react'

import type {Store} from 'effector'
import {createReactState} from './createReactState'

export function connect<State: Object, Com: React.ComponentType<*>>(
  Component: Com,
): (
  store: Store<State>,
) => React.ComponentType<$Exact<$Diff<React.ElementConfig<Com>, State>>> {
  return store => createReactState(store, Component)
}
