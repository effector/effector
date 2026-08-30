import type {Event, Store, EventCallable} from 'effector'
import type {ComponentType} from 'react'

export type StoreView<State, Props> = ComponentType<Props> & {
  mounted: Event<{props: Props; state: State}>
  unmounted: Event<{props: Props; state: State}>
}

export type Gate<Props = {}> = React.ComponentType<Props> & {
  open: EventCallable<Props>
  close: EventCallable<Props>
  status: Store<boolean>
  state: Store<Props>
  set: EventCallable<Props>
}
