import {run} from './step'
import {callStack} from './caller'
import {createNode} from './createNode'
import {Subscription, NodeUnit, Node} from './index.h'
import {createSubscription} from './subscription'
import {assert} from './throw'
import {isFunction, is} from './is'

export function traverseIncrementActivations(node: Node) {
  const lazy = node.lazy
  if (!lazy || lazy.alwaysActive) return
  lazy.active = true
  lazy.usedBy += 1
  lazy.activate.forEach(traverseIncrementActivations)
}

export function traverseDecrementActivations(node: Node) {
  const lazy = node.lazy
  if (!lazy || lazy.alwaysActive) return
  lazy.usedBy -= 1
  if (lazy.usedBy < 1) {
    lazy.active = false
  }
  lazy.activate.forEach(traverseDecrementActivations)
}
