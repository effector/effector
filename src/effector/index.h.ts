import type {Stack} from './kernel'

export type ID = string

export type kind = 'store' | 'event' | 'effect' | 'domain' | 'scope'

export type StateRefOp =
  | {type: 'map'; from?: StateRef; fn?: (value: any) => any}
  | {type: 'field'; from: StateRef; field: string}
  | {type: 'closure'; of: StateRef}

export type StateRef = {
  id: ID
  current: any
  type?: 'list' | 'shape'
  before?: StateRefOp[]
  noInit?: boolean
  sid?: string
}

export type Config = {
  loc?: {
    file: string
    column: number
    line: number
  }
  sid?: string
  named?: string
  name?: string | Config
  ɔ?: Config
  config?: Config
  parent?: any
  strict?: boolean
  handler?: Function
}

export type Node = {
  id: ID
  next: Array<Node>
  seq: Array<Cmd>
  scope: {[key: string]: any}
  reg: {[id: string]: StateRef}
  meta: {[tag: string]: any}
  family: {
    type: 'regular' | 'crosslink' | 'domain'
    links: Node[]
    owners: Node[]
  }
}

export type NodeUnit = {graphite: Node} | Node

export interface Unit {
  graphite: Node
}

export type Subscriber<A> = {
  next?: (value: A) => void
}

export type Subscription = {
  (): void
  unsubscribe(): void
}

export type Cmd =
  | CheckDefined
  | CheckChanged
  | Run
  | Filter
  | Compute
  | Barrier
  | Mov

type FromValue<T = unknown> = {
  from: 'value'
  store: T
}
type FromStore = {
  from: 'store'
  store: StateRef
}
type FromRegister = {
  from: 'a' | 'b' | 'stack'
}

type ToRegister = {
  to: 'a' | 'b' | 'stack'
}
type ToStore = {
  to: 'store'
  target: StateRef
}

export type MovValueToRegister<T = unknown> = MoveCmd<FromValue<T> & ToRegister>
export type MovValueToStore<T = unknown> = MoveCmd<FromValue<T> & ToStore>
export type MovStoreToRegister = MoveCmd<FromStore & ToRegister>
export type MovStoreToStore = MoveCmd<FromStore & ToStore>
export type MovRegisterToRegister = MoveCmd<FromRegister & ToRegister>
export type MovRegisterToStore = MoveCmd<FromRegister & ToStore>

type MoveCmd<Data> = {
  id: ID
  type: 'mov'
  data: Data
}

export type Mov =
  | MovValueToRegister
  | MovValueToStore
  | MovStoreToRegister
  | MovStoreToStore
  | MovRegisterToRegister
  | MovRegisterToStore

export type CheckChanged = {
  id: ID
  type: 'check'
  data: {type: 'changed'; store: StateRef}
}
export type CheckDefined = {
  id: ID
  type: 'check'
  data: {type: 'defined'}
}

export type Barrier = {
  id: ID
  type: 'barrier'
  data: {
    barrierID: number
    priority: 'barrier' | 'sampler'
  }
}

export type Run = {
  id: ID
  type: 'run'
  data: {
    fn: (data: any, scope: {[key: string]: any}, reg: Stack) => any
  }
}

export type Filter = {
  id: ID
  type: 'filter'
  data: {
    fn: (data: any, scope: {[key: string]: any}, reg: Stack) => boolean
  }
}
export type Compute = {
  id: ID
  type: 'compute'
  data: {
    fn: (data: any, scope: {[key: string]: any}, reg: Stack) => any
  }
}
