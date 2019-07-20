//@flow
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import type {Store} from 'effector'
import {useStoreMap} from './useStore'

export function useList<T>(
  list: Store<T[]>,
  renderItem: (item: T, index: number) => React.Node,
): React.Node {
  const Item = React.useMemo(() => {
    const Item = ({index}) => {
      const item = useStoreMap({
        store: list,
        keys: [index],
        fn: (list, keys) => list[keys[0]],
      })
      return renderItem(item, index)
    }
    Item.displayName = `${list.shortName || 'Unknown'}.Item`
    return React.memo(Item)
  }, [list])
  const length = useStoreMap({
    store: list,
    keys: [list],
    fn: list => list.length,
  })
  return Array.from({length}, (_, i) => <Item index={i} key={i} />)
}
