import {clearNode} from './clearNode'
import {createNode} from './createNode'
import type {Subscription, Unit, Compute, MovStoreToRegister} from './index.h'
import {step} from './step'
import {Scope} from './unit.h'
import {addUnsubscribe} from './subscription'
import {is} from './is'
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
  const seq: (Compute | MovStoreToRegister)[] = [
    step.run({fn: value => fn(value)}),
  ]
  if (batch) {
    seq.unshift(step.compute({priority: 'sampler', batch: true}))
  }
  if (is.store(unit)) {
    seq.unshift(
      step.mov({
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
        traverseDecrementActivations(u.graphite, scope)
        clearNode(node)
      })

      /** note that watch node is not in scope.lazy map */
      traverseIncrementActivations(u.graphite, scope)
      node.lazy = {
        alwaysActive: true,
        usedBy: 0,
        activate: [],
      }
    })
    return addUnsubscribe(() => {
      unsubs.forEach(u => u())
    })
  } else {
    const node = createNode({
      node: seq,
      parent: units,
      family: {owners: units},
    })
    const activateList = units.map(unit => unit.graphite)
    activateList.forEach(currentNode =>
      traverseIncrementActivations(currentNode),
    )
    node.lazy = {
      alwaysActive: true,
      usedBy: 0,
      activate: activateList,
    }
    return addUnsubscribe(() => {
      clearNode(node)
    })
  }
}

function prepareSeq(seq: (Compute | MovStoreToRegister)[], unit: any) {
  if (is.store(unit)) {
    return [
      step.mov({
        store: (unit as any).stateRef,
        to: 'stack',
      }),
      ...seq,
    ]
  }

  return seq
}
