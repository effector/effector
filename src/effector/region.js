//@flow
import {getValue} from './getter'
import {own} from './own'

export const addToRegion = unit => {
  if (regionStack) own(getValue(regionStack), [unit])
  return unit
}

let regionStack = null

export function withRegion(unit: any, cb: () => void) {
  regionStack = {
    parent: regionStack,
    value: unit,
  }
  try {
    return cb()
  } finally {
    regionStack = regionStack.parent
  }
}
