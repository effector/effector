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

export type TypeDef<+Type, +Group> = {|
  +id: ID,
  +type: Type,
  +data: any,
|}
//prettier-ignore
export type Cmd =
  | Check
  | Update
  | Run
  | Filter
  | Compute
  | Barrier
  | Tap
  | Batch
  | ReadStack
export type ReadStack = {|
  +id: ID,
  +type: 'stack',
  +data: {|
    +to: Graph,
  |},
|}
export type Batch = {|
  +id: ID,
  +type: 'batch',
  +data: {|
    +blocks: Graph,
  |},
|}
export type Check = {|
  +id: ID,
  +type: 'check',
  +data:
    | {|
        +type: 'defined',
      |}
    | {|
        +type: 'changed',
        +store: StateRef,
      |},
|}

export type Barrier = {|
  +id: ID,
  +type: 'barrier',
  +data: {|
    +barrierID: ID,
    +priority: 'barrier' | 'sampler',
  |},
|}

export type Update = {|
  +id: ID,
  +type: 'update',
  +data: {|
    store: StateRef,
  |},
|}
export type Run = {|
  +id: ID,
  +type: 'run',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |},
|}

export type Filter = {|
  +id: ID,
  +type: 'filter',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => boolean,
  |},
|}
export type Compute = {|
  +id: ID,
  +type: 'compute',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |},
|}

export type Tap = {|
  +id: ID,
  +type: 'tap',
  +data: {|
    fn: (data: any, scope: {[string]: any, ...}) => any,
  |},
|}

export type Family = {|
  type: 'regular' | 'crosslink' | 'domain',
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
