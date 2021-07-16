import {Store, clearNode, step, createNode, Scope, Node} from 'effector'

export function createWatch<T>(
  store: Store<T>,
  fn: (value: T) => any,
  scope?: Scope,
) {
  const nodeOpts = {
    node: [
      step.run({
        fn: value => fn(value),
      }),
    ],
  } as any
  if (scope) {
    const node = createNode(nodeOpts)
    const id = (store as any).graphite.id
    const links: Node[] = ((scope as any).additionalLinks[id] =
      (scope as any).additionalLinks[id] || [])
    links.push(node)
    return () => {
      const idx = links.indexOf(node)
      if (idx !== -1) links.splice(idx, 1)
      clearNode(node)
    }
  } else {
    nodeOpts.parent = store
    nodeOpts.family = {type: 'crosslink', owners: store}
    const node = createNode(nodeOpts)
    return () => {
      clearNode(node)
    }
  }
}
