import {getGraph} from './getter'
import {Node, NodeUnit} from './index.h'
import {is} from './is'
import {Event, Scope, Store} from './unit.h'
import {traverse} from './collection'

function normalizeUnitsList(nodeUnit: NodeUnit | NodeUnit[]) {
  return [...new Set(Array.isArray(nodeUnit) ? nodeUnit : [nodeUnit])]
    .filter(Boolean)
    .map(getGraph)
    .filter(node => node.lazy)
}

export function addActivator(targets: NodeUnit | NodeUnit[], sources: any[]) {
  const targetsList = normalizeUnitsList(targets)
  const sourcesList = normalizeUnitsList(sources)
  if (targetsList.some(node => node.lazy!.alwaysActive)) {
    sourcesList.forEach(traverseSetAlwaysActive)
  } else {
    const usedBySum = targetsList.reduce(
      (sum, node) => node.lazy!.usedBy + sum,
      0,
    )
    sourcesList.forEach(sourceNode => {
      traverse(sourceNode, (node, visit) => {
        const lazy = node.lazy
        if (!lazy) return
        if (lazy.alwaysActive) return
        lazy.usedBy += usedBySum
        lazy.activate.forEach(visit)
      })
      targetsList.forEach(targetNode => {
        targetNode.lazy!.activate.push(sourceNode)
      })
    })
  }
}

export function traverseSetAlwaysActive(node: Node) {
  traverse(node, (node, visit) => {
    const lazy = node.lazy
    if (!lazy) return
    if (lazy.alwaysActive) return
    lazy.alwaysActive = true
    lazy.activate.forEach(visit)
  })
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
  }
  lazy.activate.forEach(currentNode =>
    traverseDecrementActivations(currentNode, scope),
  )
}
