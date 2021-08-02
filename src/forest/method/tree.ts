import type {Store} from 'effector'

import {rec} from './rec'
import {list} from './list'

export function tree<
  T,
  ChildField extends keyof T,
  // KeyField extends keyof T
>(config: {
  source: Store<T[]>
  // key: T[KeyField] extends string ? KeyField : never
  child: T[ChildField] extends T[] ? ChildField : never
  fn: (config: {store: Store<T>; child: () => void}) => void
}): void
export function tree({
  source,
  key,
  child: childField,
  fn,
}: {
  source: Store<any[]>
  key?: string
  child: string
  fn: Function
}) {
  const treeRec = rec<any[]>(({store}) => {
    list({
      source: store,
      key: key!,
      fn({store}) {
        const childList = store.map(value => value[childField] || [])
        fn({
          store,
          child() {
            treeRec({
              store: childList,
            })
          },
        })
      },
    })
  })
  treeRec({
    store: source,
  })
}
