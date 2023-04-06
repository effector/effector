import {is, isObject} from '../is'
import {assert} from '../throw'
import {launch} from '../kernel'
import type {Domain, Scope, ValuesMap} from '../unit.h'
import type {Node} from '../index.h'
import {add, includes} from '../collection'
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
  const {sidMap, idMap} = normalizeValues(values)
  const valuesSidList = Object.getOwnPropertyNames(sidMap)
  const storeNodes: Node[] = []
  const storeValues: any[] = []
  let forkPage: Scope
  let traverseTarget: Node
  let needToAssign: true | void
  if (is.scope(domain)) {
    forkPage = domain
    needToAssign = true
    assert(forkPage.cloneOf, 'scope should be created from domain')
    traverseTarget = getGraph(forkPage.cloneOf)
  } else if (is.domain(domain)) {
    traverseTarget = getGraph(domain)
  } else {
    assert(false, 'first argument of hydrate should be domain or scope')
  }
  traverseStores(traverseTarget!, (node, sid) => {
    // forkPage.sidIdMap[sid] = node.scope.state.id
    if (includes(valuesSidList, sid)) {
      add(storeNodes, node)
      const serializer = getMeta(node, 'serialize')
      if (serializer && serializer !== 'ignore') {
        sidMap[sid] = serializer.read(sidMap[sid])
      }
      add(storeValues, sidMap[sid])
    }
  })
  launch({
    target: storeNodes,
    params: storeValues,
    scope: forkPage!,
  })
  if (needToAssign) {
    Object.assign(forkPage!.sidValuesMap, sidMap)
  }
}
