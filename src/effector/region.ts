import type {Template} from '../forest/index.h'
import type {NodeUnit, Node, ID} from './index.h'
import {getParent, getGraph} from './getter'
import {createNode} from './createNode'
import {is} from './validate'

type DeclarationSourceReporter = (
  node: Node | 'region',
  regionStack: RegionStack | null,
) => void

let reporter: DeclarationSourceReporter

export const setGraphInspector = (fn: DeclarationSourceReporter) => {
  reporter = fn
}

type RegionStack = {
  id: ID
  parent: RegionStack | null
  value: any
  template: Template | null
  sidRoot?: string | null
  sidOffset: number
  meta:
    | Record<string, unknown>
    | {
        type: 'factory'
        sid?: string
        name?: string
        loc: unknown
        method?: string
      }
}

export let regionStack: RegionStack | null = null

export const reportDeclaration = (node: Node | 'region') => {
  if (reporter) {
    reporter(node, regionStack)
  }
}

export const readTemplate = (): Template | null =>
  regionStack && regionStack.template
export const readSidRoot = (sid?: string | null) => {
  /**
   * If there is no regionStack or sidRoot in regionStack, return sid as is (including null and undefined cases)
   */
  if (!regionStack || !regionStack.sidRoot) return sid

  /**
   * If sid is provided, return sidRoot + sid
   */
  if (sid) {
    return `${regionStack.sidRoot}|${sid}|${regionStack.sidOffset++}`
  }

  /**
   * If sid is not provided, but region stack is available:
   *
   * Try to derive sid from regionStack.sidRoot and regionStack.sidOffset.
   */
  return `${regionStack.sidRoot}|${regionStack.sidOffset++}`
}

export function withRegion<T = void>(unit: NodeUnit, cb: () => T): T {
  const node = getGraph(unit)
  const meta = node.meta || {}

  if (!is.domain(unit)) {
    meta.isRegion = true
  }

  regionStack = {
    id: node.id,
    parent: regionStack,
    value: unit,
    template: meta.template || readTemplate(),
    sidRoot: readSidRoot(meta.sidRoot),
    meta: meta,
    sidOffset: 0,
  }
  try {
    return cb()
  } finally {
    reportDeclaration('region')
    regionStack = getParent(regionStack)
  }
}

export const withFactory = ({
  sid,
  name,
  loc,
  method,
  fn,
}: {
  sid: string
  name?: string
  loc?: any
  method?: string
  fn: () => any
}) => {
  const factoryRootNode = createNode({
    meta: {sidRoot: readSidRoot(sid), sid, name, loc, method, type: 'factory'},
    regional: true,
  })

  return withRegion(factoryRootNode, fn)
}
