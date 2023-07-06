import {Store, Event, Effect, Domain, Scope, EventCallable} from 'effector'
import {Accessor, Component, FlowComponent} from 'solid-js'

export const Provider: FlowComponent<{
  value: Scope
}>

export type Gate<Props = {}> = Component<Props> & {
  open: Event<Props>
  close: Event<Props>
  status: Store<boolean>
  state: Store<Props>
}

export function useStoreMap<
  State,
  Result,
  Keys extends [any] | ReadonlyArray<any> | any[],
>(opts: {
  readonly store: Store<State>
  readonly keys: Keys
  readonly fn: (state: State, keys: Keys) => Result
  readonly updateFilter?: (update: Result, current: Result) => boolean
}): Accessor<Result>
export function useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result,
): Accessor<Result>

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

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false

export function useUnit<State>(
  store: Store<State>,
  opts?: {forceScope?: boolean},
): Accessor<State>
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
    ? Accessor<V>
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
    ? Accessor<V>
    : never
}
