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

// Watch calculations
type Message = {
  type: 'update' | 'error'
  value: unknown
  stack: Record<string, unknown>
  kind: string
  sid?: string
  id: string
  name?: string
  loc?: Loc
  meta: Record<string, unknown>
  trace?: Message[]
}

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
type Factory = {
  name?: string
  loc?: Loc
  method?: string
  sid?: string
  from?: string
}

type UnitDeclaration = {
  type: 'unit'
  kind: string
  name?: string
  factory?: Factory
  sid?: string
  loc?: Loc
  id: string
  meta: Record<string, unknown>
  // for derived units - stores or events
  derived?: boolean
  // e.g fx.finally will have original fx details here
  owners: {
    sid: string
    id: string
    kind: string
    name?: string
  }[]
}

type Declaration = UnitDeclaration

const inspectGraphSubs = new Set<{
  fn: (declaration: Declaration) => void
}>()

setGraphInspector((node: Node, regionStack: RegionStack) => {
  const decl = readUnitDeclaration(node, regionStack)

  inspectGraphSubs.forEach(sub => {
    sub.fn(decl)
  })
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

function readNodeMeta(node: Node) {
  const {meta, id} = node
  const loc = getLoc(meta)
  const {sid, name, op: kind} = meta

  return {meta, id, sid, name, kind, loc}
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
  return {
    type: 'unit',
    kind: node.meta.op,
    name: node.meta.name,
    factory: regionStack ? regionStack.meta : undefined,
    sid: node.meta.sid,
    loc: getLoc(node.meta),
    id: node.id,
    meta: node.meta,
    derived: node.meta.derived,
    owners: readOwners(node),
  }
}

function readOwners(node: Node) {
  const owners: UnitDeclaration['owners'] = []

  getRawOwners(node).forEach(owner => {
    owners.push({
      sid: owner.meta.sid,
      id: owner.id,
      kind: owner.meta.op,
      name: owner.meta.name,
    })
  })

  return owners
}

function getRawOwners(node: Node): Node[] {
  let result: Node[] = node.family.owners;

  /**
   * Works for fx.finally, $store.updates
   * 
   * TODO: handle edge cases like:
   * - combine, map (doesn't have meaningful owners at the first level)
   * - check other possible cases
   */

  return result
}

type RegionStack = {
  parent: RegionStack | null
  value: any
  sidRoot?: string
  meta?: Record<string, unknown>
}
