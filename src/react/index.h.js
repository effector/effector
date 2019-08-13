//@flow

import type {Event} from 'effector'
import type {ComponentType, Node} from 'react'

export type StoreConsumer<State> = ComponentType<{|
  children: (state: State) => Node,
|}>

export type StoreProvider<State> = ComponentType<{|
  value: State,
  children?: Node,
|}>

export type StoreView<State, Props = {||}> = ComponentType<Props> & {
  mounted: Event<{|props: Props, state: State|}>,
  unmounted: Event<{|props: Props, state: State|}>,
  ...
}
