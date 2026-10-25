import {
  App,
  ComputedRef,
  DeepReadonly,
  EffectScope,
  InjectionKey,
  MaybeRefOrGetter,
  Plugin,
  Ref,
  UnwrapNestedRefs,
  UnwrapRef,
} from 'vue'
import {Domain, Store, Event, Effect, Scope} from 'effector'

export type ScopeOptions = {
  /** Scope to read stores from and to bind events to. */
  scope?: Scope
  /**
   * Throw when no scope is resolved instead of falling back to global mode.
   * Overrides the plugin value for this call, true or false.
   */
  forceScope?: boolean
}

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
  [Key in keyof T]: T[Key] extends Store<infer U> ? UnwrapNestedRefs<U> : never
}

export function useStoreMap<State, Result, Keys = unknown>(
  config: {
    store: Store<State>
    keys?: () => Keys
    fn: (state: State, keys: Keys) => Result
    updateFilter?: (update: Result, current: Result) => boolean
    defaultValue?: Result
  } & ScopeOptions,
  scope?: Scope,
): ComputedRef<Result>
export function useVModel<T>(
  vm: Store<T>,
  scope?: EffectScope,
): Ref<UnwrapRef<T>>
export function useVModel<T extends Record<string, Store<any>>>(
  vm: T,
  scope?: EffectScope,
): ExtractStore<T>
/** Type of the `useVModel` overloads declared above */
export type UseVModel = typeof useVModel
export function useStore<T>(
  store: Store<T>,
  opts?: ScopeOptions,
): DeepReadonly<Ref<T>>
export function createGate<Props>(config?: GateConfig<Props>): Gate<Props>
export function useGate<Props>(
  GateComponent: Gate<Props>,
  props?: MaybeRefOrGetter<Props>,
  opts?: ScopeOptions,
): void
export function useUnit<State>(
  store: Store<State>,
  opts?: ScopeOptions,
): DeepReadonly<Ref<State>>
export function useUnit(event: Event<void>, opts?: ScopeOptions): () => void
export function useUnit<T>(
  event: Event<T>,
  opts?: ScopeOptions,
): (payload: T) => T
export function useUnit<R>(
  fx: Effect<void, R, any>,
  opts?: ScopeOptions,
): () => Promise<R>
export function useUnit<T, R>(
  fx: Effect<T, R, any>,
  opts?: ScopeOptions,
): (payload: T) => Promise<R>
export function useUnit<
  List extends (Event<any> | Effect<any, any> | Store<any>)[],
>(
  list: [...List],
  opts?: ScopeOptions,
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
  opts?: ScopeOptions,
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

export type EffectorScopePluginOptions = {
  scope: Scope
  /** Legacy string injection key the scope is also provided under. */
  scopeName?: string
  /** Default forceScope for every composable call that does not pass its own. */
  forceScope?: boolean
  /**
   * Overrides whether the composables subscribe to the scope. `false` makes
   * them read the scope on access without subscribing, as in a server render;
   * `true` makes them always subscribe. By default they detect a server
   * render through the context of `renderToString`.
   */
  live?: boolean
}

export function EffectorScopePlugin(config: EffectorScopePluginOptions): Plugin
export function EffectorScopePlugin(
  app: App,
  config: EffectorScopePluginOptions,
): void

/** Injection key the plugin provides the scope under. */
export const EffectorScopeKey: InjectionKey<Scope>

export function useProvidedScope(opts: {forceScope: true}): Scope
export function useProvidedScope(opts?: {forceScope?: boolean}): Scope | null

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false
