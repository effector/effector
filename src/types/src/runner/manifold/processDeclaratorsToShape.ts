import {forIn} from '../forIn'
import {ctx} from './ctx'
import {isRef} from './isRef'
import {Ref} from './types'

function getDeclsReferencedByConfig(): string[] {
  const results: Ref<unknown, unknown>[] = []
  const grouping = ctx.config.grouping!
  const {pass, getHash, describeGroup, createTestLines} = grouping
  if (isRef(pass)) {
    results.push(pass)
  }
  if (isRef(getHash)) {
    results.push(getHash)
  } else if (typeof getHash === 'object' && getHash !== null) {
    results.push(...Object.values(getHash))
  }
  if (isRef(describeGroup)) {
    results.push(describeGroup)
  }
  if (
    createTestLines &&
    'type' in createTestLines &&
    createTestLines.type === 'table'
  ) {
    results.push(...Object.values(createTestLines.fields))
  } else if (createTestLines && 'method' in createTestLines) {
    forIn(createTestLines.shape, value => {
      if (isRef(value)) results.push(value)
      else results.push(value.field, value.when)
    })
    if (isRef(createTestLines.addExpectError)) {
      results.push(createTestLines.addExpectError)
    }
  }
  return results.map(decl => decl.id)
}

/** {[reference]: referencedBy[]} */
function toposort(rawGraph: Record<string, string[]>) {
  const graph = {} as Record<string, string[]>
  for (const id in rawGraph) {
    graph[id] = [...new Set(rawGraph[id])]
  }
  const result = [] as string[]
  const visited = {} as Record<string, boolean>
  const temp = {} as Record<string, boolean>
  for (const node in graph) {
    if (!visited[node] && !temp[node]) {
      topologicalSortHelper(node)
    }
  }
  result.reverse()
  return result
  function topologicalSortHelper(node: string) {
    temp[node] = true
    const neighbors = graph[node]
    for (let i = 0; i < neighbors.length; i++) {
      const n = neighbors[i]
      if (temp[n]) {
        // continue
        throw Error('found cycle in DAG')
      }
      if (!visited[n]) {
        topologicalSortHelper(n)
      }
    }
    temp[node] = false
    visited[node] = true
    result.push(node)
  }
}
/**
 * foo bar
 *
 *
 *         const a = value('inline')
 *         const b = value('root', 'b')
 *         const c = flag({source: {a}})
 *         const d = flag({source: {b}, name: 'd'})
 *         const e = value('inline')
 *         const f = value('root', 'f')
 *         const g = separate({source: {a}, cases: {e}})
 *         const h = separate({source: {a}, cases: {f}})
 *         //
 *         const i = value('inline')
 *         const j = separate({source: {a}, cases: {i}})
 *         const k = value('root', 'k')
 *         const l = separate({source: {a}, cases: {k}})
 *         const m = value('inline')
 *         const n = separate({source: {a}, cases: {m}})
 *         //
 *         const o = value('inline')
 *         const p = separate({source: {a}, cases: {o}, name: 'p'})
 *         const q = value('root', 'q')
 *         const r = separate({source: {a}, cases: {q}, name: 'r'})
 *         const s = value('inline')
 *         const t = separate({source: {a}, cases: {s}, name: 't'})
 *
 * named roots
 *
 *
 *
 *         [b, d, f, k, p, q, r, t]
 *
 *
 * inline targets
 *
 *         g ~> e
 *         h ~> f
 *         j ~> i
 *         l ~> k
 *         n ~> m
 *         p ~> o
 *         r ~> q
 *         t ~> s
 *
 * non-inline targets
 *
 *         a -> [c, g, h, j, l, n, p, r, t]
 *         b -> d
 *
 *
 * source -> target chains
 *
 *         a -> [c, g, h, j, l, n, p, r, t]
 *         b -> d
 *         c -> []
 *         d -> []
 *         e -> []
 *         f -> []
 *         g -> e
 *         h -> f
 *         i -> []
 *         j -> i
 *         k -> []
 *         l -> k
 *         m -> []
 *         n -> m
 *         o -> []
 *         p -> o
 *         q -> []
 *         r -> q
 *         s -> []
 *         t -> s
 *
 *
 * target <- source chains
 *
 *         a <- []
 *         b <- []
 *         c <- a
 *         d <- []
 *         e <- g
 *         f <- h
 *         g <- a
 *         h <- a
 *         i <- j
 *         j <- a
 *         k <- l
 *         l <- a
 *         m <- n
 *         n <- a
 *         o <- p
 *         p <- a
 *         q <- r
 *         r <- a
 *         s <- t
 *         t <- a
 *
 *
 * node -> source / target chains
 *
 *         a -> [] / [c, g, h, j, l, n, p, r, t]
 *         b -> [] / d
 *         c -> a / []
 *         d -> [] / []
 *         e -> g / []
 *         f -> h / []
 *         g -> a / e
 *         h -> a / f
 *         i -> j / []
 *         j -> a / i
 *         k -> l / []
 *         l -> a / k
 *         m -> n / []
 *         n -> a / m
 *         o -> p / []
 *         p -> a / o
 *         q -> r / []
 *         r -> a / q
 *         s -> t / []
 *         t -> a / s
 */
