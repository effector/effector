import {Scope, Subscription, Show, ID} from 'effector'

type Loc = Show<{
  file: string
  line: number
  column: number
}>

type NodeCommonMeta = Show<{
  kind: string
  sid?: string
  id: ID
  name?: string
  loc?: Loc
  meta: Record<string, unknown>
  derived?: boolean
}>

export type Message = {
  type: 'update' | 'error'
  error?: unknown
  value: unknown
  stack: Record<string, unknown>
  trace?: Message[]
} & NodeCommonMeta

export function inspect(config: {
  scope?: Scope
  trace?: boolean
  fn: (message: Message) => void
}): Subscription

type Region =
  | {
      type: 'region'
      meta: Record<string, unknown>
      region?: Region
    }
  | {
      type: 'factory'
      meta: Record<string, unknown>
      region?: Region
      sid?: string
      name?: string
      method?: string
      loc?: {
        file: string
        line: number
        column: number
      }
    }

type UnitDeclaration = {
  type: 'unit'
  meta: Record<string, unknown>
  region?: Region
} & NodeCommonMeta

type OperationDeclaration = {
  type: 'operation'
  meta: Record<string, unknown>
  region?: Region
  kind: string
  config: {
    // Common config shape for most of operators
    // sample, combine, guard, forward, etc - all can be expressed this way
    source?:
      | UnitDeclaration
      | UnitDeclaration[]
      | Record<string, UnitDeclaration>
    clock?: UnitDeclaration | UnitDeclaration[]
    filter?: UnitDeclaration | {type: 'function'}
    target?: UnitDeclaration | UnitDeclaration[]
    fn?: {type: 'function'}
    // Special fields for split operator only
    match?:
      | UnitDeclaration
      | {type: 'function'}
      | Record<string, UnitDeclaration>
      | Record<string, {type: 'function'}>
    cases?: Record<string, UnitDeclaration>
  }
}

export type Declaration = (UnitDeclaration | OperationDeclaration | Region) &
  // these fields are not provided to regions or factories
  // however, to make it easier to work with it in Typescript
  // and to avoid annoying `some prop does not exist` errors
  // they are explictily set to undefined
  Partial<NodeCommonMeta>

export function inspectGraph(config: {
  fn: (declaration: Declaration) => void
}): Subscription
