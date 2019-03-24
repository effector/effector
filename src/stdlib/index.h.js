//@flow

export type ID = string
export type StateRef = {
  +id: ID,
  current: any,
}
export type NodeMeta = {
  fullName?: string,
  section?: ID,
}
export type TypeDef<+Type, +Group> = {
  +id: ID,
  +type: Type,
  +group: Group,
  +data: any,
}
export type Graph<+Val: {[name: string]: any} = {||}> = {
  +from: Array<TypeDef<*, 'step'>>,
  +next: TypeDef<'multi', 'step'>,
  +seq: TypeDef<'seq', 'step'>,
  +val: Val,
}
