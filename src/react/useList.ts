/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import {Store, is} from 'effector'
import {useStore, useStoreMap} from './useStore'
import {withDisplayName} from './withDisplayName'
import {throwError} from './throw'

export function useList<T>(
  list: Store<T[]>,
  renderItem:
    | {
        keys?: any[]
        fn(item: T, index: number): React.ReactNode
        getKey?: (item: T) => string
      }
    | ((item: T, index: number) => React.ReactNode),
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
        const item = useStoreMap({
          store: list,
          keys: [index, ...keys],
          fn: (list, keys) => list[keys[0]],
        })
        return fnRef.current[0](item, index)
      },
    )
    return React.memo(Item)
  }, [list, !!getKey!])
  const fnRef = React.useRef([fn, getKey!] as const)
  fnRef.current = [fn, getKey!]
  const keysSelfMemo = React.useMemo(() => keys, keys)
  if (getKey!) {
    return useStore(list).map(value => {
      const key = fnRef.current[1](value)
      return React.createElement(Item, {
        keyVal: key,
        key,
        keys: keysSelfMemo,
        value,
      })
    })
  } else {
    const length = useStoreMap({
      store: list,
      keys: [list],
      fn: list => list.length,
    })
    return Array.from({length}, (_, i) =>
      React.createElement(Item, {
        index: i,
        key: i,
        keys: keysSelfMemo,
      }),
    )
  }
}
