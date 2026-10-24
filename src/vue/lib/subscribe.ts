import {Scope, Store, createWatch} from 'effector'
import {Ref, customRef, shallowRef} from 'vue-next'

import {tryOnScopeDispose} from './dispose'
import {isServerRender} from './ssr'
import {stateReader} from './state-reader'

/**
 * Subscribes a composable call to the stores it reads and returns a ref per
 * store, in the order they came in. Stores that repeat share one ref and one
 * node.
 *
 * The whole call takes a single `createWatch` with `batch: true`: the stores
 * share one sampler barrier there, so a launch that updates several of them
 * calls back once. The callback ignores the value it receives and re-reads
 * every store instead: at the barrier the stack holds the state of whichever
 * store reached it first. effector-react and effector-solid re-read their
 * stores the same way.
 */
export function subscribeStores(
  name: string,
  stores: Store<any>[],
  scope?: Scope,
): Ref<any>[] {
  const onServer = isServerRender()
  const refs: Ref<any>[] = []
  const refById: Record<string, Ref<any>> = {}
  const uniqueStores: Store<any>[] = []

  for (const store of stores) {
    const id = store.graphite.id
    if (!refById[id]) {
      refById[id] = onServer
        ? serverRef(store, scope)
        : shallowRef(stateReader(store, scope))
      uniqueStores.push(store)
    }
    refs.push(refById[id])
  }

  if (!onServer && uniqueStores.length > 0) {
    const stop = createWatch({
      unit: uniqueStores,
      fn: () => {
        for (const store of uniqueStores) {
          refById[store.graphite.id].value = stateReader(store, scope)
        }
      },
      scope,
      batch: true,
    })

    tryOnScopeDispose(name, stop)
  }

  return refs
}

/**
 * A server render has no lifecycle to unsubscribe in, and the state keeps
 * changing until the last `onServerPrefetch` resolves: the ref reads the
 * scope when the template asks for it instead of keeping a snapshot.
 */
function serverRef(store: Store<any>, scope?: Scope): Ref<any> {
  return customRef(() => ({
    get: () => stateReader(store, scope),
    set: () => {},
  }))
}
