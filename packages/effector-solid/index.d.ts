import { Accessor, Component } from "solid-js";
import {Store, Event, Effect, Domain} from 'effector'

export type Gate<Props = {}> = Component<Props> & {
  open: Event<Props>
  close: Event<Props>
  status: Store<boolean>
  state: Store<Props>
}

export function useStore<State>(store: Store<State>): Accessor<State>
export function useStoreMap<
  State,
  Result,
  Keys extends [any] | ReadonlyArray<any> | any[]
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
}): Gate<Props>
export function createGate<Props>(
  name: string,
  defaultState: Props,
): Gate<Props>

export function useEvent(event: Event<void>): () => void
export function useEvent<T>(event: Event<T>): (payload: T) => T
export function useEvent<R>(fx: Effect<void, R, any>): () => Promise<R>
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
): (payload: T) => Promise<R>
export function useEvent<List extends (Event<any> | Effect<any, any>)[]>(
  list: [...List],
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
      ? (payload: P) => Promise<D>
      : never
}
export function useEvent<
  Shape extends Record<string, Event<any> | Effect<any, any, any>>
  >(
  shape: Shape,
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
      ? (payload: P) => Promise<D>
      : never
}
