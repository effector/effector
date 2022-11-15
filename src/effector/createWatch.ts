import {clearNode} from './clearNode'
import {createNode} from './createNode'
import {assert} from './throw'
import type {Node, Subscription, Unit} from './index.h'
import {step} from './step'
import {Scope} from './unit.h'

export function createWatch<T>({
  unit,
  fn,
  scope,
}: {
  unit: Unit<T>
  fn: (value: T) => any
  scope?: Scope
}): Subscription {
  const seq = [step.run({fn: value => fn(value)})]
  if (scope) {
    assert(scope.live, 'createWatch cannot be called on a dead scope')
    const node = createNode({node: seq})
    const id = (unit as any).graphite.id
    const scopeLinks: {[_: string]: Node[]} = (scope as any).additionalLinks
    const links = scopeLinks[id] || []
    scopeLinks[id] = links
    links.push(node)
    return createSubscription(() => {
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
    return createSubscription(() => {
      clearNode(node)
    })
  }
}

function createSubscription(callback: () => void): Subscription {
  const subscription: Subscription = () => callback()
  subscription.unsubscribe = () => callback()

  return subscription
}
