export type ID = string

//prettier-ignore
export type kind =
  | 'store'
  | 'event'
  | 'effect'
  | 'domain'

export type StateRef = {
  id: ID,
  current: any,
}
export type NodeMeta = {
  fullName?: string,
  section?: ID,
}
export type TypeDef<Type, Group> = {
  id: ID,
  type: Type,
  group: Group,
  data: any,
}
//prettier-ignore
export type Cmd =
  | Update
  | Run
  | Filter
  | Emit
  | Compute
  | Barrier
  | Tap

export type Barrier = {
  id: ID,
  type: 'barrier',
  group: 'cmd',
  data: {
    barrierID: ID,
    priority: 'barrier' | 'sampler',
    meta?: NodeMeta,
  },
}

export type Update = {
  id: ID,
  type: 'update',
  group: 'cmd',
  data: {
    store: StateRef,
    meta?: NodeMeta,
  },
}
export type Run = {
  id: ID,
  type: 'run',
  group: 'cmd',
  data: {
    fn: (data: any, scope: {[key: string]: any}) => any,
    meta?: NodeMeta,
  },
}

export type Filter = {
  id: ID,
  type: 'filter',
  group: 'cmd',
  data: {
    fn: (data: any, scope: {[key: string]: any}) => boolean,
    meta?: NodeMeta,
  },
}
export type Emit = {
  id: ID,
  type: 'emit',
  group: 'cmd',
  data: {
    fullName: string,
    meta?: NodeMeta,
  },
}
export type Compute = {
  id: ID,
  type: 'compute',
  group: 'cmd',
  data: {
    fn: (data: any, scope: {[key: string]: any}) => any,
    meta?: NodeMeta,
  },
}

export type Tap = {
  id: ID,
  type: 'tap',
  group: 'cmd',
  data: {
    fn: (data: any, scope: {[key: string]: any}) => any,
    meta?: NodeMeta,
  },
}

export type Graph = {
  from: Array<Graph>,
  next: Array<Graph>,
  seq: Array<Cmd>,
  scope: {[key: string]: any},
  meta: {[tag: string]: any},
}

//prettier-ignore
export type Graphite =
  | {graphite: Graph}
  | Graph

export type CompositeName = {
  shortName: string,
  fullName: string,
  path: Array<string>,
}

export type Unit = {
  graphite: Graph,
}
