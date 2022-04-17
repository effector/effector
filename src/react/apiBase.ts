import {Store, is, Scope} from 'effector'
import React from 'react'
import {useSyncExternalStore} from 'use-sync-external-store/shim'
import {useSyncExternalStoreWithSelector} from 'use-sync-external-store/shim/with-selector'
import {throwError} from './throw'
import {createWatch} from './createWatch'
import {withDisplayName} from './withDisplayName'

const stateReader = <T>(store: Store<T>, scope?: Scope) =>
  scope ? scope.getState(store) : store.getState()
const basicUpdateFilter = <T>(upd: T, oldValue: T) => upd !== oldValue
const keysEqual = (a?: readonly any[], b?: readonly any[]) => {
  if (!a || !b || a.length !== b.length) return false

  let isEqual = true

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      isEqual = false
      break
    }
  }

  return isEqual
}

export function useStoreBase<State>(store: Store<State>, scope?: Scope) {
  if (!is.store(store)) throwError('expect useStore argument to be a store')

  const subscribe = (cb: () => void) => createWatch(store, cb, scope)
  const read = () => stateReader(store, scope)
  const currentValue = useSyncExternalStore(subscribe, read, read)

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

  const subscribe = (cb: () => void) => createWatch(store, cb, scope)
  const read = () => stateReader(store, scope)

  const stateRef = React.useRef<State>()
  const valueRef = React.useRef<Result>()
  const keysRef = React.useRef(keys)

  const value = useSyncExternalStoreWithSelector(
    subscribe,
    read,
    read,
    state => {
      if (stateRef.current !== state || !keysEqual(keysRef.current, keys)) {
        const result = fn(state, keys)

        stateRef.current = state
        keysRef.current = keys

        // skip update, if undefined
        // just like original store or previous implementation
        if (result !== undefined) {
          valueRef.current = result
        }
      }

      return valueRef.current as Result
    },
    // `updateFilter` always had (next, prev) arguments, but `isEqual` of this hook has (prev, next) order of arguments
    (a, b) => !updateFilter(b, a),
  )

  return value
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
  }, [list, scope, !!getKey!])
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
