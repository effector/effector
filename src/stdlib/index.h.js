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
  +from: Array<Step>,
  +next: Multi,
  +seq: Seq,
  +val: Val,
}
export type Step = Single | Seq | Multi
export type Single = {
  +id: ID,
  +type: 'single',
  +group: 'step',
  +data: TypeDef<any, 'cmd'>,
}
export type Seq = {
  +id: ID,
  +type: 'seq',
  +group: 'step',
  +data: Array<Step>,
}
export type Multi = {
  +id: ID,
  +type: 'multi',
  +group: 'step',
  +data: Array<Step>,
}
