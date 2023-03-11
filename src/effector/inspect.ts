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

// Watch calculations
type Message = {
  type: 'update' | 'error'
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

    config.fn({
      type: local.fail ? 'error' : 'update',
      value: local.fail ? local.failReason : stack.value,
      stack: stack.meta || {},
      trace: config.trace ? collectMessageTrace(stack) : [],
      ...getNodeMeta(stack),
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
      meta: Record<string, unknown>
      region?: Region
    }
  | {
      type: 'factory'
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
} & NodeCommonMeta

type Declaration = UnitDeclaration | Region

const inspectGraphSubs = new Set<{
  fn: (declaration: Declaration) => void
}>()

setGraphInspector((node: Node | 'region', regionStack: RegionStack) => {
  let decl: Declaration | undefined

  if (node === 'region') {
    decl = readRegionStack(regionStack)
  } else {
    decl = readUnitDeclaration(node, regionStack)
  }

  if (decl) {
    inspectGraphSubs.forEach(sub => {
      sub.fn(decl!)
    })
  }
})

export function inspectGraph(config: {
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
  const {node} = stack

  return readNodeMeta(node)
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
    trace.push({
      type: 'update',
      value: currentStack.value,
      stack: currentStack.meta || {},
      ...getNodeMeta(currentStack),
    })

    currentStack = currentStack.parent
  }

  return trace
}

function readUnitDeclaration(
  node: Node,
  regionStack: RegionStack,
): UnitDeclaration {
  const nodeMeta = readNodeMeta(node)

  return {
    type: 'unit',
    region: readRegionStack(regionStack),
    ...nodeMeta,
  }
}

function readRegionStack(regionStack?: RegionStack | null): Region | undefined {
  if (!regionStack) return
  const {parent, meta} = regionStack
  const parentRegion = readRegionStack(parent) || undefined

  if (meta.type === 'factory') {
    const {sid, name, loc, method} = meta as any

    return {
      type: 'factory',
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
    region: parentRegion,
    meta,
  }
}

type RegionStack = {
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
