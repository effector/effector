//@flow

export /*::opaque*/
type ID/*:number*/ = number

export function createIDType(): () => ID {
  let id: ID = 0
  return (): ID => ++id
}

export /*::opaque*/
type SEQ/*:number*/ = number

export const createSeq = (): SEQ => 0
export const incSeq = (seq: SEQ): SEQ => seq + 1
