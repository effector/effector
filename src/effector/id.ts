const idCount = () => {
  let id = 0
  return () => (++id).toString(36)
}

export const nextUnitID = idCount()
export const nextStepID = idCount()
