import React from 'react'
import {Store, Event, Effect, Domain, Scope} from 'effector'

export const Provider: React.Provider<Scope>

export type StoreConsumer<State> = React.ComponentType<{
  children: (state: State) => React.ReactNode
}>

export type Gate<Props = {}> = React.ComponentType<Props> & {
  open: Event<Props>
  close: Event<Props>
  status: Store<boolean>
  state: Store<Props>
}
export type StoreView<State, Props = {}> = React.ComponentType<Props> & {
  mounted: Event<{props: Props; state: State}>
  unmounted: Event<{props: Props; state: State}>
}

export function useStore<State>(
  store: Store<State>,
  opts?: {forceScope?: boolean},
): State
export function useStoreMap<
  State,
  Result,
  Keys extends [any] | ReadonlyArray<any> | any[],
>(opts: {
  readonly store: Store<State>
  readonly keys: Keys
  readonly fn: (state: State, keys: Keys) => Result | undefined
  readonly updateFilter?: (update: Result, current: Result) => boolean
  readonly defaultValue: Result
  readonly forceScope?: boolean
}): Result
export function useStoreMap<
  State,
  Result,
  Keys extends [any] | ReadonlyArray<any> | any[],
>(opts: {
  readonly store: Store<State>
  readonly keys: Keys
  readonly fn: (state: State, keys: Keys) => Result
  readonly updateFilter?: (update: Result, current: Result) => boolean
  readonly forceScope?: boolean
}): Result
export function useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result,
): Result
export function useList<T, Key extends React.Key>(
  list: Store<T[]> | Store<ReadonlyArray<T>>,
  renderItem: {
    readonly keys?: any[]
    readonly fn: (item: T, key: Key) => React.ReactNode
    readonly getKey: (item: T) => Key
    readonly placeholder?: React.ReactNode
  },
  {forceScope}?: {forceScope?: boolean},
): JSX.Element
export function useList<T>(
  list: Store<T[]> | Store<ReadonlyArray<T>>,
  renderItem:
    | {
        readonly keys?: any[]
        readonly fn: (item: T, index: number) => React.ReactNode
        readonly placeholder?: React.ReactNode
      }
    | ((item: T, index: number) => React.ReactNode),
  {forceScope}?: {forceScope?: boolean},
): JSX.Element

export function useGate<Props>(Gate: Gate<Props>, props?: Props): void

export function createGate<Props>(name?: string): Gate<Props>
export function createGate<Props>(config: {
  defaultState?: Props
  name?: string
  domain?: Domain
  sid?: string
}): Gate<Props>
export function createGate<Props>(
  name: string,
  defaultState: Props,
): Gate<Props>

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

/**
 * @deprecated use useStore hook instead
 */
export function createContextComponent<Props, State, Context>(
  store: Store<State>,
  context: React.Context<Context>,
  view: (props: Props, state: State, context: Context) => React.ReactNode,
): React.ComponentType<Props>

export function connect<
  State extends object,
  Com extends React.ComponentType<any>,
>(store: Store<State>): (Component: Com) => React.ComponentType<State>
export function connect<
  State extends object,
  Com extends React.ComponentType<any>,
>(Component: Com): (store: Store<State>) => React.ComponentType<State>

export function createStoreConsumer<State>(
  store: Store<State>,
): StoreConsumer<State>

/**
 * @deprecated use useStore hook instead
 */
export function createReactState<
  State extends object,
  Com extends React.ComponentType<any>,
>(store: Store<State>, Component: Com): React.ComponentType<State>

export function useEvent(
  event: Event<void>,
  opts?: {forceScope?: boolean},
): () => void
export function useEvent<T>(
  event: Event<T>,
  opts?: {forceScope?: boolean},
): (payload: T) => T
export function useEvent<R>(
  fx: Effect<void, R, any>,
  opts?: {forceScope?: boolean},
): () => Promise<R>
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
  opts?: {forceScope?: boolean},
): (payload: T) => Promise<R>
export function useEvent<List extends (Event<any> | Effect<any, any>)[]>(
  list: [...List],
  opts?: {forceScope?: boolean},
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : never
}
export function useEvent<
  Shape extends Record<string, Event<any> | Effect<any, any, any>>,
>(
  shape: Shape,
  opts?: {forceScope?: boolean},
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : never
}

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false

export function useUnit<State>(
  store: Store<State>,
  opts?: {forceScope?: boolean},
): State
export function useUnit(
  event: Event<void>,
  opts?: {forceScope?: boolean},
): () => void
export function useUnit<T>(
  event: Event<T>,
  opts?: {forceScope?: boolean},
): (payload: T) => T
export function useUnit<R>(
  fx: Effect<void, R, any>,
  opts?: {forceScope?: boolean},
): () => Promise<R>
export function useUnit<T, R>(
  fx: Effect<T, R, any>,
  opts?: {forceScope?: boolean},
): (payload: T) => Promise<R>
export function useUnit<
  List extends (Event<any> | Effect<any, any> | Store<any>)[],
>(
  list: [...List],
  opts?: {forceScope?: boolean},
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? Equal<T, void> extends true
      ? () => void
      : (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
    ? Equal<P, void> extends true
      ? () => Promise<D>
      : (payload: P) => Promise<D>
    : List[Key] extends Store<infer V>
    ? V
    : never
}
export function useUnit<
  Shape extends Record<string, Event<any> | Effect<any, any, any> | Store<any>>,
>(
  shape: Shape | {'@@unitShape': () => Shape},
  opts?: {forceScope?: boolean},
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? Equal<T, void> extends true
      ? () => void
      : (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? Equal<P, void> extends true
      ? () => Promise<D>
      : (payload: P) => Promise<D>
    : Shape[Key] extends Store<infer V>
    ? V
    : never
}
