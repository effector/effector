import {getParent, getMeta} from './getter'
import {createNode} from './createNode'
import type {Template} from '../forest/index.h'

type RegionStack = {
  parent: RegionStack | null
  value
  template
  sidRoot?: string
}

export let regionStack: RegionStack | null = null

export const readTemplate = (): Template | null =>
  regionStack && regionStack.template
export const readSidRoot = (sid?: string | null) => {
  if (sid && regionStack && regionStack.sidRoot)
    sid = `${regionStack.sidRoot}|${sid}`
  return sid
}

export function withRegion(unit, cb: () => void) {
  regionStack = {
    parent: regionStack,
    value: unit,
    template: getMeta(unit, 'template') || readTemplate(),
    sidRoot: getMeta(unit, 'sidRoot') || (regionStack && regionStack.sidRoot),
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
  loc?
  method?: string
  fn: () => any
}) => {
  const sidNode = createNode({
    meta: {sidRoot: readSidRoot(sid), name, loc, method},
  })
  return withRegion(sidNode, fn)
}
