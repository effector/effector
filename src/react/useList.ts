/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import {Store, is} from 'effector'
import {useStoreMap} from './useStore'
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
      (props: {index: number; keys: any[]; keyVal?: string}) => {
        const {index, keys, keyVal} = props
        const item = useStoreMap({
          store: list,
          keys: [index, ...keys],
          fn: (list, keys) => list[keys[0]],
        })
        return fnRef.current(item, 'keyVal' in props ? (keyVal as any) : index)
      },
    )
    return React.memo(Item)
  }, [list])
  const fnRef = React.useRef(fn)
  fnRef.current = fn
  const keysSelfMemo = React.useMemo(() => keys, keys)
  if (getKey!) {
    const keysList = useStoreMap({
      store: list,
      keys: [list],
      fn: list => list.map(getKey),
    })
    return Array.from(keysList, (key, i) =>
      React.createElement(Item, {
        index: i,
        keyVal: key,
        key,
        keys: keysSelfMemo,
      }),
    )
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
