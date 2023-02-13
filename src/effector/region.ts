import type {Template} from '../forest/index.h'
import type {NodeUnit, Node} from './index.h'
import {getParent, getMeta, getGraph} from './getter'
import {createNode} from './createNode'

type DeclarationSourceReporter = (node: Node, regionStack: RegionStack | null) => void

let reporter: DeclarationSourceReporter

export const setGraphInspector = (fn: DeclarationSourceReporter) => {
  reporter = fn
}

type RegionStack = {
  parent: RegionStack | null
  value: any
  template: Template | null
  sidRoot?: string
  meta?: Record<string, unknown>
}

export let regionStack: RegionStack | null = null

export const reportDeclaration = (node: Node) => {
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

export function withRegion(unit: NodeUnit, cb: () => void) {
  regionStack = {
    parent: regionStack,
    value: unit,
    template: getMeta(unit, 'template') || readTemplate(),
    sidRoot: getMeta(unit, 'sidRoot') || (regionStack && regionStack.sidRoot),
    meta: getGraph(unit).meta,
  }
  try {
    return cb()
  } finally {
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
    meta: {sidRoot: readSidRoot(sid), sid, name, loc, method, type: "factory"},
  })
  reportDeclaration(factoryRootNode)
  return withRegion(factoryRootNode, fn)
}
