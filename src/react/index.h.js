//@flow

import type {ComponentType, Node} from 'react'
import type {Store} from 'effector'

export type StoreConsumer<State> = ComponentType<{
 children: (state: State) => Node,
}>

export type StoreProvider<State> = ComponentType<{
 value: State,
 children?: Node,
}>
