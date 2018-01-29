//@flow

export /*::opaque*/
type ID/*:number*/ = number

export function createIDType(): () => ID {
  let id: ID = 0
  return (): ID => ++id
}
