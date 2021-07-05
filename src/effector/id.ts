const idCount = (useFullAlphabet?: boolean) => {
  let id = 0
  const radix = useFullAlphabet ? 36 : 10
  return () => (++id).toString(radix)
}

export const nextUnitID = idCount(true)
export const nextStepID = idCount(true)
export const nextNodeID = idCount(true)
