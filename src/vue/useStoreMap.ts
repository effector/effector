import {Scope, Store, is} from 'effector'
import {
  ComputedRef,
  MaybeRefOrGetter,
  Ref,
  computed,
  customRef,
  shallowRef,
  toValue,
  watch,
} from 'vue-next'

import {ScopeOptions, resolveScope} from './lib/get-scope'
import {isServerRender} from './lib/ssr'
import {stateReader} from './lib/state-reader'
import {throwError} from './lib/throw'
import {useUnitBase} from './useUnit'

const basicUpdateFilter = <T>(update: T, current: T) => update !== current

export type UseStoreMapConfig<State, Result, Keys> = {
  store: Store<State>
  keys?: MaybeRefOrGetter<Keys>
  fn: (state: State, keys: Keys) => Result
  updateFilter?: (update: Result, current: Result) => boolean
  defaultValue?: Result
} & ScopeOptions

export function useStoreMap<State, Result, Keys = void>(
  config: UseStoreMapConfig<State, Result, Keys>,
  scope?: Scope,
): ComputedRef<Result>
export function useStoreMap<State, Result>(
  store: Store<State>,
  fn: (state: State) => Result,
  opts?: ScopeOptions,
): ComputedRef<Result>
export function useStoreMap<State, Result, Keys>(
  configOrStore: UseStoreMapConfig<State, Result, Keys> | Store<State>,
  fnOrScope?: ((state: State) => Result) | Scope,
  opts?: ScopeOptions,
): ComputedRef<Result> {
  const shortForm = is.store(configOrStore)
  const config = (
    shortForm ? {...opts, store: configOrStore, fn: fnOrScope} : configOrStore
  ) as UseStoreMapConfig<State, Result, Keys>
  const positionalScope = shortForm
    ? undefined
    : (fnOrScope as Scope | undefined)

  if (!is.store(config.store)) throwError('useStoreMap expects a store')
  if (typeof config.fn !== 'function') {
    throwError('useStoreMap expects fn as a function')
  }
  const scopeOptions = {
    scope: positionalScope ?? config.scope,
    forceScope: config.forceScope,
  }
  const scope = resolveScope('useStoreMap', scopeOptions)

  /**
   * The subscription, the scope and the lifetime of the call are the ones of
   * `useUnit`: one batched watch per call, disposed with the effect scope.
   */
  const state = useUnitBase(
    'useStoreMap',
    config.store as any,
    scopeOptions,
  ) as unknown as Ref<State>

  /**
   * A computed keeps `fn` from running again when a getter in `keys` reruns
   * with the same value.
   */
  const keys = computed(() => toValue(config.keys as MaybeRefOrGetter<Keys>))

  /**
   * The selector reads the state from the store itself, so it receives the
   * object effector holds and not the readonly wrapper `useUnit` puts on the
   * ref. Reading the ref is what makes an update of the store reach here.
   */
  const select = (): Result => {
    state.value
    const result = config.fn(stateReader(config.store, scope), keys.value)

    return (result !== undefined ? result : config.defaultValue) as Result
  }

  /**
   * A server render has neither updates to filter nor a lifecycle to dispose a
   * watcher in, and the state keeps changing until the last `onServerPrefetch`
   * resolves: there every read runs the selector. A `computed` would keep its
   * first result, since nothing on the server triggers it.
   */
  if (isServerRender()) {
    return customRef(() => ({get: select, set() {}})) as ComputedRef<Result>
  }

  /**
   * `updateFilter` decides on the results of `fn`, the way `useStoreMapBase`
   * in src/react/apiBase.ts does it, so it sits between the selector and the
   * value the template reads. The watcher is synchronous: an update of the
   * store has to be visible right after the event that caused it.
   *
   * The selector runs inside that watcher, which effector calls, and effector
   * catches what its watchers throw. A throw is kept here and raised again
   * when the value is read, where it would land without the watcher, and the
   * next result that comes through clears it.
   */
  const updateFilter = config.updateFilter || basicUpdateFilter
  const failure = shallowRef<{error: unknown} | null>(null)

  const evaluate = (): Result | undefined => {
    try {
      const update = select()
      failure.value = null

      return update
    } catch (error) {
      failure.value = {error}

      return undefined
    }
  }

  const result = shallowRef(undefined as Result)
  let first = true

  /**
   * The source of the watcher runs the selector, so Vue tracks every reactive
   * read inside `fn` along with the state and the keys, as the computed before
   * the rewrite did. A fresh wrapper brings every run to the callback, where
   * `updateFilter` decides.
   */
  watch(
    () => ({update: evaluate()}),
    ({update}) => {
      if (first) {
        first = false
        result.value = update as Result
        return
      }
      if (failure.value) return
      if (updateFilter(update as Result, result.value)) {
        result.value = update as Result
      }
    },
    {flush: 'sync', immediate: true},
  )

  return computed(() => {
    if (failure.value) throw failure.value.error

    return result.value
  })
}
