import {getGraph} from './getter'
import {Node, NodeUnit} from './index.h'
import {Scope} from './unit.h'
import {removeItem, traverse} from './collection'
import {initRefAfterActivation} from './kernel'

function normalizeUnitsList(nodeUnit: NodeUnit | NodeUnit[]) {
  return [...new Set(Array.isArray(nodeUnit) ? nodeUnit : [nodeUnit])]
    .filter(Boolean)
    .map(getGraph)
    .filter(node => node.lazy)
}

export function addActivator(
  targets: NodeUnit | NodeUnit[],
  sources: any[],
  notUsed?: boolean,
) {
  const targetsList = normalizeUnitsList(targets)
  const sourcesList = normalizeUnitsList(sources)
  if (targetsList.some(node => node.lazy!.alwaysActive)) {
    sourcesList.forEach(traverseSetAlwaysActive)
  } else {
    const usedByDeps = targetsList
      .map(node => node.lazy!.usedBy)
      .flat()
      .filter(node => node.lazy)
    sourcesList.forEach(sourceNode => {
      traverse(sourceNode, (node, visit) => {
        const lazy = node.lazy
        if (!lazy) return
        if (lazy.alwaysActive) return
        if (
          lazy.usedBy.length === 0 &&
          targetsList.length > 0 &&
          node.scope.stateRef
        ) {
          initRefAfterActivation(node.scope.stateRef)
        }
        usedByDeps.forEach(depNode => {
          depNode.lazy!.activate.push(node)
          node.lazy!.usedBy.push(depNode)
        })
        if (!notUsed) {
          lazy.usedBy.push(...targetsList)
        }
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

export function traverseIncrementActivations(
  node: Node,
  usedBy: Node,
  scope?: Scope,
) {
  const lazy = node.lazy
  if (!lazy || lazy.alwaysActive) return
  if (scope) {
    if (!scope.lazy[node.id]) {
      scope.lazy[node.id] = {usedBy: [], config: lazy}
    }
    const scopeInfo = scope.lazy[node.id]
    scopeInfo.usedBy.push(usedBy)
  } else {
    lazy.usedBy.push(usedBy)
  }
  lazy.activate.forEach(currentNode =>
    traverseIncrementActivations(currentNode, usedBy, scope),
  )
}

export function traverseDecrementActivations(
  node: Node,
  usedBy: Node,
  scope?: Scope,
) {
  const lazy = node.lazy
  if (!lazy || lazy.alwaysActive) return
  if (scope) {
    if (scope.lazy[node.id]) {
      removeItem(scope.lazy[node.id].usedBy, usedBy)
    }
  } else {
    removeItem(lazy.usedBy, usedBy)
    if (lazy.usedBy.length === 0) {
      lazy.activate.forEach(currentNode =>
        traverseDecrementActivations(currentNode, node, scope),
      )
    }
  }
  lazy.activate.forEach(currentNode =>
    traverseDecrementActivations(currentNode, usedBy, scope),
  )
}
