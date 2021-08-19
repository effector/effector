import {is, isObject} from '../is'
import {throwError} from '../throw'
import {launch} from '../kernel'
import type {Domain, Scope} from '../unit.h'
import type {Node} from '../index.h'
import {forEach, includes} from '../collection'
import {STORE} from '../tag'
import {normalizeValues} from './util'
import {getGraph, getLinks, getMeta, getOwners} from '../getter'

function traverse(root: Node, fn: (node: Node, sid: string) => void) {
  const list = [] as Node[]
  ;(function visit(node) {
    if (includes(list, node)) return
    list.push(node)
    if (getMeta(node, 'unit') === STORE && getMeta(node, 'sid')) {
      fn(node, getMeta(node, 'sid'))
    }
    forEach(node.next, visit)
    forEach(getOwners(node), visit)
    forEach(getLinks(node), visit)
  })(root)
}

/**
 hydrate state on client

 const root = createDomain()
 hydrate(root, {
  values: window.__initialState__
})

 */
export function hydrate(domain: Domain | Scope, {values}: {values: any}) {
  if (!isObject(values)) {
    throwError('values property should be an object')
  }
  const normalizedValues = normalizeValues(values)
  const valuesSidList = Object.getOwnPropertyNames(normalizedValues)
  const storeNodes: Node[] = []
  const storeValues: any[] = []
  let forkPage: Scope
  let traverseTarget: Node
  if (is.scope(domain)) {
    forkPage = domain
    Object.assign(forkPage.sidValuesMap, normalizedValues)
    if (!forkPage.cloneOf) throwError('scope should be created from domain')
    traverseTarget = getGraph(forkPage.cloneOf)
  } else if (is.domain(domain)) {
    traverseTarget = getGraph(domain)
  } else {
    throwError('first argument of hydrate should be domain or scope')
  }
  traverse(traverseTarget!, (node, sid) => {
    // forkPage.sidIdMap[sid] = node.scope.state.id
    if (includes(valuesSidList, sid)) {
      storeNodes.push(node)
      storeValues.push(normalizedValues[sid])
    }
  })
  launch({
    target: storeNodes,
    params: storeValues,
    forkPage: forkPage!,
  })
}
