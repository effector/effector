//@flow

import {
  type Graph,
  type Graphite,
  type Cmd,
  getGraph,
  getOwners,
  getLinks,
} from './stdlib'
import {store as isStore, domain as isDomain} from './stdlib/is'

const removeItem = (list, item) => {
  const pos = list.indexOf(item)
  if (pos !== -1) {
    list.splice(pos, 1)
  }
}

const clearNodeNormalized = (
  targetNode: Graph,
  deep: boolean,
  isDomainUnit,
) => {
  targetNode.next.length = 0
  targetNode.seq.length = 0
  //$off
  targetNode.scope = null
  let currentNode
  let list = getLinks(targetNode)
  while ((currentNode = list.pop())) {
    removeItem(getOwners(currentNode), targetNode)
    if (deep || isDomainUnit || currentNode.family.type === 'crosslink') {
      clearNodeNormalized(currentNode, deep, isDomainUnit)
    }
  }
  list = getOwners(targetNode)
  while ((currentNode = list.pop())) {
    removeItem(currentNode.next, targetNode)
    removeItem(getLinks(currentNode), targetNode)
    if (
      currentNode.family.type === 'crosslink' ||
      (isDomainUnit && currentNode.family.type === 'regular')
    ) {
      clearNodeNormalized(currentNode, deep, isDomainUnit)
    }
  }
}
const clearMap = (map: any) => map.clear()
export const clearNode = (
  graphite: Graphite,
  {
    deep,
  }: {
    deep?: boolean,
    ...
  } = {},
) => {
  let isDomainUnit = false
  if (isStore(graphite)) {
    clearMap(graphite.subscribers)
  } else if (isDomain(graphite)) {
    isDomainUnit = true
    const history = getGraph(graphite).scope.history
    clearMap(history.events)
    clearMap(history.effects)
    clearMap(history.storages)
    clearMap(history.domains)
  }
  clearNodeNormalized(getGraph(graphite), !!deep, isDomainUnit)
}
