//@flow

export type ID = string
export type StateRef = {
  +id: ID,
  current: any,
}
export type TypeDef<+Type, +Group> = {
  +id: ID,
  +type: Type,
  +group: Group,
  +data: any,
}
export type Graph = {
  +next: TypeDef<'multi', 'step'>,
  +seq: TypeDef<'seq', 'step'>,
}
