const idCount = () => {
  let id = 0
  return () => `${++id}`
}

export const nextUnitID = idCount()
export const nextStepID = idCount()
export const nextNodeID = idCount()
export const nextEffectID = idCount()
