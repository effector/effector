import {Store} from 'effector'

import {StoreConsumer} from './index.h'
import {createComponent} from './createComponent'

export function createStoreConsumer<State>(
  store: Store<State>,
): StoreConsumer<State> {
  return createComponent(store, ({children}, state) => children(state))
}
