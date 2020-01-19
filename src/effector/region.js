//@flow

import {own} from './stdlib'

export const addToRegion = unit => {
  if (regionStack) own(regionStack.value, [unit])
  return unit
}

let regionStack = null

export function wrapRegion(unit: any, cb: () => void) {
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
