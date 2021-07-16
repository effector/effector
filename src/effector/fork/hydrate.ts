import {is, isObject} from '../is'
import {throwError} from '../throw'
import {launch} from '../kernel'
import {Domain, Scope} from '../unit.h'
import {Node, StateRef} from '../index.h'
import {forEach, includes, forIn} from '../collection'
import {STORE, MAP} from '../tag'
import {normalizeValues, flatGraph} from './util'

/**
 hydrate state on client

 const root = createDomain()
 hydrate(root, {
  values: window.__initialState__
})

 */
export function hydrate(domain: Domain | Scope, {values}: {values: any}) {
  if (!isObject(values)) {
    throwError('values property should be an object')
  }
  const normalizedValues = normalizeValues(values)
  let storeWatches: Node[]
  let storeWatchesValues: any[]
  let forkPage: Scope
  if (is.scope(domain)) {
    forkPage = domain
    storeWatches = []
    storeWatchesValues = []
    const valuesSidList = Object.getOwnPropertyNames(normalizedValues)
    Object.assign(forkPage.sidValuesMap, normalizedValues)
    forEach(flatGraph(forkPage.cloneOf), node => {
      const {meta, scope} = node
      const {unit, sid} = meta
      if (unit === STORE) {
        if (sid && includes(valuesSidList, sid)) {
          const {state} = scope
          // forkPage.reg[state.id].current = normalizedValues[sid]
          // forkPage.changedStores.add(state.id)
          forkPage.sidIdMap[sid] = state.id
          storeWatches.push(node)
          storeWatchesValues.push(normalizedValues[sid])
        }
      }
    })
    launch({
      target: storeWatches!,
      params: storeWatchesValues!,
      forkPage,
    })
  } else if (is.domain(domain)) {
    const flatGraphUnits = flatGraph(domain)

    storeWatches = []
    const storeWatchesRefs: StateRef[] = []
    const refsMap = {} as Record<string, StateRef>
    const valuesSidList = Object.getOwnPropertyNames(normalizedValues)
    const storesToUpdate: Node[] = []
    const watchesToCall: Node[] = []
    const valuesToUpdate = new Map<StateRef, any>()
    // const nodeValueMap: Record<string, {node: Node; value: any}> = {}
    forEach(flatGraphUnits, node => {
      const {reg} = node
      const {op, unit, sid} = node.meta
      if (unit === STORE) {
        if (sid && includes(valuesSidList, sid)) {
          const state: StateRef = node.scope.state
          state.current = normalizedValues[sid]
          // predefinedRefs.add(state)
          storesToUpdate.push(node)
          valuesToUpdate.set(state, normalizedValues[sid])
          refsMap[state.id] = state
        }
      }
      if (op === 'watch') {
        const owner = node.family.owners[0]
        if (owner.meta.unit === STORE) {
          storeWatches.push(node)
          storeWatchesRefs.push(owner.scope.state)
          watchesToCall.push(node)
        }
      }
      Object.assign(refsMap, reg)
    })
    forIn(refsMap, ref => {
      let isFresh = false
      if (ref.before && !valuesToUpdate.has(ref)) {
        forEach(ref.before, cmd => {
          switch (cmd.type) {
            case MAP: {
              const from = cmd.from
              if (from || cmd.fn) {
                const value = from && from.current // refsMap[from.id] && refsMap[from.id].current
                ref.current = cmd.fn ? cmd.fn(value) : value
              }
              break
            }
            case 'field': {
              const from = refsMap[cmd.from.id]
              if (!isFresh) {
                isFresh = true
                if (Array.isArray(ref.current)) {
                  ref.current = [...ref.current]
                } else {
                  ref.current = {...ref.current}
                }
              }
              ref.current[cmd.field] = from.current
              break
            }
            case 'closure':
              break
          }
        })
      } else if (valuesToUpdate.has(ref)) {
        // ref.current = valuesToUpdate.get(ref)
      }
    })
    // forEach(predefinedRefs, ref => {
    //   execRef(predefinedRefs, refsMap, ref, ref)
    // })
    storeWatchesValues = storeWatchesRefs.map(({current}) => current)
    // launch({
    //   target: storesToUpdate,
    //   params: valuesToUpdate,
    // })
    launch({
      target: storeWatches!,
      params: storeWatchesValues!,
    })
  } else {
    throwError('first argument of hydrate should be domain or scope')
  }
}
