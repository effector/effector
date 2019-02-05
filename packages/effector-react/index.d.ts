import * as React from 'react'
import {Store, Event} from 'effector'

export type StoreConsumer<State> = React.ComponentType<{
  children: (state: State) => React.ReactNode
}>

export type StoreProvider<State> = React.ComponentType<{
  value: State
  children?: React.ReactNode
}>

export function createComponent<Props, State>(
  store: Store<State>,
  renderProp: (props: Props, state: State) => React.ReactNode,
): React.ComponentType<Props>
export function createContextComponent<Props, State, Context>(
  store: Store<State>,
  context: React.Context<Context>,
  renderProp: (props: Props, state: State, context: Context) => React.ReactNode,
): React.ComponentType<Props>

export type Gate<Props = {}> = React.ComponentType<Props> & {
  isOpen: boolean
  isTerminated: boolean
  open: Event<void>
  close: Event<void>
  status: Store<boolean>
  destructor: Event<void>
  current: Props
  state: Store<Props>
  childGate<Next>(childName?: string): Gate<Next>
}

export function createGate<Props>(name?: string): Gate<Props>

export function connect<
  State extends object,
  Com extends React.ComponentType<any>
>(Component: Com): (store: Store<State>) => React.ComponentType<State>

export function createStoreConsumer<State>(
  store: Store<State>,
): StoreConsumer<State>

export function unstable_createStoreProvider<State>(
  store: Store<State>,
): StoreProvider<State>

export function createReactState<
  State extends object,
  Com extends React.ComponentType<any>
>(store: Store<State>, Component: Com): React.ComponentType<State>
