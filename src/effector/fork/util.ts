import {getForkPage, getGraph, getMeta, getParent} from '../getter'
import {is} from '../is'
import {throwError} from '../throw'
import {setForkPage, getPageRef, currentPage} from '../kernel'
import {createNode} from '../createNode'
import {step} from '../typedef'
import type {Scope, Store} from '../unit.h'
import type {Node, StateRef} from '../index.h'
import {forEach} from '../collection'
import {DOMAIN, SAMPLER, FORK_COUNTER, SCOPE} from '../tag'

export function normalizeValues(
  values: Map<Store<any>, any> | Record<string, any>,
  assertEach = (key: any, value: any) => {},
) {
  if (values instanceof Map) {
    const result = {} as Record<string, any>
    for (const [key, value] of values) {
      if (!is.unit(key)) throwError('Map key should be a unit')
      assertEach(key, value)
      result[key.sid!] = value
    }
    return result
  }
  return values
}

/**
 everything we need to clone graph section
 reachable from given unit
 */
export function cloneGraph(unit: any): Scope {
  const forkInFlightCounter = createNode({
    scope: {
      defers: [],
      inFlight: 0,
      fxID: 0,
    },
    node: [
      step.compute({
        fn(_, scope, stack) {
          if (!getParent(stack)) {
            scope.fxID += 1
            return
          }
          if (getMeta(getParent(stack).node, 'named') === 'finally') {
            scope.inFlight -= 1
          } else {
            scope.inFlight += 1
            scope.fxID += 1
          }
        },
      }),
      step.barrier({priority: SAMPLER}),
      step.run({
        fn(_, scope) {
          const {inFlight, defers, fxID} = scope
          if (inFlight > 0 || defers.length === 0) return
          Promise.resolve().then(() => {
            if (scope.fxID !== fxID) return
            forEach(defers.splice(0, defers.length), (defer: any) => {
              setForkPage(defer.parentFork)
              defer.rs(defer.value)
            })
          })
        },
      }),
    ],
    meta: {unit: FORK_COUNTER},
  })
  const page = {} as Record<string, StateRef>
  const storeChange = createNode({
    node: [
      step.compute({
        fn(value, __, stack) {
          const storeStack = getParent(stack)
          if (storeStack && getParent(storeStack)) {
            const storeNode = storeStack.node
            if (
              !getMeta(storeNode, 'isCombine') ||
              getMeta(getParent(storeStack).node, 'op') !== 'combine'
            ) {
              const forkPage: Scope = getForkPage(stack)
              const id = storeNode.scope.state.id
              const sid = getMeta(storeNode, 'sid')
              forkPage.sidIdMap[sid] = id
              forkPage.sidValuesMap[sid] = value
            }
          }
        },
      }),
    ],
  })
  const resultScope: Scope = {
    cloneOf: unit,
    reg: page,
    sidValuesMap: {},
    sidIdMap: {},
    getState(store: any) {
      if ('current' in store) {
        return getPageRef(currentPage, resultScope, null, store).current
      }
      return stateGetter(getGraph(store), resultScope)
    },
    kind: SCOPE,
    graphite: createNode({
      family: {
        type: DOMAIN,
        links: [forkInFlightCounter, storeChange],
      },
      meta: {unit: 'fork'},
      scope: {forkInFlightCounter},
    }),
    additionalLinks: {},
    handlers: {},
    fxCount: forkInFlightCounter,
    storeChange,
  }
  return resultScope
}
function stateGetter(node: Node, scope: Scope) {
  return getPageRef(currentPage, scope, node, node.scope.state, true).current
}
