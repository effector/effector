import {Store, clearNode, step, createNode, Scope, Node, Cmd} from 'effector'

export function createWatch<T>(
  store: Store<T>,
  fn: (value: T) => any,
  scope?: Scope,
  batchStep?: Cmd,
) {
  const seq: Cmd[] = [step.run({fn: value => fn(value)})]
  if (batchStep) seq.unshift(batchStep)
  if (scope) {
    const node = createNode({node: seq})
    const id = (store as any).graphite.id
    const scopeLinks: {[_: string]: Node[]} = (scope as any).additionalLinks
    const links = scopeLinks[id] || []
    scopeLinks[id] = links
    links.push(node)
    return () => {
      const idx = links.indexOf(node)
      if (idx !== -1) links.splice(idx, 1)
      clearNode(node)
    }
  } else {
    const node = createNode({
      node: seq,
      parent: [store],
      family: {owners: store},
    })
    return () => {
      clearNode(node)
    }
  }
}
