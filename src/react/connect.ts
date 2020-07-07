import React from 'react'

import {Store} from 'effector'
import {createReactState} from './createReactState'

export const connect = <State>(Component: React.ComponentType<any>) => (
  store: Store<State>,
) => createReactState(store, Component)
