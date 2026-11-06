import type {Node} from 'effector'
import {inspectGraph} from 'effector/inspect'

export type Vertex = {id: string; name: string; kind: string; unit: boolean}
export type Edge = {
  source: string
  target: string
  kind: 'next' | 'owner' | 'link'
}
export type Graph = {nodes: Vertex[]; edges: Edge[]}

/** Start before creating the application. Reading a snapshot never mutates its graph. */
export function captureGraph() {
  const roots = new Map<string, Node>()
  let disposed = false
  const subscription = inspectGraph({
    fn: () => {},
    onNode: node => roots.set(node.id, node),
  })
  return {
    snapshot(): Graph {
      if (disposed) return {nodes: [], edges: []}
      const nodes = new Map<string, Vertex>()
      const edges = new Map<string, Edge>()
      const queue = Array.from(roots.values())
      const visited = new Set<Node>()
      const add = (source: Node, target: Node, kind: Edge['kind']) => {
        const edge = {source: source.id, target: target.id, kind}
        edges.set(JSON.stringify([edge.source, edge.target, kind]), edge)
        queue.push(target)
      }
      for (let cursor = 0; cursor < queue.length; cursor++) {
        const node = queue[cursor]
        if (visited.has(node)) continue
        visited.add(node)
        const kind = String(node.meta.op || node.family.type || 'node')
        nodes.set(node.id, {
          id: node.id,
          name: String(node.meta.name || kind),
          kind,
          unit: ['event', 'store', 'effect', 'domain'].includes(kind),
        })
        node.next.forEach(target => add(node, target, 'next'))
        node.family.links.forEach(target => add(node, target, 'link'))
        node.family.owners.forEach(owner => {
          edges.set(JSON.stringify([owner.id, node.id, 'owner']), {
            source: owner.id,
            target: node.id,
            kind: 'owner',
          })
          queue.push(owner)
        })
      }
      return {
        nodes: Array.from(nodes.values()),
        edges: Array.from(edges.values()),
      }
    },
    dispose() {
      subscription()
      roots.clear()
      disposed = true
    },
  }
}

/** Hide operation nodes while keeping real directed propagation paths between units. */
export function unitGraph(graph: Graph): Graph {
  const visible = new Set(
    graph.nodes.filter(node => node.unit).map(node => node.id),
  )
  const outgoing = new Map<string, string[]>()
  graph.edges
    .filter(edge => edge.kind === 'next')
    .forEach(edge => {
      const list = outgoing.get(edge.source) || []
      list.push(edge.target)
      outgoing.set(edge.source, list)
    })
  const edges = new Map<string, Edge>()
  for (const source of visible) {
    const queue = [...(outgoing.get(source) || [])]
    const visited = new Set<string>([source])
    for (let cursor = 0; cursor < queue.length; cursor++) {
      const target = queue[cursor]
      if (visible.has(target)) {
        edges.set(JSON.stringify([source, target]), {
          source,
          target,
          kind: 'next',
        })
      } else {
        if (visited.has(target)) continue
        visited.add(target)
        queue.push(...(outgoing.get(target) || []))
      }
    }
  }
  return {
    nodes: graph.nodes.filter(node => visible.has(node.id)),
    edges: Array.from(edges.values()),
  }
}

/** Iterative SCC condensation keeps cyclic and large graphs finite and readable. */
export function layoutGraph(graph: Graph) {
  const forward = new Map(graph.nodes.map(node => [node.id, [] as string[]]))
  const reverse = new Map(graph.nodes.map(node => [node.id, [] as string[]]))
  graph.edges.forEach(edge => {
    forward.get(edge.source)?.push(edge.target)
    reverse.get(edge.target)?.push(edge.source)
  })
  const visited = new Set<string>()
  const order: string[] = []
  for (const node of graph.nodes) {
    if (visited.has(node.id)) continue
    visited.add(node.id)
    const stack: {id: string; offset: number}[] = [{id: node.id, offset: 0}]
    while (stack.length) {
      const frame = stack[stack.length - 1]
      const next = forward.get(frame.id) || []
      if (frame.offset < next.length) {
        const id = next[frame.offset++]
        if (!visited.has(id)) {
          visited.add(id)
          stack.push({id, offset: 0})
        }
      } else {
        order.push(frame.id)
        stack.pop()
      }
    }
  }
  const component = new Map<string, number>()
  const groups: string[][] = []
  for (const start of order.reverse()) {
    if (component.has(start)) continue
    const group: string[] = []
    const queue = [start]
    component.set(start, groups.length)
    for (let cursor = 0; cursor < queue.length; cursor++) {
      const id = queue[cursor]
      group.push(id)
      for (const next of reverse.get(id) || []) {
        if (!component.has(next)) {
          component.set(next, groups.length)
          queue.push(next)
        }
      }
    }
    groups.push(group)
  }
  const ranks = groups.map(() => 0)
  // Kosaraju emits source components first: all cross-component edges advance.
  for (let group = 0; group < groups.length; group++) {
    for (const id of groups[group]) {
      for (const target of forward.get(id) || []) {
        const next = component.get(target)!
        if (next !== group)
          ranks[next] = Math.max(ranks[next], ranks[group] + 1)
      }
    }
  }
  const columns = new Map<number, number>()
  const positions = new Map<string, {x: number; y: number}>()
  groups.forEach((group, index) => {
    const rank = ranks[index]
    for (const id of group) {
      const row = columns.get(rank) || 0
      positions.set(id, {x: 140 + rank * 260, y: 140 + row * 104})
      columns.set(rank, row + 1)
    }
  })
  return positions
}
