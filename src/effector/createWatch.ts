import {clearNode} from './clearNode'
import {createNode} from './createNode'
import type {Node, Subscription, Unit} from './index.h'
import {step} from './step'
import {Scope} from './unit.h'
import {addUnsubscribe} from './subscription'

export function createWatch<T>({
  unit,
  fn,
  scope,
  batch,
}: {
  unit: Unit<T>
  fn: (value: T) => any
  scope?: Scope
  batch?: boolean
}): Subscription {
  const seq = [step.run({fn: value => fn(value)})]
  if (batch) {
    seq.unshift(step.compute({priority: 'sampler', batch: true}))
  }
  if (scope) {
    const node = createNode({node: seq})
    const id = (unit as any).graphite.id
    const scopeLinks: {[_: string]: Node[]} = (scope as any).additionalLinks
    const links = scopeLinks[id] || []
    scopeLinks[id] = links
    links.push(node)
    return addUnsubscribe(() => {
      const idx = links.indexOf(node)
      if (idx !== -1) links.splice(idx, 1)
      clearNode(node)
    })
  } else {
    const node = createNode({
      node: seq,
      parent: [unit],
      family: {owners: unit},
    })
    return addUnsubscribe(() => {
      clearNode(node)
    })
  }
}
