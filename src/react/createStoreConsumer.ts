import {Store} from 'effector'

import {StoreConsumer} from './index.h'
import {createComponent} from './createComponent'
import {deprecate} from './deprecate'

export function createStoreConsumer<State>(
  store: Store<State>,
): StoreConsumer<State> {
  deprecate('createStoreConsumer', 'useUnit')
  return createComponent(store, ({children}, state) => children(state))
}
