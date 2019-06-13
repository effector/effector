//@flow
import $$observable from 'symbol-observable'

import {launch} from '../kernel'
import {step, createGraph, Kind, createStateRef} from '../stdlib'
import {createEvent, forward} from '../event'

import type {Store, ThisStore} from './index.h'
import type {StoreConfigPart as ConfigPart} from '../config'
import {createName, type CompositeName} from '../compositeName'
import {thru} from '../thru'
import {
  reset,
  getState,
  off,
  on,
  observable,
  watch,
  subscribe,
  dispatch,
  mapStore,
} from './storeMethods'

export function storeFabric<State>(props: {
  currentState: State,
  config: ConfigPart,
  parent?: CompositeName,
  ...
}): Store<State> {
  const {currentState, config, parent} = props
  const {name} = config
  const plainState = createStateRef(currentState)
  const currentId = name || plainState.id
  const defaultState = currentState
  const compositeName = createName(currentId, parent)

  const updates = createEvent('update ' + currentId)
  const fail = createEvent('fail ' + currentId)
  updates.graphite.meta.event.bound = {
    type: 'updates',
    updates: {
      store: plainState.id,
    },
  }
  const storeInstance: ThisStore = {
    graphite: createGraph({
      scope: {state: plainState, oldState: currentState},
      meta: {
        subtype: 'node',
        node: 'store',
        store: {
          id: plainState.id,
          name: currentId,
          state: plainState,
          bound: null,
        },
      },
      node: [
        step.filter({
          fn: upd => upd !== undefined,
        }),
        step.update({
          store: plainState,
        }),
        step.filter({
          fn(upd, scope) {
            if (upd === scope.oldState) return false
            scope.oldState = upd
            return true
          },
        }),
      ],
    }),
    kind: Kind.store,
    id: plainState.id,
    shortName: currentId,
    domainName: parent,
    defaultConfig: config,
    defaultState,
    plainState,
    subscribers: new Map(),
    compositeName,
  }
  const store: $Shape<Store<State>> = {
    compositeName: storeInstance.compositeName,
    graphite: storeInstance.graphite,
    kind: Kind.store,
    id: plainState.id,
    shortName: currentId,
    domainName: parent,
    setState,
    watch: watch.bind(null, storeInstance),
    updates,
    fail,
    subscribe: subscribe.bind(null, storeInstance),
    getState: getState.bind(null, storeInstance),
    stateRef: plainState,
  }
  ;(store: any).defaultConfig = config
  ;(store: any).reset = reset.bind(store, storeInstance)
  ;(store: any).on = on.bind(store, storeInstance)
  ;(store: any).off = off.bind(store, storeInstance)
  ;(store: any).defaultState = defaultState
  ;(store: any).map = mapStore.bind(storeFabric, store)
  ;(store: any).thru = thru.bind(store)
  ;(store: any).dispatch = dispatch.bind(null)
  //$off
  store[$$observable] = observable.bind(null, storeInstance)
  forward({
    from: store,
    to: updates,
  })

  function setState(value, reduce?: Function) {
    const state = getState(storeInstance)
    const newResult =
      typeof reduce === 'function' ? reduce(state, value) : value

    launch(store, newResult)
  }

  return store
}
