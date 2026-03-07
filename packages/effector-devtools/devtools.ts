import type {Scope} from 'effector'
import {inspect, inspectGraph} from 'effector/inspect'
import type {Message, Declaration, Subscription} from 'effector/inspect'

/**
 * Configuration for devtools
 */
export interface DevtoolsConfig {
  /** Application name shown in devtools */
  name?: string
  /** Effector scope to track (for SSR) */
  scope?: Scope
  /** Maximum number of state snapshots to keep */
  maxHistory?: number
  /** Enable/disable devtools */
  enabled?: boolean
}

/**
 * Store information
 */
export interface StoreInfo {
  id: string
  sid: string | null
  name: string
  value: unknown
  defaultValue: unknown
  derived: boolean
  loc?: {
    file: string
    line: number
    column: number
  }
}

/**
 * Event call information
 */
export interface EventInfo {
  id: string
  sid: string | null
  name: string
  payload: unknown
  timestamp: number
  loc?: {
    file: string
    line: number
    column: number
  }
}

/**
 * Effect execution information
 */
export interface EffectInfo {
  id: string
  sid: string | null
  name: string
  status: 'pending' | 'done' | 'fail'
  params: unknown
  result?: unknown
  error?: unknown
  timestamp: number
  duration?: number
}

/**
 * Graph node representing a unit
 */
export interface GraphNode {
  id: string
  type: 'store' | 'event' | 'effect' | 'domain'
  name: string
  sid: string | null
  derived: boolean
  loc?: {
    file: string
    line: number
    column: number
  }
  meta: Record<string, unknown>
}

/**
 * Graph edge representing a relationship
 */
export interface GraphEdge {
  source: string
  target: string
  type: 'on' | 'map' | 'sample' | 'forward' | 'watch' | 'child'
}

/**
 * Graph structure
 */
