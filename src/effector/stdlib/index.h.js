//@flow

export type ID = string

//prettier-ignore
export type kind =
  | 'store'
  | 'event'
  | 'effect'
  | 'domain'

export type StateRef = {|
  +id: ID,
  current: any,
|}
export type NodeMeta = {|
  fullName?: string,
  section?: ID,
|}
export type TypeDef<+Type, +Group> = {|
  +id: ID,
  +type: Type,
  +data: any,
|}
//prettier-ignore
export type Cmd =
  | Update
  | Run
  | Filter
  | Compute
  | Barrier
  | Tap

export type Barrier = {|
  +id: ID,
  +type: 'barrier',
  +data: {|
    +barrierID: ID,
    +priority: 'barrier' | 'sampler',
    meta?: NodeMeta,
  |},
|}

export type Update = {|
  +id: ID,
  +type: 'update',
  +data: {|
    store: StateRef,
    meta?: NodeMeta,
  |},
|}
export type Run = {|
  +id: ID,
  +type: 'run',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  |},
|}

export type Filter = {|
  +id: ID,
  +type: 'filter',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => boolean,
    meta?: NodeMeta,
  |},
|}
export type Compute = {|
  +id: ID,
  +type: 'compute',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  |},
|}

export type Tap = {|
  +id: ID,
  +type: 'tap',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
    meta?: NodeMeta,
  |},
|}

export type Family = {|
  type: 'regular' | 'crosslink',
  links: Graph[],
  +owners: Graph[],
|}

export type Graph = {
  +next: Array<Graph>,
  +seq: Array<Cmd>,
  +scope: {[string]: any, ...},
  +meta: {[tag: string]: any, ...},
  +family: Family,
  ...
}

//prettier-ignore
export type Graphite =
  | {+graphite: Graph, ...}
  | Graph

export interface Unit {
  +graphite: Graph;
}
