//@flow

import type {ComponentType, Node} from 'react'
import {Store} from 'effector'

export type StoreComponent<State> = ComponentType<{
 children: (state: State) => Node,
}>
