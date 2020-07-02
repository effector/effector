import type {Event, Store} from 'effector'
import type {ComponentType, ReactNode} from 'react'

export type StoreConsumer<State> = ComponentType<{
  children: (state: State) => ReactNode,
}>

export type StoreView<State, Props> = ComponentType<Props> & {
  mounted: Event<{props: Props, state: State}>,
  unmounted: Event<{props: Props, state: State}>,
}

export type Gate<Props = {}> = React.ComponentType<Props> & {
  isOpen: boolean
  isTerminated: boolean
  open: Event<Props>
  close: Event<Props>
  status: Store<boolean>
  destructor: Event<void>
  current: Props
  state: Store<Props>
  set: Event<Props>
  childGate<Next>(childName?: string): Gate<Next>
}
