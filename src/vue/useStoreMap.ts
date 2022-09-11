import { createWatch, is, Scope, Store } from "effector";
import { computed, onUnmounted, shallowReactive, shallowRef } from "vue-next";
import { getScope } from "./lib/get-scope";
import { stateReader } from "./lib/state-reader";
import { throwError } from "./lib/throw";

const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue

export function useStoreMap<State, Result, Keys = unknown>(
  config: {
    store: Store<State>;
    keys?: () => Keys;
    fn: (state: State, keys: Keys) => Result;
    updateFilter?: (update: Result, current: Result) => boolean;
    defaultValue?: Result;
  },
  scope?: Scope
) {
  if (!is.store(config.store)) throwError('useStoreMap expects a store')
  if (config.keys !== undefined && typeof config.keys !== 'function') throwError('useStoreMap expects keys as a function')
  if (typeof config.fn !== 'function') throwError('useStoreMap expects fn as a function')


  let _scope = scope || getScope().scope
  let keys = config.keys ? computed(config.keys) : computed(() => undefined as Keys)
  let updateFilter = config.updateFilter || basicUpdateFilter;

  let state = stateReader(config.store, _scope)
  let isShape = typeof state === "object" && Array.isArray(state) === false

  let _ = isShape ? shallowReactive(state as any) : shallowRef(state)

  let stop = createWatch({
    unit: config.store,
    fn: (value) => {
      if (isShape) {
        for (let key in value) {
          if (updateFilter(value[key] as Result, _[key])) {
            _[key] = value[key]
          }
        }
      } else {
        if (value !== undefined && updateFilter(value as unknown as Result, _.value)) {
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
    let result = config.fn(isShape ? _ : _.value, keys.value)
    return result !== undefined ? result : config.defaultValue
  })
}
