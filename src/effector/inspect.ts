import {Scope, Subscription} from 'effector'

type Loc = {
  file: string
  line: number
  column: number
}

// Watch calculations
type Message = {
  type: 'update' | 'error'
  value: 'unknown'
  stack: Record<string, unknown>
  kind: string
  sid?: string
  id: string
  name?: string
  loc?: Loc
  meta: Record<string, unknown>
  trace?: Message[]
}

export function inspect(config: {
  scope?: Scope
  trace?: boolean
  fn: (message: Message) => void
}): Subscription {
  return createSubscription(() => {})
}

// Track declarations and graph structure
type Declaration = {
  type: 'unit' | 'factory'
  kind: string
  name?: string
  factory?: boolean
  sid?: string
  loc?: Loc
  id: string
  meta: Record<string, unknown>
  parents?: {sid?: string; id: string}[]
}

export function inspectGraph(config: {
  fn: (declaration: Declaration) => void
}): Subscription {
  return createSubscription(() => {})
}

// Utils
function createSubscription(cleanup: () => void): Subscription {
  const result = () => cleanup()
  result.unsubscribe = result
  return result
}
