import {
  Scope,
  Subscription,
  Stack,
  Node,
  // private
  // @ts-expect-error
  setInspector,
  // private
  // @ts-expect-error
  setGraphInspector,
} from 'effector'
import { ID } from './index.h'

type Loc = {
  file: string
  line: number
  column: number
}

type NodeCommonMeta = {
  kind: string
  sid?: string
  id: string
  name?: string
  loc?: Loc
  meta: Record<string, unknown>
  derived?: boolean
}

type GraphLinks = {
  owners: string[]
  links: string[]
  next: string[]
}

// Watch calculations
type Message = {
  type: 'update' | 'error'
  error?: unknown
  value: unknown
  stack: Record<string, unknown>
  trace?: Message[]
} & NodeCommonMeta

const inspectSubs = new Set<{
  scope?: Scope
  trace?: boolean
  fn: (message: Message) => void
}>()

setInspector((stack: Stack, local: {fail: boolean; failReason?: unknown}) => {
  const {scope} = stack
  const nodeMeta = getNodeMeta(stack)
  let trace: Message[]
  inspectSubs.forEach(config => {
    if (
      !(
        // must be the same scope
        (
          config.scope === scope ||
          // or no scope at all
          (!config.scope && !scope)
        )
      )
    ) {
      /**
       * Inspection is restriced by scope
       */
      return
    }

    if (config.trace && !trace) {
      trace = collectMessageTrace(stack)
    }

    config.fn({
      type: local.fail ? 'error' : 'update',
      value: stack.value,
      error: local.fail ? local.failReason : undefined,
      stack: stack.meta || {},
      trace: config.trace ? trace : [],
      meta: nodeMeta.meta,
      id: nodeMeta.id,
      sid: nodeMeta.sid,
      name: nodeMeta.name,
      kind: nodeMeta.kind,
      loc: nodeMeta.loc,
      derived: nodeMeta.derived,
    })
  })
})

export function inspect(config: {
  scope?: Scope
  trace?: boolean
  fn: (message: Message) => void
}): Subscription {
  inspectSubs.add(config)

  return createSubscription(() => {
    inspectSubs.delete(config)
  })
}

// Track declarations and graph structure
type Region =
  | {
      type: 'region'
      id: ID,
      meta: Record<string, unknown>
      region?: Region
    }
  | {
      type: 'factory'
      id: ID,
      meta: Record<string, unknown>
      region?: Region
      sid?: string
      name?: string
      method?: string
      loc?: {
        file: string
        line: number
        column: number
      }
    }

type UnitDeclaration = {
  type: 'unit'
  meta: Record<string, unknown>
  region?: Region
  graph?: GraphLinks
} & NodeCommonMeta

type LinkDeclaration = {
  type: 'link'
  id: string
  name?: string
  kind?: string
  meta: Record<string, unknown>
  loc?: Loc
  region?: Region
  graph: GraphLinks
}

type Declaration = UnitDeclaration | LinkDeclaration | Region

const inspectGraphSubs = new Set<{
  includeLinks?: boolean
  fn: (declaration: Declaration) => void
}>()

setGraphInspector((node: Node | 'region', regionStack: RegionStack) => {
  inspectGraphSubs.forEach(sub => {
    const decls =
      node === 'region'
        ? [readRegionStack(regionStack)]
        : readNodeDeclarations(node, regionStack, sub.includeLinks)

    decls.forEach(decl => {
      if (!decl) return
      sub.fn(decl)
    })
  })
})

export function inspectGraph(config: {
  includeLinks?: boolean
  fn: (declaration: Declaration) => void
}): Subscription {
  inspectGraphSubs.add(config)
  return createSubscription(() => {
    inspectGraphSubs.delete(config)
  })
}

// Utils
function createSubscription(cleanup: () => void): Subscription {
  const result = () => cleanup()
  result.unsubscribe = result
  return result
}

function getNodeMeta(stack: Stack) {
  return readNodeMeta(stack.node)
}

function readNodeMeta(node: Node): NodeCommonMeta {
  const {meta, id} = node
  const loc = getLoc(meta)
  const {sid, name, op: kind} = meta

  return {meta, id, sid, name, kind, loc, derived: meta.derived}
}

function getLoc(meta: Record<string, unknown>) {
  return meta.config ? (meta.config as any).loc : meta.loc
}

function collectMessageTrace(stack: Stack) {
  const trace: Message[] = []
  let currentStack = stack.parent

  while (currentStack) {
    const nodeMeta = getNodeMeta(currentStack)
    trace.push({
      type: 'update',
      value: currentStack.value,
      stack: currentStack.meta || {},
      meta: nodeMeta.meta,
      id: nodeMeta.id,
      sid: nodeMeta.sid,
      name: nodeMeta.name,
      kind: nodeMeta.kind,
      loc: nodeMeta.loc,
      derived: nodeMeta.derived,
    })

    currentStack = currentStack.parent
  }

  return trace
}

function readNodeDeclarations(
  node: Node,
  regionStack: RegionStack,
  includeLinks?: boolean,
): Declaration[] {
  if (node.meta.id || node.meta.rootStateRefId) {
    return [readUnitDeclaration(node, regionStack, includeLinks)]
  }

  if (isUnitKind(node.meta.op)) return []

  if (!includeLinks) return []

  const linkDeclaration = readLinkDeclaration(node, regionStack)
  return linkDeclaration ? [linkDeclaration] : []
}

function readUnitDeclaration(
  node: Node,
  regionStack: RegionStack,
  includeLinks?: boolean,
): UnitDeclaration {
  const nodeMeta = readNodeMeta(node)

  const declaration: UnitDeclaration = {
    type: 'unit',
    region: readRegionStack(regionStack),
    meta: nodeMeta.meta,
    id: nodeMeta.id,
    sid: nodeMeta.sid,
    name: nodeMeta.name,
    kind: nodeMeta.kind,
    loc: nodeMeta.loc,
    derived: nodeMeta.derived,
  }

  if (includeLinks) {
    declaration.graph = readGraphLinks(node)
  }

  return declaration
}

function readLinkDeclaration(
  node: Node,
  regionStack: RegionStack,
): LinkDeclaration | undefined {
  const graph = readGraphLinks(node)
  if (!graph.owners.length && !graph.links.length && !graph.next.length) return

  return {
    type: 'link',
    id: node.id,
    name: node.meta.name,
    kind: node.meta.op,
    meta: node.meta,
    loc: getLoc(node.meta),
    region: readRegionStack(regionStack),
    graph,
  }
}

function isUnitKind(kind: unknown) {
  return kind === 'event' || kind === 'store' || kind === 'effect'
}

function readGraphLinks(node: Node): GraphLinks {
  return {
    owners: node.family.owners.map(({id}) => id),
    links: node.family.links.map(({id}) => id),
    next: node.next.map(({id}) => id),
  }
}

function readRegionStack(regionStack?: RegionStack | null): Region | undefined {
  if (!regionStack) return
  const {parent, meta, id} = regionStack
  const parentRegion = readRegionStack(parent) || undefined

  if (meta.type === 'factory') {
    const {sid, name, loc, method} = meta as any

    return {
      type: 'factory',
      id,
      region: parentRegion,
      meta,
      sid,
      name,
      loc,
      method,
    }
  }

  return {
    type: 'region',
    id,
    region: parentRegion,
    meta,
  }
}

type RegionStack = {
  id: ID,
  parent: RegionStack | null
  meta:
    | Record<string, unknown>
    | {
        type: 'factory'
        sid?: string
        name?: string
        method?: string
        loc?: Loc
      }
}
