import type {Template} from '../forest/index.h'
import type {NodeUnit, Node, ID} from './index.h'
import {getParent, getGraph} from './getter'
import {createNode} from './createNode'
import {is} from './is'

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
  sidRoot?: string
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
  if (sid && regionStack && regionStack.sidRoot)
    sid = `${regionStack.sidRoot}|${sid}`
  return sid
}

export function withRegion<T = void>(unit: NodeUnit, cb: () => T): T {
  const node = getGraph(unit)
  const meta = node.meta || {}

  if (!is.domain(unit)) {
    meta.regionStack = regionStack
  }

  regionStack = {
    id: node.id,
    parent: regionStack,
    value: unit,
    template: meta.template || readTemplate(),
    sidRoot: meta.sidRoot || (regionStack && regionStack.sidRoot),
    meta: meta,
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
