import {Scope, Subscription} from 'effector'

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

export type Declaration = {
  type: 'unit'
  kind: string
  name?: string
  factory?: {
    name?: string
    loc?: {
      file: string
      line: number
      column: number
    }
    method?: string
    sid?: string
    from?: string
  }
  sid?: string
  loc?: {
    file: string
    line: number
    column: number
  }
  id: string
  meta: Record<string, unknown>
  // for derived units - stores or events
  derived?: boolean
}

export function inspectGraph(config: {
  fn: (declaration: Declaration) => void
}): Subscription
