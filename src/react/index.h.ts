import type {Event} from 'effector'
import type {ComponentType, ReactNode} from 'react'

export type StoreConsumer<State> = ComponentType<{
  children: (state: State) => ReactNode,
}>

export type StoreView<State, Props> = ComponentType<Props> & {
  mounted: Event<{props: Props, state: State}>,
  unmounted: Event<{props: Props, state: State}>,
}
