import {Scope, Subscription, Show, ID} from 'effector'

type NodeCommonMeta = Show<{
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
  family?: {
    links: NodeCommonMeta[]
    owners: NodeCommonMeta[]
  }
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

export type Declaration =
  | ({
      type: 'unit'
      region?: Show<Region>
      // for derived units - stores or events
      derived?: boolean
    } & NodeCommonMeta)
  | {
      type: 'factory'
      id: ID
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
      // these fields are not provided to factories
      // however, to make it easier to work with it in Typescript
      // and to avoid annoying `some prop does not exist` errors
      // they are explictily set to undefined
      kind?: undefined
      derived?: undefined
      family?: undefined
    }
  | {
      type: 'region'
      id: ID
      region?: Region
      meta: Record<string, unknown>
      // these fields are not provided to regions
      // however, to make it easier to work with it in Typescript
      // and to avoid annoying `some prop does not exist` errors
      // they are explictily set to undefined
      kind?: undefined
      derived?: undefined
      sid?: undefined
      name?: undefined
      method?: undefined
      loc?: undefined
      family?: undefined
    }

export function inspectGraph(config: {
  fn: (declaration: Declaration) => void
}): Subscription
