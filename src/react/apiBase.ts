import {
  Store,
  is,
  createNode,
  step,
  clearNode,
  scopeBind,
  Scope,
  Unit,
  Event,
  Node,
} from 'effector'
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

  const subscribe = React.useCallback(
    (cb: () => void) => createWatch(store, cb, scope),
    [store, scope],
  )
  const read = React.useCallback(
    () => stateReader(store, scope),
    [store, scope],
  )
  const currentValue = useSyncExternalStore(subscribe, read, read)

  return currentValue
}

export function useUnitBase<Shape extends {[key: string]: Unit<any>}>(
  shape: Shape,
  scope?: Scope,
) {
  const isShape = !is.unit(shape) && typeof shape === 'object'
  const normShape = isShape ? shape : {unit: shape}
  const isList = Array.isArray(normShape)
  const entries = Object.entries(normShape)
  const [current, storeMap, stores] = React.useMemo(() => {
    const initial: Record<string, any> = isList ? [] : {}
    const stores: Store<any>[] = []
    const storeMap: Record<string, string> = {}
    for (const [key, value] of entries) {
      if (is.store(value)) {
        if (stores.includes(value)) {
          throwError(`useUnit store at key "${key}" is already exists in shape`)
        }
        stores.push(value)
        /** note that this allows only one occurence of the store */
        storeMap[(value as any).graphite.id] = key
        initial[key] = stateReader(value, scope)
      } else {
        if (!is.unit(value)) throwError('expect useUnit argument to be a unit')
        initial[key] = scope ? scopeBind(value as Event<any>, {scope}) : value
      }
    }
    return [{ref: initial}, storeMap, stores]
  }, [...entries.flat(), scope])
  const subscribe = React.useCallback(
    (cb: () => void) => {
      const seq = [
        step.compute({
          fn(value, _, stack) {
            const storeId = stack.parent!.node.id
            const storeKey = storeMap[storeId]
            current.ref = isList
              ? [...(current.ref as any[])]
              : {...current.ref}
            current.ref[storeKey] = value
          },
        }),
        /**
         * 'effect' priority cannot be batched
         * so we wait other effects to finish and then run batching
         * this is not an essential to work
         * just a fine tuning of a really low priority (ui) update
         *
         * also note that step.run({fn}) is an alias for
         * step.compute({fn, priority: 'effect'})
         * and since 22 version fn might be ommited if not used
         * */
        step.compute({priority: 'effect'}),
        step.compute({priority: 'sampler', batch: true}),
        step.run({fn: () => cb()}),
      ]
      if (scope) {
        const node = createNode({node: seq})
        const scopeLinks: {[_: string]: Node[]} = (scope as any).additionalLinks
        const storeLinks: Node[][] = []
        stores.forEach(store => {
          const id = (store as any).graphite.id
          const links = scopeLinks[id] || []
          scopeLinks[id] = links
          links.push(node)
          storeLinks.push(links)
        })
        return () => {
          storeLinks.forEach(links => {
            const idx = links.indexOf(node)
            if (idx !== -1) links.splice(idx, 1)
          })
          clearNode(node)
        }
      } else {
        const node = createNode({
          node: seq,
          parent: stores,
          family: {owners: stores},
        })
        return () => {
          clearNode(node)
        }
      }
    },
    [current],
  )
  const read = React.useCallback(
    () => (isShape ? current.ref : current.ref.unit),
    [current],
  )
  return useSyncExternalStore(subscribe, read, read)
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

  const subscribe = React.useCallback(
    (cb: () => void) => createWatch(store, cb, scope),
    [store, scope],
  )
  const read = React.useCallback(
    () => stateReader(store, scope),
    [store, scope],
  )

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
    (current, update) => !updateFilter(update, current),
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
