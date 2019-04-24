//@flow

import * as React from 'react'

import type {Store} from 'effector'

import type {StoreConsumer} from './index.h'
import {createComponent} from './createComponent'

export function createStoreConsumer<State>(
  store: Store<State>,
): StoreConsumer<State> {
  return createComponent(store, ({children}, state) => children(state))
}
