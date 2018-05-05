
import * as React from 'react'
import {Store} from 'effector'

export type StoreComponent<State> = React.Component<{
 children: (state: State) => React.NodeType,
}>

export function createStoreComponent<State>(
 store: Store<State>,
): StoreComponent<State>
