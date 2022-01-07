/* eslint-disable @typescript-eslint/no-explicit-any */
import {Store, clearNode, step, createNode, Scope, Node} from "effector"

export function createWatch<T>(
  store: Store<T>,
  fn: (value: T) => any,
  scope?: Scope,
) {
  let seq = [step.run({fn: (value) => fn(value)})]
  if (scope) {
    let node = createNode({node: seq})
    let id = (store as any).graphite.id
    let scopeLinks: {[_: string]: Node[]} = (scope as any).additionalLinks
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let links = scopeLinks[id] || []
    scopeLinks[id] = links
    links.push(node)
    return () => {
      let idx = links.indexOf(node)
      if (idx !== -1) links.splice(idx, 1)
      clearNode(node)
    }
  } else {
    let node = createNode({
      node: seq,
      parent: [store],
      family: {owners: store},
    })
    return () => {
      clearNode(node)
    }
  }
}
