import {ComputedRef, DeepReadonly, EffectScope, Reactive, Ref, UnwrapRef} from '@vue/reactivity'
import {Domain, Store, Event, Effect, Scope} from 'effector'

type GateConfig<T> = {
  name?: string
  defaultState?: T
  domain?: Domain
  sid?: string
}

type Gate<Props> = {
  open: Event<Props>
  close: Event<Props>
  status: Store<boolean>
  state: Store<Props>
  set: Event<Props>
}

type ExtractStore<T extends Record<string, Store<unknown>>> = {
  [Key in keyof T]: T[Key] extends Store<infer U> ? Reactive<U> : never
}

export interface UseVModel {
  <T>(vm: Store<T>): Ref<T>
  <T extends Record<string, Store<any>>>(vm: T, scope?: EffectScope): ExtractStore<T>
}

export function useStoreMap<State, Result, Keys = unknown>(
  config: {
    store: Store<State>
    keys?: () => Keys
    fn: (state: State, keys: Keys) => Result
    updateFilter?: (update: Result, current: Result) => boolean
    defaultValue?: Result
  },
  scope?: Scope,
): ComputedRef<Result>
export function useVModel<T>(vm: Store<T>, scope?: EffectScope): Ref<UnwrapRef<T>>
export function useVModel<T extends Record<string, Store<any>>>(
  vm: T,
  scope?: EffectScope
): ExtractStore<T>
export function useStore<T>(store: Store<T>): DeepReadonly<Ref<T>>
export function createGate<Props>(config?: GateConfig<Props>): Gate<Props>
export function useGate<Props>(
  GateComponent: Gate<Props>,
  cb?: () => Props,
): void
export function useUnit<State>(
  store: Store<State>,
  opts?: {forceScope?: boolean},
): DeepReadonly<Ref<State>>
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
    ? DeepReadonly<Ref<V>>
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
    ? DeepReadonly<Ref<V>>
    : never
}

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
