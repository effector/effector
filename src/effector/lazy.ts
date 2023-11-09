import {getGraph} from './getter'
import {Node, NodeUnit} from './index.h'
import {is} from './is'
import {Event, Scope, Store} from './unit.h'

export function addActivator(
  activator: NodeUnit | NodeUnit[],
  toActivate: any[],
) {
  const activatorsList = [
    ...new Set(Array.isArray(activator) ? activator : [activator]),
  ]
    .map(getGraph)
    .filter(node => node.lazy)
  ;[...new Set(toActivate)].filter(Boolean).forEach(unit => {
    const toActivateNode = getGraph(unit)
    if (!toActivateNode.lazy) return
    activatorsList.forEach(activatorNode => {
      toActivateNode.lazy!.usedBy += activatorNode.lazy!.usedBy
      activatorNode.lazy!.activate.push(toActivateNode)
    })
  })
}

export function traverseSetAlwaysActive(node: Node) {
  const visited = new Set<Node>()
  ;(function traverse(node: Node) {
    if (visited.has(node)) return
    visited.add(node)
    const lazy = node.lazy
    if (!lazy) return
    if (lazy.alwaysActive) return
    lazy.active = true
    lazy.alwaysActive = true
    lazy.activate.forEach(traverse)
  })(node)
}

export function traverseIncrementActivations(node: Node, scope?: Scope) {
  // console.log('increment', node)
  const lazy = node.lazy
  if (!lazy || lazy.alwaysActive) return
  if (scope) {
    if (!scope.lazy[node.id]) {
      scope.lazy[node.id] = {usedBy: 0, config: lazy}
    }
    const scopeInfo = scope.lazy[node.id]
    scopeInfo.usedBy += 1
  } else {
    lazy.active = true
    lazy.usedBy += 1
  }
  lazy.activate.forEach(currentNode =>
    traverseIncrementActivations(currentNode, scope),
  )
}

export function traverseDecrementActivations(node: Node, scope?: Scope) {
  const lazy = node.lazy
  if (!lazy || lazy.alwaysActive) return
  if (scope) {
    if (scope.lazy[node.id]) {
      scope.lazy[node.id].usedBy -= 1
    }
  } else {
    lazy.usedBy -= 1
    if (lazy.usedBy < 1) {
      lazy.active = false
    }
  }
  lazy.activate.forEach(currentNode =>
    traverseDecrementActivations(currentNode, scope),
  )
}
