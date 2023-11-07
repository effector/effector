import type {Template} from '../forest/index.h'
import type {NodeUnit, Node, ID} from './index.h'
import {getParent, getGraph} from './getter'
import {createNode} from './createNode'

type DeclarationSourceReporter = (
  node:
    | Node
    | 'region'
    | {
        // operator declaration
        // source of operatior metadata
        kind?: string
        rootNode?: Node
        // Common config shape for most of operators
        // sample, combine, guard, forward, etc - all can be expressed this way
        source?: Node | Node[] | Record<string, Node>
        clock?: Node | Node[]
        filter?: Node | 'fn'
        target?: Node | Node[]
        fn?: 'fn'
        // Special fields for split operator only
        match?:
          | Node
          | 'fn'
          | Record<string, Node>
          | Record<string, 'fn'>
        cases?: Record<string, Node>
      },
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

export const reportDeclaration = (
  nodeOrShape: Parameters<DeclarationSourceReporter>[0],
) => {
  if (reporter) {
    reporter(nodeOrShape, regionStack)
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
  const meta = getGraph(unit).meta || {}

  regionStack = {
    id: getGraph(unit).id,
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
  })

  return withRegion(factoryRootNode, fn)
}
