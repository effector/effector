import type {Scope, Store} from '../unit.h'
import {forIn} from '../collection'

/**
 serialize state on server
 */
export function serialize(
  scope: Scope,
  {ignore = []}: {ignore?: Array<Store<any>>; onlyChanges?: boolean} = {},
) {
  const ignoredStores = ignore.map(({sid}) => sid)
  const result = {} as Record<string, any>
  forIn(scope.sidValuesMap, (value, sid) => {
    if (ignoredStores.includes(sid)) return
    const id = scope.sidIdMap[sid]
    // if (!scope.changedStores.has(id)) return
    if (id && id in scope.reg) {
      result[sid] = scope.reg[id].current
    } else {
      result[sid] = value
    }
  })
  return result
}
