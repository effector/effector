import React from 'react'
import type {Store} from 'effector'
import {useStore} from './nossr'
import {withDisplayName} from './withDisplayName'
import {deprecate} from './deprecate'

export const createContextComponent = <Props, State, Context>(
  store: Store<State>,
  context: React.Context<Context>,
  renderProp: (props: Props, state: State, context: Context) => React.ReactNode,
): React.ComponentType<Props> => {
  deprecate('createContextComponent')
  return withDisplayName(
    `${store.shortName || 'Unknown'}.ContextComponent`,
    (props: any) => {
      const ctx = React.useContext(context)
      const state = useStore(store)
      return renderProp(props, state, ctx)
    },
  )
}
