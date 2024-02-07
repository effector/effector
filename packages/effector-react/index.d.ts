import React from 'react'
import {Store, Event, Effect, Domain, Scope, EventCallable} from 'effector'

export const Provider: React.Provider<Scope>

export type StoreConsumer<State> = React.ComponentType<{
  children: (state: State) => React.ReactNode
}>

export type Gate<Props = {}> = React.ComponentType<Props> & {
  open: EventCallable<Props>
  close: EventCallable<Props>
  status: Store<boolean>
  state: Store<Props>
}
export type StoreView<State, Props = {}> = React.ComponentType<Props> & {
  mounted: Event<{props: Props; state: State}>
  unmounted: Event<{props: Props; state: State}>
}

/**
 * @deprecated use useUnit hook instead
 */
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

/**
 * @deprecated use useUnit hook instead
 */
export function createComponent<Props, State>(
  store: Store<State>,
  view: (props: Props, state: State) => React.ReactNode,
): StoreView<State, Props>
/**
 * @deprecated use useUnit hook instead
 */
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
 * @deprecated use useUnit hook instead
 */
export function connect<
  State extends object,
  Com extends React.ComponentType<any>,
>(store: Store<State>): (Component: Com) => React.ComponentType<State>
/**
 * @deprecated use useUnit hook instead
 */
export function connect<
  State extends object,
  Com extends React.ComponentType<any>,
>(Component: Com): (store: Store<State>) => React.ComponentType<State>

/**
 * @deprecated use useUnit hook instead
 */
export function createStoreConsumer<State>(
  store: Store<State>,
): StoreConsumer<State>

/**
 * @deprecated use useUnit hook instead
 */
export function useEvent(
  event: EventCallable<void>,
  opts?: {forceScope?: boolean},
): () => void
/**
 * @deprecated use useUnit hook instead
 */
export function useEvent<T>(
  event: EventCallable<T>,
  opts?: {forceScope?: boolean},
): (payload: T) => T
/**
 * @deprecated use useUnit hook instead
 */
export function useEvent<R>(
  fx: Effect<void, R, any>,
  opts?: {forceScope?: boolean},
): () => Promise<R>
/**
 * @deprecated use useUnit hook instead
 */
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
  opts?: {forceScope?: boolean},
): (payload: T) => Promise<R>
/**
 * @deprecated use useUnit hook instead
 */
export function useEvent<List extends (EventCallable<any> | Effect<any, any>)[]>(
  list: [...List],
  opts?: {forceScope?: boolean},
): {
  [Key in keyof List]: List[Key] extends EventCallable<infer T>
    ? (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : never
}
/**
 * @deprecated use useUnit hook instead
 */
export function useEvent<
  Shape extends Record<string, EventCallable<any> | Effect<any, any, any>>,
>(
  shape: Shape,
  opts?: {forceScope?: boolean},
): {
  [Key in keyof Shape]: Shape[Key] extends EventCallable<infer T>
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
  event: EventCallable<void>,
  opts?: {forceScope?: boolean},
): () => void
export function useUnit<T>(
  event: EventCallable<T>,
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
  List extends (EventCallable<any> | Effect<any, any> | Store<any>)[],
>(
  list: [...List],
  opts?: {forceScope?: boolean},
): {
  [Key in keyof List]: List[Key] extends EventCallable<infer T>
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
  Shape extends Record<string, EventCallable<any> | Effect<any, any, any> | Store<any>>,
>(
  shape: Shape | {'@@unitShape': () => Shape},
  opts?: {forceScope?: boolean},
): {
  [Key in keyof Shape]: Shape[Key] extends EventCallable<infer T>
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

/**
 * **Low-Level API for library developers.**
 * For production code usage **prefer `useUnit` hook instead**.
 *
 * React hook, which returns current scope or null if no scope provided via `Provider`.
 */
export function useProvidedScope(): Scope | null