export interface GraphStructure {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

/**
 * State snapshot for time travel
 */
export interface StateSnapshot {
  timestamp: number
  stores: Record<string, unknown>
}

/**
 * Devtools instance interface
 */
export interface Devtools {
  /** Subscribe to state changes */
  subscribe(callback: (update: DevtoolsUpdate) => void): () => void
  /** Stop tracking and clean up */
  unsubscribe(): void
  /** Get current graph structure */
  getGraph(): GraphStructure
  /** Get all stores and their current values */
  getStores(): StoreInfo[]
  /** Get event call history */
  getEvents(): EventInfo[]
  /** Get effect execution history */
  getEffects(): EffectInfo[]
  /** Get state history for time travel */
  getHistory(): StateSnapshot[]
  /** Restore state from snapshot */
  restoreSnapshot(snapshot: StateSnapshot): void
}

/**
 * Update event sent to subscribers
 */
export interface DevtoolsUpdate {
  type: 'store' | 'event' | 'effect' | 'declaration'
  data: StoreInfo | EventInfo | EffectInfo | Declaration
  timestamp: number
}

/**
 * Create devtools instance
 */
export function createDevtools(config: DevtoolsConfig = {}): Devtools {
  const {
    name = 'Effector App',
    scope,
    maxHistory = 50,
    enabled = typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production',
  } = config

  if (!enabled) {
    return createNoopDevtools()
  }

  const stores = new Map<string, StoreInfo>()
  const events: EventInfo[] = []
  const effects: EffectInfo[] = []
  const history: StateSnapshot[] = []
  const nodes = new Map<string, GraphNode>()
  const edges: GraphEdge[] = []
  const subscribers = new Set<(update: DevtoolsUpdate) => void>()
  const effectTimings = new Map<string, number>()

  let uninspect: Subscription | null = null
  let uninspectGraph: Subscription | null = null

  function notify(update: DevtoolsUpdate) {
    subscribers.forEach((cb) => cb(update))
  }

  function addToHistory() {
    const snapshot: StateSnapshot = {
      timestamp: Date.now(),
      stores: {},
    }

    stores.forEach((store) => {
      if (!store.derived) {
        snapshot.stores[store.sid || store.id] = store.value
      }
    })

    history.push(snapshot)

    if (history.length > maxHistory) {
      history.shift()
    }
  }

  function handleMessage(m: Message) {
    const timestamp = Date.now()

    if (m.kind === 'store' && m.type === 'update') {
      const existing = stores.get(m.id)
      if (existing) {
        existing.value = m.value
      } else {
        stores.set(m.id, {
          id: m.id,
          sid: m.sid || null,
          name: m.name || 'unknown',
          value: m.value,
          defaultValue: m.meta?.defaultState,
          derived: m.derived || false,
          loc: m.loc,
        })
      }

      notify({
        type: 'store',
        data: stores.get(m.id)!,
        timestamp,
      })

      // Add to history on store update
      addToHistory()
    }

    if (m.kind === 'event' && !m.meta.derived) {
      const eventInfo: EventInfo = {
        id: m.id,
        sid: m.sid || null,
        name: m.name || 'unknown',
        payload: m.value,
        timestamp,
        loc: m.loc,
      }

      events.push(eventInfo)

      // Keep only last 100 events
      if (events.length > 100) {
        events.shift()
      }

      notify({
        type: 'event',
        data: eventInfo,
        timestamp,
      })
    }

    if (m.kind === 'effect') {
      if (m.type === 'update') {
        const fxId = (m.stack as any)?.fxID || m.id
        effectTimings.set(fxId, timestamp)

        const effectInfo: EffectInfo = {
          id: m.id,
          sid: m.sid || null,
          name: m.name || 'unknown',
          status: 'pending',
          params: m.value,
          timestamp,
        }

        effects.push(effectInfo)
        notify({
          type: 'effect',
          data: effectInfo,
          timestamp,
        })
      }
    }

    // Handle effect finally
    if (m.kind === 'event' && m.meta.named === 'finally') {
      const finallyValue = m.value as {
        status: 'fail' | 'done'
        params: unknown
        result?: unknown
        error?: unknown
      }
      const fxId = (m.stack as any)?.fxID
      const startTime = effectTimings.get(fxId)

      if (fxId && startTime) {
        effectTimings.delete(fxId)
        const duration = timestamp - startTime

        // Find and update the pending effect
        const pendingEffect = [...effects].reverse().find(
          (e) =>
            e.status === 'pending' &&
            (e.id === fxId || (m.stack as any)?.fxID === fxId)
        )

        if (pendingEffect) {
          pendingEffect.status = finallyValue.status
          pendingEffect.result = finallyValue.result
          pendingEffect.error = finallyValue.error
          pendingEffect.duration = duration

          notify({
            type: 'effect',
            data: pendingEffect,
            timestamp,
          })
        }
      }
    }
  }

  function handleDeclaration(d: Declaration) {
    if (d.type === 'unit') {
      const node: GraphNode = {
        id: d.id,
        type: d.kind as 'store' | 'event' | 'effect' | 'domain',
        name: d.name || 'unknown',
        sid: d.sid || null,
        derived: d.derived || false,
        loc: d.loc,
        meta: d.meta,
      }

      nodes.set(d.id, node)

      // Initialize store if needed
      if (d.kind === 'store' && !stores.has(d.id)) {
        stores.set(d.id, {
          id: d.id,
          sid: d.sid || null,
          name: d.name || 'unknown',
          value: d.meta?.defaultState,
          defaultValue: d.meta?.defaultState,
          derived: d.derived || false,
          loc: d.loc,
        })
      }

      notify({
        type: 'declaration',
        data: d,
        timestamp: Date.now(),
      })
    }
  }

  // Initialize inspect
  uninspect = inspect({
    scope,
    fn: handleMessage,
  })

  uninspectGraph = inspectGraph({
    fn: handleDeclaration,
  })

  return {
    subscribe(callback) {
      subscribers.add(callback)
      return () => subscribers.delete(callback)
    },

    unsubscribe() {
      uninspect?.()
      uninspectGraph?.()
      subscribers.clear()
    },

    getGraph(): GraphStructure {
      return {
        nodes: Array.from(nodes.values()),
        edges,
      }
    },

    getStores(): StoreInfo[] {
      return Array.from(stores.values())
    },

    getEvents(): EventInfo[] {
      return [...events]
    },

    getEffects(): EffectInfo[] {
      return [...effects]
    },

    getHistory(): StateSnapshot[] {
      return [...history]
    },

    restoreSnapshot(snapshot: StateSnapshot) {
      // This would require integration with effector's fork API
      // For now, it's a placeholder
      console.warn(
        'restoreSnapshot requires manual implementation with fork API'
      )
    },
  }
}

/**
 * Create a no-op devtools instance for production
 */
function createNoopDevtools(): Devtools {
  return {
    subscribe: () => () => {},
    unsubscribe: () => {},
    getGraph: () => ({ nodes: [], edges: [] }),
    getStores: () => [],
    getEvents: () => [],
    getEffects: () => [],
    getHistory: () => [],
    restoreSnapshot: () => {},
  }
}

// Re-export types from effector/inspect
export type { Message, Declaration, Subscription } from 'effector/inspect'
