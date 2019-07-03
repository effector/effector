import * as React from 'react'
import {Store, Event} from 'effector'

export type StoreConsumer<State> = React.ComponentType<{
  children: (state: State) => React.ReactNode
}>

export type StoreProvider<State> = React.ComponentType<{
  value: State
  children?: React.ReactNode
}>

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
export type StoreView<State, Props = {}> = React.ComponentType<Props> & {
  mounted: Event<{props: Props; state: State}>
  unmounted: Event<{props: Props; state: State}>
}

export function useStore<State>(store: Store<State>): State
export function useStoreMap<State, Result, Keys extends any[]>(opts: {
  readonly store: Store<State>
  readonly keys: Keys
  readonly fn: (state: State, keys: Keys) => Result
}): Result

export function useGate<Props>(Gate: Gate<Props>, props?: Props): void

export function createGate<Props extends object>(name?: string): Gate<Props>
export function createGate<Props>(
  name: string,
  defaultState: Props,
): Gate<Props>

export function createComponent<Props, State>(
  storeFactory: (initialProps: Props) => Store<State>,
  view: (props: Props, state: State) => React.ReactNode,
): StoreView<State, Props>
export function createComponent<Props, State>(
  store: Store<State>,
  view: (props: Props, state: State) => React.ReactNode,
): StoreView<State, Props>
export function createComponent<Props, Shape extends object>(
  store: Shape,
  view: (
    props: Props,
    state: {[K in keyof Shape]: Shape[K] extends Store<infer U> ? U : Shape[K]},
  ) => React.ReactNode,
): StoreView<
  {[K in keyof Shape]: Shape[K] extends Store<infer U> ? U : Shape[K]},
  Props
>

export function createContextComponent<Props, State, Context>(
  store: Store<State>,
  context: React.Context<Context>,
  view: (props: Props, state: State, context: Context) => React.ReactNode,
): React.ComponentType<Props>

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
