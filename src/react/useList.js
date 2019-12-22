//@flow
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {type Store, is} from 'effector'
import {useStoreMap} from './useStore'

export function useList<T>(
  list: Store<T[]>,
  renderItem:
    | {
        keys?: any[],
        fn(item: T, index: number): React.Node,
      }
    | ((item: T, index: number) => React.Node),
): React.Node {
  let keys = []
  let fn
  if (typeof renderItem === 'object' && renderItem !== null) {
    if (renderItem.keys) keys = renderItem.keys
    fn = renderItem.fn
  } else {
    fn = renderItem
  }
  if (!is.store(list))
    throw Error('expect useList first argument to be a store')
  if (typeof fn !== 'function')
    throw Error("expect useList's renderItem to be a function")
  if (!Array.isArray(keys)) throw Error("expect useList's keys to be an array")
  const Item = React.useMemo(() => {
    const Item = ({index, keys}) => {
      const item = useStoreMap({
        store: list,
        keys: [index, ...keys],
        fn: (list, keys) => list[keys[0]],
      })
      return fnRef.current(item, index)
    }
    Item.displayName = `${list.shortName || 'Unknown'}.Item`
    return React.memo(Item)
  }, [list])
  const length = useStoreMap({
    store: list,
    keys: [list],
    fn: list => list.length,
  })
  const fnRef = React.useRef(fn)
  fnRef.current = fn
  const keysSelfMemo = React.useMemo(() => keys, keys)
  return Array.from({length}, (_, i) => (
    <Item index={i} key={i} keys={keysSelfMemo} />
  ))
}
