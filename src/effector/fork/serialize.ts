import {Scope, Store} from '../unit.h'
import {forEach, forIn} from '../collection'

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
  // const flat = flatGraph(scope.cloneOf)
  // forEach(flat, ({meta, scope: nodeScope}) => {
  //   if (meta.unit !== STORE) return
  //   const {sid} = meta
  //   if (!sid) return
  //   if (ignoredStores.includes(sid)) return
  //   const id = nodeScope.state.id
  //   const explicitlyDefined = sid in scope.sidValuesMap
  //   if (!scope.changedStores.has(id) && !explicitlyDefined) return
  //   // initRefInScope(scope, nodeScope.state, true)
  //   if (!scope.reg[id]) {
  //     scope.reg[id] = {
  //       id,
  //       current: explicitlyDefined
  //         ? scope.sidValuesMap[sid]
  //         : nodeScope.state.current,
  //     }
  //   }
  //   result[sid] = scope.reg[id].current
  // })
  return result
}
