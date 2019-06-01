//@flow

import type {StateRef} from './stdlib'

/**
 * plain store
 */
export type StoreMeta = {
  subtype: 'node',
  node: 'store',
  store: {
    id: string,
    name: string,
    state: StateRef,
    bound: null,
  },
}

/**
 * plain event
 */
export type EventMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: null,
  },
}

/**
 * plain effect
 */
export type EffectMeta = {
  subtype: 'node',
  node: 'effect',
  effect: {
    name: string,
  },
}

/**
 * effect.done meta
 */
export type EffectDoneMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: {
      type: 'effect',
      subtype: 'done',
      effect: {
        name: string,
      },
    },
  },
}

/**
 * effect.fail meta
 */
export type EffectFailMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: {
      type: 'effect',
      subtype: 'fail',
      effect: {
        name: string,
      },
    },
  },
}

/**
 * store.updates event
 */
export type UpdatesMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: {
      type: 'updates',
      updates: {
        store: string,
      },
    },
  },
}

/**
 * event.prepend event
 */
export type EventPrependMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: {
      type: 'prepend',
      prepend: {
        event: string,
      },
    },
  },
}

/**
 * event.map event
 */
export type EventMapMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: {
      type: 'map',
      map: {
        event: string,
      },
    },
  },
}

/**
 * event.filter event
 */
export type EventFilterMeta = {
  subtype: 'node',
  node: 'event',
  event: {
    id: string,
    name: string,
    bound: {
      type: 'filter',
      filter: {
        event: string,
      },
    },
  },
}

/**
 * store.map store
 */
export type StoreMapMeta = {
  subtype: 'node',
  node: 'store',
  store: {
    id: string,
    name: string,
    state: StateRef,
    bound: {
      type: 'map',
      store: string,
    },
  },
}

/**
 * store.on crosslink
 */
export type OnCrossLink = {
  subtype: 'crosslink',
  crosslink: 'on',
  on: {
    from: string,
    to: string,
  },
}

/**
 * store.subscribe crosslink
 */
export type SubscribeCrossLink = {
  subtype: 'crosslink',
  crosslink: 'subscribe',
  subscribe: {
    store: string,
  },
}

/**
 * store.map crosslink
 */
export type StoreMapCrossLink = {
  subtype: 'crosslink',
  crosslink: 'store_map',
  store_map: {
    from: string,
    to: string,
  },
}

/**
 * event.filter crosslink
 */
export type EventFilterCrossLink = {
  subtype: 'crosslink',
  crosslink: 'event_filter',
  event_filter: {
    from: string,
    to: string,
  },
}

/**
 * event.watch crosslink
 */
export type EventWatchCrossLink = {
  subtype: 'crosslink',
  crosslink: 'event_watch',
  event_watch: {
    event: string,
  },
}

/**
 * event.prepend crosslink
 */
export type EventPrependCrossLink = {
  subtype: 'crosslink',
  crosslink: 'event_prepend',
  event_prepend: {
    from: string,
    to: string,
  },
}

/**
 * event.map crosslink
 */
export type EventMapCrossLink = {
  subtype: 'crosslink',
  crosslink: 'event_map',
  event_map: {
    from: string,
    to: string,
  },
}
