//@flow
import $$observable from 'symbol-observable'

import {cmd, createGraph, Kind, createStateRef} from 'effector/stdlib'
import {createEvent} from 'effector/event'

import type {Store, ThisStore} from './index.h'
import {createName, type CompositeName} from '../compositeName'
import {
  reset,
  getState,
  off,
  on,
  observable,
  watch,
  subscribe,
  thru,
  dispatch,
  mapStore,
} from './storeMethods'

export function storeFabric<State>(props: {
  currentState: State,
  name?: string,
  parent?: CompositeName,
}): Store<State> {
  const {currentState, name, parent} = props
  const plainState = createStateRef(currentState)
  const currentId = name || plainState.id
  const defaultState = currentState
  const compositeName = createName(currentId, parent)

  const updater: any = createEvent('update ' + currentId)
  const meta = {
    fullName: compositeName.fullName,
    section: currentId,
  }
  const storeInstance: ThisStore = {
    graphite: createGraph({
      node: [
        cmd('filter', {
          fn: filterBeforeUpdate.bind(plainState),
          meta,
        }),
        cmd('update', {
          store: plainState,
          meta,
        }),
      ],
    }),
    kind: Kind.store,
    id: currentId,
    shortName: currentId,
    domainName: parent,
    defaultState,
    plainState,
    subscribers: new Map(),
    compositeName,
  }
  const store: $Shape<Store<State>> = {
    compositeName: storeInstance.compositeName,
    graphite: storeInstance.graphite,
    kind: Kind.store,
    id: currentId,
    shortName: currentId,
    domainName: parent,
    setState,
    off: off.bind(null, storeInstance),
    watch: watch.bind(null, storeInstance),
    subscribe: subscribe.bind(null, storeInstance),
    getState: getState.bind(null, storeInstance),
  }
  ;(store: any).reset = reset.bind(store, storeInstance)
  ;(store: any).on = on.bind(store, storeInstance)
  ;(store: any).defaultState = defaultState
  ;(store: any).map = mapStore.bind(storeFabric, store)
  ;(store: any).thru = thru.bind(store)
  ;(store: any).dispatch = dispatch.bind(null)
  //$off
  store[$$observable] = observable.bind(null, storeInstance)
  store.on(updater, (_, payload) => payload)

  function setState(value, reduce?: Function) {
    const currentReducer =
      typeof reduce === 'function' ? reduce : (_, payload) => payload
    const state = getState(storeInstance)
    const newResult = currentReducer(state, value)

    updater(newResult)
  }

  return store
}

function filterBeforeUpdate(newValue) {
  return newValue !== undefined && newValue !== this.current
}
