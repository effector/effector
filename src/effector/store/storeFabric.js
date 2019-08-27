//@flow
import $$observable from 'symbol-observable'

import {launch, upsertLaunch} from '../kernel'
import {
  addLinkToOwner,
  step,
  createNode,
  Kind,
  createStateRef,
  readRef,
  bind,
} from '../stdlib'
import {createEvent, forward} from '../event'

import type {Store} from './index.h'
import type {StoreConfigPart as ConfigPart} from '../config'
import {createName, type CompositeName} from '../compositeName'
import {thru} from '../thru'
import {
  reset,
  off,
  on,
  observable,
  watch,
  subscribe,
  mapStore,
} from './storeMethods'

export function storeFabric<State>(props: {
  +currentState: State,
  +config: ConfigPart,
  +parent?: CompositeName,
  ...
}): Store<State> {
  const {currentState, config, parent} = props
  const {name, sid = null} = config
  const plainState = createStateRef(currentState)
  const currentId = name || plainState.id
  const defaultState = currentState
  const compositeName = createName(currentId, parent)

  const updates = createEvent('update ' + currentId)

  const store: $Shape<Store<State>> = ({
    subscribers: new Map(),
    compositeName,
    graphite: createNode({
      scope: {state: plainState, oldState: currentState},
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
    updates,
    defaultConfig: config,
    defaultState,
    getState: bind(readRef, plainState),
    stateRef: plainState,
    sid,
  }: any)
  ;(store: any).subscribe = bind(subscribe, store)
  ;(store: any).watch = bind(watch, store)
  ;(store: any).reset = bind(reset, store)
  ;(store: any).on = bind(on, store)
  ;(store: any).off = bind(off, store)
  ;(store: any).map = bind(mapStore, store)
  ;(store: any).thru = bind(thru, store)
  ;(store: any).setState = bind(upsertLaunch, store)
  //$off
  store[$$observable] = bind(observable, store)
  forward({
    from: store,
    to: updates,
  })
  addLinkToOwner(store, updates)
  return store
}
