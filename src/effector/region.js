//@flow
import {getValue, getGraph} from './getter'
import {own} from './own'

export const addToRegion = unit => {
  if (regionStack) own(getValue(regionStack), [unit])
  return unit
}

let regionStack = null

export const isTemplateRegion = () => regionStack && regionStack.isTemplate

export function withRegion(unit: any, cb: () => void) {
  regionStack = {
    parent: regionStack,
    value: unit,
    isTemplate:
      getGraph(unit).meta.isTemplate || (regionStack && regionStack.isTemplate),
  }
  try {
    return cb()
  } finally {
    regionStack = regionStack.parent
  }
}
