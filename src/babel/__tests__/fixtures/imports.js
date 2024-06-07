import {
  createStore as createStoreEffector,
  attach as attachEffector,
  clearNode as clearNodeEffector,
  combine as combineEffector,
  createApi as createApiEffector,
  createDomain as createDomainEffector,
  createEffect as createEffectEffector,
  createNode as createNodeEffector,
  createEvent as createEventEffector,
  fromObservable as fromObservableEffector,
  guard as guardEffector,
  launch as launchEffector,
  merge as mergeEffector,
  restore as restoreEffector,
  sample as sampleEffector,
  split as splitEffector,
  withRegion as withRegionEffector,
  hydrate as hydrateEffector,
  serialize as serializeEffector,
  scopeBind as scopeBindEffector,
  fork as forkEffector,
  allSettled as allSettledEffector,
} from 'effector'
import {createStore} from 'redux'

{
  const domain = createDomainEffector()
  const event = createEventEffector()
  const store = createStoreEffector(0)
  const effect = createEffectEffector()
  const domainEvent = domain.createEvent()
  const scope = forkEffector(domain)
  const node = createNodeEffector()

  const a = attachEffector({effect})
  const b = clearNodeEffector(node)
  const c = combineEffector({store})
  const d = createApiEffector(store, {})
  const l = guardEffector({source: event, filter: Boolean})
  const m = launchEffector(event, null)
  const n = mergeEffector([event])
  const o = restoreEffector(event, null)
  const p = sampleEffector({source: store, clock: event})
  const q = splitEffector(event, {})
  const r = withRegionEffector(node, () => {})
  const s = hydrateEffector(scope, {values: {}})
  const t = serializeEffector(scope)
  const u = scopeBindEffector(domainEvent)
  const w = allSettledEffector(domainEvent, {scope})
}

function nameClashCheck() {
  const domain = createDomain()
  const event = createEvent()
  const store = createStore(0)
  const effect = createEffect()
  const domainEvent = domain.createEvent()
  const scope = fork(domain)
  const node = createNode()

  const a = attach({effect})
  const b = clearNode(node)
  const c = combine({store})
  const d = createApi(store, {})
  const l = guard({source: event, filter: Boolean})
  const m = launch(event, null)
  const n = merge([event])
  const o = restore(event, null)
  const p = sample({source: store, clock: event})
  const q = split(event, {})
  const r = withRegion(node, () => {})
  const s = hydrate(scope, {values: {}})
  const t = serialize(scope)
  const u = scopeBind(domainEvent)
  const w = allSettled(domainEvent, {scope})
}

const reduxStore = createStore(() => 0)

import {
  createStore as attach,
  createStore as clearNode,
  createStore as combine,
  createStore as createApi,
  createStore as createDomain,
  createStore as createEffect,
  createStore as createNode,
  createStore as createEvent,
  createStore as fromObservable,
  createStore as guard,
  createStore as launch,
  createStore as merge,
  createStore as restore,
  createStore as sample,
  createStore as split,
  createStore as withRegion,
  createStore as hydrate,
  createStore as serialize,
  createStore as scopeBind,
  createStore as fork,
  createStore as allSettled,
} from 'redux'
