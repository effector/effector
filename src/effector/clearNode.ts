import {Node, NodeUnit} from './index.h'
import {getGraph, getOwners, getLinks} from './getter'
import {is} from './is'
import {includes, removeItem} from './collection'
import {CROSSLINK} from './tag'

const removeFromNode = (currentNode: Node, targetNode: Node) => {
  removeItem(currentNode.next, targetNode)
  removeItem(getOwners(currentNode), targetNode)
  removeItem(getLinks(currentNode), targetNode)
}
export const clearNodeLight = (targetNode: Node) => {
  targetNode.next.length = 0
  targetNode.seq.length = 0
  //@ts-expect-error
  targetNode.scope = null
  let currentNode: Node | void
  let list = getLinks(targetNode)
  while ((currentNode = list.pop())) {
    removeFromNode(currentNode, targetNode)
  }
  list = getOwners(targetNode)
  while ((currentNode = list.pop())) {
    removeFromNode(currentNode, targetNode)
  }
}
/** These nodes should be cleared but dissalow clearing of any links */
const nonPassableNodes = [
  'on',
  'reset',
  'sample',
  'split',
  'merge',
  'guard',
  'forward',
]
const clearNodeNormalized = (
  targetNode: Node,
  deep: boolean,
  isDomainUnit: boolean,
  regionNode: Node | null,
  extractOnly: boolean,
) => {
  targetNode.next.length = 0
  targetNode.seq.length = 0
  //@ts-expect-error
  targetNode.scope = null
  let currentNode
  let list = getLinks(targetNode)
  const isRegionNode = targetNode.meta.isRegion
  const nextRegionNode = isRegionNode ? targetNode : regionNode
  if (list.length > 0) {
    const targetIsOp = includes(nonPassableNodes, targetNode.meta.op)
    const canGoDeep = !isRegionNode && !extractOnly
    const domainSampleEdgeCase = canGoDeep && isDomainUnit && !targetIsOp
    while ((currentNode = list.pop())) {
      const isTrigger = includes(currentNode.next, targetNode)
      removeFromNode(currentNode, targetNode)
      if (isRegionNode) {
        clearNodeNormalized(currentNode, false, false, targetNode, true)
      }
      if (!isTrigger) {
        currentNode.family.triggers -= 1
      }
      if (
        deep ||
        domainSampleEdgeCase ||
        (canGoDeep && currentNode.family.type === CROSSLINK && !targetIsOp) ||
        (extractOnly &&
          includes(nonPassableNodes, currentNode.meta.op) &&
          ((isTrigger && currentNode.next.length === 0) ||
            (!isTrigger && currentNode.family.triggers <= 0)))
      ) {
        clearNodeNormalized(
          currentNode,
          deep,
          isDomainUnit && currentNode.meta.op !== 'on',
          nextRegionNode,
          extractOnly,
        )
      }
    }
  }
  list = getOwners(targetNode)
  while ((currentNode = list.pop())) {
    removeFromNode(currentNode, targetNode)
    if (isDomainUnit && currentNode.family.type === CROSSLINK) {
      clearNodeNormalized(
        currentNode,
        deep,
        currentNode.meta.op !== 'on',
        nextRegionNode,
        extractOnly,
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
  if (is.domain(graphite)) {
    isDomainUnit = true
    const history = graphite.history
    clearMap(history.events)
    clearMap(history.effects)
    clearMap(history.stores)
    clearMap(history.domains)
  }
  clearNodeNormalized(getGraph(graphite), !!deep, isDomainUnit, null, false)
}
