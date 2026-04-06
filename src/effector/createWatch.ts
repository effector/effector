import {clearNode} from './clearNode'
import {createNode} from './createNode'
import {callStack} from './caller'
import type {
  Subscription,
  Unit,
  Compute,
  MovStoreToRegister,
  NodeUnit,
} from './index.h'
import {run, compute, mov} from './step'
import type {Scope} from './unit.h'
import {is, isFunction, assert} from './validate'
import {
  traverseDecrementActivations,
  traverseIncrementActivations,
} from './lazy'

export function createWatch<T>({
  unit,
  fn,
  scope,
  batch,
}: {
  unit: Unit<T> | Unit<T>[]
  fn: (value: T) => any
  scope?: Scope
  batch?: boolean
}): Subscription {
  const seq: (Compute | MovStoreToRegister)[] = [run({fn: value => fn(value)})]
  if (batch) {
    seq.unshift(compute({priority: 'sampler', batch: true}))
  }
  if (is.store(unit)) {
    seq.unshift(
      mov({
        store: (unit as any).stateRef,
        to: 'stack',
      }),
    )
  }
  const units = Array.isArray(unit) ? unit : [unit]
  if (scope) {
    const unsubs: (() => void)[] = []
    const scopeLinks = scope.additionalLinks

    units.forEach(u => {
      const links = scopeLinks[u.graphite.id] || []
      scopeLinks[u.graphite.id] = links

      const node = createNode({
        alwaysActive: true,
        node: prepareSeq(seq, u),
        meta: {
          watchOp: u.kind,
        },
      })

      links.push(node)

      unsubs.push(() => {
        const idx = links.indexOf(node)
        if (idx !== -1) links.splice(idx, 1)
        /** note that watch node is not in scope.lazy map */
        traverseDecrementActivations(u.graphite, node, scope)
        clearNode(node)
      })

      /** note that watch node is not in scope.lazy map */
      traverseIncrementActivations(u.graphite, node, scope)
    })
    return addUnsubscribe(() => {
      unsubs.forEach(u => u())
    })
  } else {
    const activateList = units.map(unit => unit.graphite)
    const node = createNode({
      alwaysActive: true,
      activate: activateList,
      node: seq,
      parent: units,
      family: {owners: units},
    })
    activateList.forEach(currentNode =>
      traverseIncrementActivations(currentNode, node),
    )
    return createSubscription(node)
  }
}

function prepareSeq(seq: (Compute | MovStoreToRegister)[], unit: any) {
  if (is.store(unit)) {
    return [
      mov({
        store: (unit as any).stateRef,
        to: 'stack',
      }),
      ...seq,
    ]
  }

  return seq
}

export const watchUnit = (
  unit: NodeUnit,
  handler: (payload: any) => any,
): Subscription => {
  assert(isFunction(handler), '.watch argument should be a function')
  return createSubscription(
    createNode({
      scope: {fn: handler},
      node: [run({fn: callStack})],
      parent: unit,
      meta: {op: 'watch'},
      family: {owners: unit},
      regional: true,
    }),
  )
}

export const createSubscription = (node: NodeUnit): Subscription =>
  addUnsubscribe(() => clearNode(node))

const addUnsubscribe = (callback: () => void): Subscription => {
  const subscription: Subscription = () => callback()
  subscription.unsubscribe = () => callback()

  return subscription
}
