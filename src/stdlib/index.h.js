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
//prettier-ignore
export type Cmd =
  | Update
  | Run
  | Filter
  | Emit
  | Compute

export type Update = {|
  +id: ID,
  +type: 'update',
  +group: 'cmd',
  +data: {|
    store: StateRef,
    meta?: NodeMeta,
  |},
|}
export type Run = {|
  +id: ID,
  +type: 'run',
  +group: 'cmd',
  +data: {|
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
    pushUpdate?: (data: any) => number | void,
  |},
|}

export type Filter = {|
  +id: ID,
  +type: 'filter',
  +group: 'cmd',
  +data: {|
    fn: (data: any, scope: {[string]: any}) => boolean,
    meta?: NodeMeta,
  |},
|}
export type Emit = {|
  +id: ID,
  +type: 'emit',
  +group: 'cmd',
  +data: {|
    fullName: string,
    meta?: NodeMeta,
  |},
|}
export type Compute = {|
  +id: ID,
  +type: 'compute',
  +group: 'cmd',
  +data: {|
    fn: (data: any, scope: {[string]: any}) => any,
    meta?: NodeMeta,
  |},
|}

export type Graph<+Val: {[name: string]: any} = {||}> = {
  +from: Array<Graph<any>>,
  +next: Array<Graph<any>>,
  +seq: Array<Cmd>,
  +val: Val,
}
