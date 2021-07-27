import {getValue, getGraph, getParent} from './getter'
import {own} from './own'
import {createNode} from './createNode'
import type {Template} from '../forest/index.h'

type RegionStack = {
  parent: RegionStack | null
  value: any
  template: any
  sidRoot?: string
}

export let regionStack: RegionStack | null = null

export const readTemplate = (): Template | null =>
  regionStack && regionStack.template
export const readSidRoot = (sid?: string | null) => {
  if (sid && regionStack && regionStack.sidRoot)
    sid = `${regionStack.sidRoot}ɔ${sid}`
  return sid
}

export function withRegion(unit: any, cb: () => void) {
  const unitMeta = getGraph(unit).meta
  regionStack = {
    parent: regionStack,
    value: unit,
    template: unitMeta.template || readTemplate(),
    sidRoot: unitMeta.sidRoot || (regionStack && regionStack.sidRoot),
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
  const sidNode = createNode({
    meta: {
      sidRoot: readSidRoot(sid),
      name,
      loc,
      method,
    },
  })
  return withRegion(sidNode, fn)
}
