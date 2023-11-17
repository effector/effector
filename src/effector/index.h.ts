import type {Leaf} from '../forest/index.h'

import type {BarrierPriorityTag} from './kernel'
import type {Domain, Scope} from './unit.h'

export type ID = string

export type Kind = 'store' | 'event' | 'effect' | 'domain' | 'scope'

export type StateRefOp =
  | {type: 'map'; from?: StateRef; fn?: (value: any) => any}
  | {type: 'field'; from: StateRef; field: string}
  | {type: 'closure'; of: StateRef}

export type StateRef = {
  id: ID
  current: any
  initial?: any
  type?: 'list' | 'shape'
  before?: StateRefOp[]
  noInit?: boolean
  sid?: string
  meta?: {
    serialize?: 'ignore' | {read: (p: any) => any; write: (p: any) => any}
  }
}

export type Config = {
  loc?: {
    file: string
    column: number
    line: number
  }
  sid?: string
  named?: string
  name?: string
  and?: Config
  or?: Config
  parent?: any
  domain?: Domain
  handler?: Function
  derived?: boolean
  serialize?: 'ignore'
  skipVoid?: boolean
}

export type LazyConfig = {
  alwaysActive: boolean
  controller?: boolean
  usedBy: Node[]
  activate: Node[]
}

export type Node = {
  id: ID
  next: Array<Node>
  seq: Array<Cmd>
  scope: {[key: string]: any}
  // reg: {[id: string]: StateRef}
  meta: {[tag: string]: any}
  family: {
    type: 'regular' | 'crosslink' | 'domain'
    links: Node[]
    owners: Node[]
  }
  lazy?: LazyConfig
}

export type NodeUnit = {graphite: Node} | Node

export interface Unit<T = unknown> {
  graphite: Node
  kind: string
}

export type Subscriber<A> = {
  next?: (value: A) => void
}

export type Subscription = {
  (): void
  unsubscribe(): void
}

export type Cmd = Compute | Mov

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
  data: Data & {softRead?: boolean}
  order?: {
    priority: BarrierPriorityTag
    barrierID?: number
  }
}

export type Mov =
  | MovValueToRegister
  | MovValueToStore
  | MovStoreToRegister
  | MovStoreToStore
  | MovRegisterToRegister
  | MovRegisterToStore

export type Compute = {
  id: ID
  type: 'compute'
  data: {
    fn?: (data: any, scope: {[key: string]: any}, reg: Stack) => any
    safe: boolean
    filter: boolean
    pure: boolean
  }
  order?: {
    priority: BarrierPriorityTag
    barrierID?: number
  }
}

/** Call stack */
export type Stack = {
  value: any
  a: any
  b: any
  c?: any
  parent: Stack | null
  node: Node
  page: Leaf | null
  scope?: Scope | null | void
  meta?: Record<string, any> | void
}
