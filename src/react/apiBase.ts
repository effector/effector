import {Store, is, Scope} from 'effector'
import React from 'react'
import {useIsomorphicLayoutEffect} from './useIsomorphicLayoutEffect'
import {throwError} from './throw'
import {createWatch} from './createWatch'
import {withDisplayName} from './withDisplayName'

const stateReader = <T>(store: Store<T>, scope?: Scope) =>
  scope ? scope.getState(store) : store.getState()
const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue
const createNotifier = () =>
  React.useReducer((n: any, action: void) => n + 1, 0)[1]

export function useStoreBase<State>(store: Store<State>, scope?: Scope) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  const currentValue = stateReader(store, scope)
  const inc = createNotifier()
  const currentStore = React.useRef({
    store,
    value: currentValue,
    pending: false,
  })
  useIsomorphicLayoutEffect(() => {
    const stop = createWatch(
      store,
      upd => {
        const ref = currentStore.current
        if (!ref.pending) {
          ref.value = upd
          ref.pending = true
          inc()
          ref.pending = false
        }
      },
      scope,
    )
    const newValue = stateReader(store, scope)
    const ref = currentStore.current
    if (ref.store === store && ref.value !== newValue) {
      ref.value = newValue
      ref.pending = true
      inc()
      ref.pending = false
    }
    ref.store = store
    return stop
  }, [store])
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
): Result {
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
  const result = React.useRef<{
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
    store: Store<State>
  }>({} as any)
  const refState = result.current
  refState.fn = fn
  refState.upd = updateFilter
  refState.init = refState.store === store
  refState.store = store
  const inc = createNotifier()
  const stop = React.useMemo(() => {
    updateRef(stateReader(store, scope), keys, result.current)
    return createWatch(
      store,
      val => updateRef(val, keys, result.current, inc),
      scope,
    )
  }, keys)
  useIsomorphicLayoutEffect(() => () => stop(), keys)
  return refState.val
}
function updateRef<State, Keys, Result>(
  sourceValue: State,
  keys: Keys,
  refState: {
    fn: (state: State, keys: Keys) => Result
    upd: (update: Result, current: Result) => boolean
    val: Result
    init: boolean
  },
  inc?: React.DispatchWithoutAction,
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
      inc && inc()
    }
  }
}
export function useListBase<T>(
  list: Store<T[]>,
  renderItem:
    | {
        keys?: any[]
        fn(item: T, index: number): React.ReactNode
        getKey?: (item: T) => string
      }
    | ((item: T, index: number) => React.ReactNode),
  scope?: Scope,
): React.ReactNode {
  let keys = [] as any[]
  let fn
  let getKey: (item: T) => string
  if (typeof renderItem === 'object' && renderItem !== null) {
    if (renderItem.keys) keys = renderItem.keys
    fn = renderItem.fn
    if (renderItem.getKey) getKey = renderItem.getKey
  } else {
    fn = renderItem
  }
  if (!is.store(list)) throwError('expect useList first argument to be a store')
  if (typeof fn !== 'function')
    throwError("expect useList's renderItem to be a function")
  if (!Array.isArray(keys)) throwError("expect useList's keys to be an array")
  const Item = React.useMemo(() => {
    const Item = withDisplayName(
      `${list.shortName || 'Unknown'}.Item`,
      (
        props:
          | {index: number; keys: any[]; keyVal: never; value: never}
          | {index: never; keys: any[]; keyVal: string; value: T},
      ) => {
        const {index, keys, keyVal, value} = props
        const isKeyed = !!fnRef.current[1]
        if (isKeyed) {
          return fnRef.current[0](value, keyVal as any)
        }
        const item = useStoreMapBase(
          [
            {
              store: list,
              keys: [index, ...keys],
              fn: (list, keys) => list[keys[0]],
            },
          ],
          scope,
        )
        return fnRef.current[0](item, index)
      },
    )
    return React.memo(Item)
  }, [list, !!getKey!])
  const fnRef = React.useRef([fn, getKey!] as const)
  fnRef.current = [fn, getKey!]
  const keysSelfMemo = React.useMemo(() => keys, keys)
  if (getKey!) {
    return useStoreBase(list, scope).map(value => {
      const key = fnRef.current[1](value)
      return React.createElement(Item, {
        keyVal: key,
        key,
        keys: keysSelfMemo,
        value,
      })
    })
  } else {
    const length = useStoreMapBase(
      [
        {
          store: list,
          keys: [list],
          fn: list => list.length,
        },
      ],
      scope,
    )
    return Array.from({length}, (_, i) =>
      React.createElement(Item, {
        index: i,
        key: i,
        keys: keysSelfMemo,
      }),
    )
  }
}
