import {Node, NodeUnit} from './index.h'
import {getGraph, getOwners, getLinks, getSubscribers, getMeta} from './getter'
import {is} from './is'
import {removeItem} from './collection'
import {CROSSLINK} from './tag'

const removeFromNode = (currentNode: Node, targetNode: Node) => {
  removeItem(currentNode.next, targetNode)
  removeItem(getOwners(currentNode), targetNode)
  removeItem(getLinks(currentNode), targetNode)
}
const clearNodeNormalized = (
  targetNode: Node,
  deep: boolean,
  isDomainUnit: boolean,
) => {
  targetNode.next.length = 0
  targetNode.seq.length = 0
  //@ts-expect-error
  targetNode.scope = null
  let currentNode
  let list = getLinks(targetNode)
  while ((currentNode = list.pop())) {
    removeFromNode(currentNode, targetNode)
    if (
      deep ||
      (isDomainUnit && getMeta(targetNode, 'op') !== 'sample') ||
      currentNode.family.type === CROSSLINK
    ) {
      clearNodeNormalized(
        currentNode,
        deep,
        getMeta(currentNode, 'op') !== 'on' && isDomainUnit,
      )
    }
  }
  list = getOwners(targetNode)
  while ((currentNode = list.pop())) {
    removeFromNode(currentNode, targetNode)
    if (isDomainUnit && currentNode.family.type === CROSSLINK) {
      clearNodeNormalized(
        currentNode,
        deep,
        getMeta(currentNode, 'op') !== 'on' && isDomainUnit,
      )
    }
  }
}
const clearMap = (map: Map<any, any> | Set<any>) => map.clear()
export const clearNode = (
  graphite: NodeUnit,
  {
    deep,
  }: {
    deep?: boolean
  } = {},
) => {
  let isDomainUnit = false
  //@ts-expect-error
  if (graphite.ownerSet) graphite.ownerSet.delete(graphite)
  if (is.store(graphite)) {
    clearMap(getSubscribers(graphite))
  } else if (is.domain(graphite)) {
    isDomainUnit = true
    const history = graphite.history
    clearMap(history.events)
    clearMap(history.effects)
    clearMap(history.stores)
    clearMap(history.domains)
  }
  clearNodeNormalized(getGraph(graphite), !!deep, isDomainUnit)
}
