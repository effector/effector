import {Scope, Subscription, Show} from 'effector'

export type Message = {
  type: 'update' | 'error'
  value: unknown
  stack: Record<string, unknown>
  kind: string
  sid?: string
  id: string
  name?: string
  loc?: {
    file: string
    line: number
    column: number
  }
  meta: Record<string, unknown>
  trace?: Message[]
}

export function inspect(config: {
  scope?: Scope
  trace?: boolean
  fn: (message: Message) => void
}): Subscription

type Region =
  | {
      type: 'region'
      meta: Record<string, unknown>
      parent?: Region
    }
  | {
      type: 'factory'
      parent?: Region
      meta: {
        sid?: string
        name?: string
        method?: string
        loc?: {
          file: string
          line: number
          column: number
        }
      }
    }

export type Declaration = {
  type: 'unit'
  kind: string
  name?: string
  id: string
  sid?: string
  loc?: {
    file: string
    line: number
    column: number
  }
  meta: Record<string, unknown>
  region?: Show<Region>
  // for derived units - stores or events
  derived?: boolean
}

export function inspectGraph(config: {
  fn: (declaration: Declaration) => void
}): Subscription
