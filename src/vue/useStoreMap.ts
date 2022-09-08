import { createWatch, is, Scope, Store } from "effector";
import { computed, onUnmounted, shallowReactive, shallowRef } from "vue-next";
import { getScope } from "./lib/get-scope";
import { stateReader } from "./lib/state-reader";
import { throwError } from "./lib/throw";

export function useStoreMap<State, Result, Keys = unknown>(
  {
    store,
    keys,
    fn,
    defaultValue,
  }: {
    store: Store<State>;
    keys: () => Keys;
    fn: (state: State, keys: Keys) => Result;
    defaultValue?: Result;
  },
  scope?: Scope
) {
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (typeof keys !== 'function') throwError('useStoreMap expects a function')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')


  let _scope = scope || getScope().scope
  let _keys = computed(keys)

  let state = stateReader(store, _scope)
  let isShape = typeof state === "object" && Array.isArray(state) === false

  let _ = isShape ? shallowReactive(state as any) : shallowRef(state)

  let stop = createWatch({
    unit: store,
    fn: (value) => {
      if (isShape) {
        for (let key in value) {
          _[key] = value[key]
        }
      } else {
        if (_.value !== value) {
          _.value = value
        }
      }
    },
    scope: _scope
  })

  onUnmounted(() => {
    stop()
  })

  return computed(() => {
    let result = fn(isShape ? _ : _.value, _keys.value)
    return result !== undefined ? result : defaultValue
  })
}
