import type {ComponentType} from 'react'
import type {Store} from 'effector'

import {connect} from './connect'
import {deprecate} from './deprecate'

export const createReactState = (
  store: Store<any>,
  View: ComponentType<any>,
) => {
  deprecate('createReactState')
  return connect(View)(store)
}
