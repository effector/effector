import {getValue, getGraph, getParent} from './getter'
import {own} from './own'

type RegionStack = {
  parent: RegionStack | null
  value: any
  template: any
}

export const addToRegion = (unit: any) => {
  if (regionStack) own(getValue(regionStack), [unit])
  return unit
}

let regionStack: RegionStack | null = null

export const readTemplate = () => regionStack && regionStack.template

export function withRegion(unit: any, cb: () => void) {
  regionStack = {
    parent: regionStack,
    value: unit,
    template:
      getGraph(unit).meta.template || (regionStack && regionStack.template),
  }
  try {
    return cb()
  } finally {
    regionStack = getParent(regionStack)
  }
}
