import {getForkPage, getGraph, getLinks, getOwners, getParent} from '../getter'
import {is} from '../is'
import {throwError} from '../throw'
import {setForkPage, initRefInScope, getPageRef, currentPage} from '../kernel'
import {createNode} from '../createNode'
import {step} from '../typedef'
import {Domain, Scope, Store} from '../unit.h'
import {Node, StateRef} from '../index.h'
import {forEach, includes, forIn} from '../collection'
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

export function flatGraph(unit: any) {
  const list = [] as Node[]
  ;(function traverse(node) {
    if (includes(list, node)) return
    list.push(node)
    forEachRelatedNode(node, traverse)
  })(getGraph(unit))
  return list
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
          if (!stack.parent) {
            scope.fxID += 1
            return
          }
          if (stack.parent.node.meta.named === 'finally') {
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
              !storeNode.meta.isCombine ||
              getParent(storeStack).node.meta.op !== 'combine'
            ) {
              const forkPage: Scope = getForkPage(stack)
              const id = storeNode.scope.state.id
              const sid = storeNode.meta.sid
              // forkPage.changedStores.add(id)
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

function forEachRelatedNode(
  node: Node,
  cb: (node: Node, index: number, siblings: Node[]) => void,
) {
  const unit = node.meta.unit
  if (unit === 'fork' || unit === FORK_COUNTER) return
  forEach(node.next, cb)
  forEach(getOwners(node), cb)
  forEach(getLinks(node), cb)
}
