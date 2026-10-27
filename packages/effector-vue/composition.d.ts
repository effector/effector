import {
  App,
  ComputedRef,
  EffectScope,
  InjectionKey,
  MaybeRefOrGetter,
  Plugin,
  Ref,
  UnwrapNestedRefs,
  UnwrapRef,
} from 'vue'
import {Domain, Store, EventCallable, Effect, Scope} from 'effector'

export type ScopeOptions = {
  /** Scope to read stores from and to bind events to. */
  scope?: Scope
  /**
   * Throw when no scope is resolved instead of falling back to global mode.
   * Overrides the plugin value for this call, true or false.
   */
  forceScope?: boolean
}

/** `true` when the two types are the same, `false` otherwise. */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
  T,
>() => T extends Y ? 1 : 2
  ? true
  : false

/**
 * What a composable hands out for a single unit: a readonly ref for a store,
 * a bound function for an event or an effect.
 *
 * The ref is `Readonly<Ref<V>>`: `value` is the state the store holds (#1130).
 */
export type UnitToValue<U> = U extends Store<infer V>
  ? Readonly<Ref<V>>
  : U extends Effect<infer P, infer D, any>
  ? Equal<P, void> extends true
    ? () => Promise<D>
    : (params: P) => Promise<D>
  : U extends EventCallable<infer T>
  ? Equal<T, void> extends true
    ? () => void
    : (payload: T) => T
  : never

/** What `useUnit` hands out for a list or a shape of units. */
export type UseUnitResult<Shape> = {
  [Key in keyof Shape]: UnitToValue<Shape[Key]>
}

type GateConfig<T> = {
  name?: string
  defaultState?: T
  domain?: Domain
  sid?: string
}

type Gate<Props> = {
  open: EventCallable<Props>
  close: EventCallable<Props>
  status: Store<boolean>
  state: Store<Props>
  set: EventCallable<Props>
}

type ExtractStore<T extends Record<string, Store<unknown>>> = {
  [Key in keyof T]: T[Key] extends Store<infer U> ? UnwrapNestedRefs<U> : never
}

export type UseStoreMapConfig<State, Result, Keys> = {
  store: Store<State>
  /** Passed to `fn` as its second argument; a ref or a getter is tracked. */
  keys?: MaybeRefOrGetter<Keys>
  fn: (state: State, keys: Keys) => Result
  /** Decides whether a new result of `fn` replaces the current one. */
  updateFilter?: (update: Result, current: Result) => boolean
  /** Used every time `fn` returns undefined. */
  defaultValue?: Result
} & ScopeOptions

export function useStoreMap<State, Result, Keys = unknown>(
  config: UseStoreMapConfig<State, Result, Keys>,
  scope?: Scope,
): ComputedRef<Result>
export function useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result,
  opts?: ScopeOptions,
): ComputedRef<Result>

export type UseVModelOptions = ScopeOptions & {
  /**
   * Copy the state into a deeply reactive value and watch it deeply, so that
   * an edit of a nested field reaches the store. Default true; with false the
   * state of the store is bound as it is and only assignments of the whole
   * value are written back.
   */
  deep?: boolean
}

export function useVModel<T>(
  vm: Store<T>,
  opts?: UseVModelOptions,
): Ref<UnwrapRef<T>>
export function useVModel<T extends Record<string, Store<any>>>(
  vm: T,
  opts?: UseVModelOptions,
): ExtractStore<T>
/**
 * The form before the options object: a Vue effect scope to run in. It keeps
 * working; the options object is the preferred form.
 */
export function useVModel<T>(
  vm: Store<T>,
  effectScope: EffectScope,
): Ref<UnwrapRef<T>>
/**
 * The form before the options object: a Vue effect scope to run in. It keeps
 * working; the options object is the preferred form.
 */
export function useVModel<T extends Record<string, Store<any>>>(
  vm: T,
  effectScope: EffectScope,
): ExtractStore<T>
/** Type of the `useVModel` overloads declared above */
export type UseVModel = typeof useVModel
export function useStore<T>(
  store: Store<T>,
  opts?: ScopeOptions,
): Readonly<Ref<T>>
export function createGate<Props>(config?: GateConfig<Props>): Gate<Props>
export function useGate<Props>(
  GateComponent: Gate<Props>,
  props?: MaybeRefOrGetter<Props>,
  opts?: ScopeOptions,
): void
export function useUnit<State>(
  store: Store<State>,
  opts?: ScopeOptions,
): Readonly<Ref<State>>
export function useUnit(
  event: EventCallable<void>,
  opts?: ScopeOptions,
): () => void
export function useUnit<T>(
  event: EventCallable<T>,
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
  List extends (Store<any> | EventCallable<any> | Effect<any, any, any>)[],
>(list: [...List], opts?: ScopeOptions): UseUnitResult<List>
export function useUnit<
  Shape extends Record<
    string,
    Store<any> | EventCallable<any> | Effect<any, any, any>
  >,
>(
  shape: Shape | {'@@unitShape': () => Shape},
  opts?: ScopeOptions,
): UseUnitResult<Shape>

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