export function processDeclaratorsToShape() {
  /** graph roots */
  const named = new Set<string>(getDeclsReferencedByConfig())
  const appearAsInlineTarget = new Set<string>()
  /**
   * inline references FROM id
   *
   * separate({cases: {_: targetReference}}): referencedBy
   *
   * {[referencedBy]: targetReference[]}
   *
   * referencedBy -> targetReference
   **/
  const inlineRefs: Record<string, string[]> = {}
  /**
   * inline references TO id
   *
   * separate({cases: {_: targetReference}}): referencedBy
   *
   * {[targetReference]: referencedBy[]}
   *
   * referencedBy -> targetReference
   **/
  const inlineRefsBack: Record<string, string[]> = {}
  /**
   * array of references FROM id
   *
   * sourceReference -> referencedBy
   *
   * {[sourceReference]: referencedBy[]}
   **/
  const refGraph: Record<string, string[]> = {}
  /**
   * array of references TO id
   *
   * sourceReference[] -> referencedBy
   *
   * {[referencedBy]: sourceReference[]}
   **/
  const refGraphBack: Record<string, string[]> = {}
  const graph: Record<string, string[]> = {}
  for (const id in ctx.items) {
    const val = ctx.items[id]
    const refs = ctx.references[id]
    const targets = ctx.targets[id]
    const hasName = val.name !== val.id
    if (hasName) {
      named.add(id)
    }
    if (!refGraph[id]) refGraph[id] = []
    if (!inlineRefsBack[id]) inlineRefsBack[id] = []
    refGraphBack[id] = []
    inlineRefs[id] = []
    graph[id] = []
    // refGraph[id] ?? []
    if (refs)
      for (const refID of refs) {
        refGraph[refID] = refGraph[refID] ?? []
        refGraph[refID].push(id)
        refGraphBack[id].push(refID)
      }
    if (targets) {
      for (const target of targets) {
        appearAsInlineTarget.add(target)
        inlineRefs[id].push(target)
        inlineRefsBack[target] = inlineRefsBack[target] ?? []
        inlineRefsBack[target].push(id)
      }
    }
  }
  const visited = new Set<string>()
  const only = new Set<string>()
  const stack: [string, 'up' | 'down' | 'target'][] = []
  for (const rootId of named) {
    only.add(rootId)
    visitDecl(rootId)
  }
  for (const id in graph) {
    graph[id].sort((a, b) => {
      const an = parseInt(a, 36)
      const bn = parseInt(b, 36)
      return an - bn
    })
  }
  const sortedIds = toposort(graph)
  const resultShape: Record<string, any> = {}
  for (const id of sortedIds) {
    if (!only.has(id)) continue
    const item = ctx.items[id]
    resultShape[item.name] = item.prepared
  }
  // console.log(
  //   `\n\n\n+++++++++\n`,
  //   sortedIds
  //     .filter(e => only.has(e))
  //     .map(
  //       id =>
  //         `${ctx.items[id].name}#${ctx.items[id].kind} => ${graph[id]
  //           .map(e => `${ctx.items[e].name}#${ctx.items[e].kind}`)
  //           .join(', ')}`,
  //     )
  //     .join(`\n`),
  //   `\n\n---------\n\n`,
  // )

  return resultShape
  function visitDecl(id: string, mode: 'up' | 'down' | 'target' = 'up') {
    const item = ctx.items[id]
    if (
      named.has(id) ||
      !appearAsInlineTarget.has(id) ||
      refGraphBack[id].length > 0 ||
      inlineRefsBack[id].length > 1 ||
      mode === 'up'
    )
      only.add(id)
    if (visited.has(id)) return
    visited.add(id)
    stack.push([
      item.name === item.id ? `${item.kind}#${item.name}` : item.name,
      mode,
    ])
    // console.log(stack.map(([id, mode]) => `${id}:${mode}`).join(' -> '))
    refGraph[id].forEach(sourceID => {
      // only.add(sourceID)
      graph[sourceID].push(id)
      visitDecl(sourceID, 'up')
    })
    inlineRefs[id].forEach(targetID => {
      // only.add(targetID)
      graph[targetID].push(id)
      visitDecl(targetID, 'target')
    })
    // console.log(
    //   `${stack[0][0]} ~>`,
    //   graph[id].map(id => ctx.items[id].name).join(' '),
    // )
    stack.pop()
  }
}
