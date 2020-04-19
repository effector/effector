//@flow

import * as React from 'react'
import type {Store} from 'effector'
import {useStore} from './useStore'
import {withDisplayName} from './withDisplayName'

export const createContextComponent = <Props: {...}, State, Context>(
  store: Store<State>,
  context: React.Context<Context>,
  renderProp: (props: Props, state: State, context: Context) => React.Node,
): React.ComponentType<Props> =>
    withDisplayName(`${store.shortName || 'Unknown'}.ContextComponent`, props => {
      const ctx = React.useContext(context)
      const state = useStore(store)
      return renderProp(props, state, ctx)
    })
