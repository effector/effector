//@flow


export /*::opaque*/ type Tag/*: string*/ = string
export /*::opaque*/ type ID = number

export const counter = (): () => ID => {
  let id: ID = 0
  return (): ID => ++id
}

export function toTag(...tags: $ReadOnlyArray<string | Tag>): Tag {
  return tags
    .filter(str => str.length > 0)
    .join('/')
}

export const nextPayloadID = counter()
export const nextEventID = counter()
