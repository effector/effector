import {Accessor, Component} from 'solid-js'
import {Store, Event, Effect, Domain} from 'effector'

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

export function useUnit<State>(store: Store<State>): Accessor<State>
export function useUnit(event: Event<void>): () => void
export function useUnit<T>(event: Event<T>): (payload: T) => T
export function useUnit<R>(fx: Effect<void, R, any>): () => Promise<R>
export function useUnit<T, R>(
  fx: Effect<T, R, any>,
): (payload: T) => Promise<R>
export function useUnit<List extends (Event<any> | Effect<any, any> | Store<any>)[]>(
  list: [...List]
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
      ? (payload: P) => Promise<D>
      : List[Key] extends Store<infer V>
        ? Accessor<V>
        : never
}
export function useUnit<Shape extends Record<string, Event<any> | Effect<any, any, any> | Store<any>>>(
  shape: Shape
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
      ? (payload: P) => Promise<D>
      : Shape[Key] extends Store<infer V>
        ? Accessor<V>
        : never
}
