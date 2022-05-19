import {createWatch, is, Scope, Store} from 'effector'
import {throwError} from './throw'
import {Accessor, createMemo, createSignal, onCleanup} from 'solid-js'

const stateReader = <T>(store: Store<T>, scope?: Scope) =>
  scope ? scope.getState(store) : store.getState()
const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue

export function useStoreBase<State>(store: Store<State>, scope?: Scope) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  const value = stateReader(store, scope)
  const [currentValue, setCurrentValue] = createSignal(value)

  const stop = createWatch({
    unit: store,
    fn: upd => setCurrentValue(() => upd),
    scope,
  })

  onCleanup(stop)

  return currentValue
}

export function useStoreMapBase<State, Result, Keys extends ReadonlyArray<any>>(
  [configOrStore, separateFn]: [
    configOrStore:
      | {
          store: Store<State>
          keys: Keys
          fn(state: State, keys: Keys): Result
          updateFilter?: (update: Result, current: Result) => boolean
        }
      | Store<State>,
    separateFn?: (state: State, keys: Keys) => Result,
  ],
  scope?: Scope,
): Accessor<Result> {
  let fn: (state: State, keys: Keys) => Result
  let updateFilter: (update: Result, current: Result) => boolean =
    basicUpdateFilter
  let store: Store<State>
  let keys: Keys
  if (separateFn) {
    fn = separateFn
    store = configOrStore as Store<State>
    keys = [] as unknown as Keys
  } else {
    fn = (configOrStore as any).fn
    store = (configOrStore as any).store
    keys = (configOrStore as any).keys
    updateFilter = (configOrStore as any).updateFilter || basicUpdateFilter
  }
  if (!is.store(store)) throwError('useStoreMap expects a store')
  if (!Array.isArray(keys)) throwError('useStoreMap expects an array as keys')
  if (typeof fn !== 'function') throwError('useStoreMap expects a function')
  const [result, setResult] = createSignal<{
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
    store: Store<State>
    active: boolean
  }>({} as any, {equals: false})
  const refState = result()
  refState.fn = fn
  refState.upd = updateFilter
  refState.init = refState.store === store
  refState.store = store
  refState.active = true
  onCleanup(() => {
    if (refState) {
      refState.active = false
    }
  })
  const inc = () => setResult(refState)

  updateRef(stateReader(store, scope), keys, refState)
  const stop = createWatch({
    unit: store,
    fn: val => updateRef(val, keys, refState, inc),
    scope: scope,
  })

  onCleanup(stop)

  return createMemo(() => result().val)
}

function updateRef<State, Keys, Result>(
  sourceValue: State,
  keys: Keys,
  refState: {
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
    active: boolean
  },
  inc?: () => void,
) {
  const newValue = refState.fn(sourceValue, keys)
  if (!refState.init) {
    refState.val = newValue
    refState.init = true
  } else {
    if (
      newValue !== undefined &&
      basicUpdateFilter(newValue, refState.val) &&
      refState.upd(newValue, refState.val)
    ) {
      refState.val = newValue
      inc && refState.active && inc()
    }
  }
}
