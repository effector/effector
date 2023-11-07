import {Node} from './index.h'
import {Scope} from './unit.h'

export function traverseSetAlwaysActive(node: Node) {
  const lazy = node.lazy
  if (!lazy) return
  lazy.active = true
  lazy.alwaysActive = true
  lazy.activate.forEach(traverseSetAlwaysActive)
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
