import {getValue, getGraph, getParent} from './getter'
import {own} from './own'

export const addToRegion = unit => {
  if (regionStack) own(getValue(regionStack), [unit])
  return unit
}

let regionStack = null

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
