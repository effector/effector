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
import {addUnsubscribe, createSubscription} from './subscription'
import {is, isFunction, assert} from './validate'

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
        node: prepareSeq(seq, u),
        meta: {
          watchOp: u.kind,
        },
      })

      links.push(node)

      unsubs.push(() => {
        const idx = links.indexOf(node)
        if (idx !== -1) links.splice(idx, 1)
        clearNode(node)
      })
    })
    return addUnsubscribe(() => {
      unsubs.forEach(u => u())
    })
  } else {
    return createSubscription(
      createNode({
        node: seq,
        parent: units,
        family: {owners: units},
      }),
    )
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
