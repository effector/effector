import {is, isObject} from '../is'
import {assert, deprecate} from '../throw'
import {launch} from '../kernel'
import type {Domain, Scope, ValuesMap, Store} from '../unit.h'
import type {Node} from '../index.h'
import {add, forEach, includes} from '../collection'
import {normalizeValues, traverseStores} from './util'
import {getGraph, getMeta} from '../getter'

/**
 hydrate state on client

 const root = createDomain()
 hydrate(root, {
  values: window.__initialState__
})

 */
export function hydrate(domain: Domain | Scope, {values}: {values: ValuesMap}) {
  assert(isObject(values), 'values property should be an object')
  const {sidMap, unitMap} = normalizeValues(values)
  const valuesSidList = Object.getOwnPropertyNames(sidMap)
  const storesRefIdMap: Record<string, Store<any>> = {}
  forEach(unitMap as unknown as Map<Store<any>, any>, (_, unit) => {
    storesRefIdMap[unit.stateRef.id] = unit
  })
  // Array.from(unitMap.keys(),
  const storeNodes: Node[] = []
  const storeValues: any[] = []
  let forkPage: Scope
  let traverseTarget: Node
  let needToAssign: true | void
  if (is.scope(domain)) {
    forkPage = domain
    needToAssign = true
    assert(forkPage.cloneOf, 'scope should be created from domain')
    deprecate(false, 'hydrate(fork(domain), { values })', 'fork({ values })')
    traverseTarget = getGraph(forkPage.cloneOf)
  } else if (is.domain(domain)) {
    deprecate(false, 'hydrate(domain, { values })', 'fork({ values })')
    traverseTarget = getGraph(domain)
  } else {
    assert(false, 'first argument of hydrate should be domain or scope')
  }
  traverseStores(
    traverseTarget!,
    (node, sid) => {
      // forkPage.sidIdMap[sid] = node.scope.state.id
      if (sid && includes(valuesSidList, sid)) {
        add(storeNodes, node)
        const serializer = getMeta(node, 'serialize')
        if (serializer && serializer !== 'ignore') {
          sidMap[sid] = serializer.read(sidMap[sid])
        }
        add(storeValues, sidMap[sid])
      } else if (node.scope.state.id in storesRefIdMap) {
        add(storeNodes, node)
        add(storeValues, unitMap.get(storesRefIdMap[node.scope.state.id]))
      }
    },
    true,
  )
  launch({
    target: storeNodes,
    params: storeValues,
    scope: forkPage!,
  })
  if (needToAssign) {
    Object.assign(forkPage!.values.sidMap, sidMap)
  }
}
