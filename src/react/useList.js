//@flow
/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {type Store, is} from 'effector'
import {useStoreMap} from './useStore'

export function useList<T>(
  list: Store<T[]>,
  renderItem: (item: T, index: number) => React.Node,
): React.Node {
  if (!is.store(list))
    throw Error('expect useList first argument to be a store')
  if (typeof renderItem !== 'function')
    throw Error('expect useList second argument to be a function')
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
