import {getForkPage, getGraph, getMeta, getParent} from '../getter'
import {setForkPage, getPageRef, currentPage} from '../kernel'
import {is} from '../is'
import {createNode} from '../createNode'
import {calc, compute} from '../step'
import type {Domain, Scope, SettledDefer, Store} from '../unit.h'
import type {StateRef} from '../index.h'
import {forEach} from '../collection'
import {DOMAIN, SAMPLER, SCOPE} from '../tag'

export function createScope(baseUnit?: Domain | Scope): Scope {
  const forkInFlightCounter = createNode({
    scope: {
      defers: [],
      inFlight: 0,
      fxID: 0,
    },
    node: [
      calc((_, scope, stack) => {
        if (!getParent(stack)) {
          scope.fxID += 1
          return
        }
        if (getMeta(getParent(stack).node, 'needFxCounter') === 'dec') {
          scope.inFlight -= 1
        } else {
          scope.inFlight += 1
          scope.fxID += 1
        }
      }),
      compute({priority: SAMPLER, batch: true}),
      calc(
        (
          _,
          scope: {
            inFlight: number
            fxID: number
            defers: SettledDefer[]
          },
        ) => {
          const {defers, fxID} = scope
          if (scope.inFlight > 0 || defers.length === 0) return
          Promise.resolve().then(() => {
            if (scope.fxID !== fxID) return
            forEach(defers.splice(0, defers.length), defer => {
              setForkPage(defer.parentFork)
              defer.rs(defer.value)
            })
          })
        },
        false,
        true,
      ),
    ],
  })
  const page = {} as Record<string, StateRef>
  const storeChange = createNode({
    node: [
      calc((value, __, stack) => {
        const storeStack = getParent(stack)
        if (storeStack) {
          const storeNode = storeStack.node
          if (
            !getMeta(storeNode, 'isCombine') ||
            (getParent(storeStack) &&
              getMeta(getParent(storeStack).node, 'op') !== 'combine')
          ) {
            const forkPage = getForkPage(stack)!
            const id = storeNode.scope.state.id
            const sid = getMeta(storeNode, 'sid')
            forkPage.sidIdMap[sid] = id
            forkPage.sidValuesMap[sid] = value

            const serialize = getMeta(storeNode, 'serialize')
            if (serialize && serialize !== 'ignore') {
              forkPage.sidSerializeMap[sid] = serialize.write
            }
          }
        }
      }),
    ],
  })
  const warnSerializeNode = createNode({
    node: [
      calc((_, __, stack) => {
        const forkPage = getForkPage(stack)
        if (forkPage) {
          const storeStack = getParent(stack)
          if (storeStack) {
            const storeNode = storeStack.node
            if (
              !getMeta(storeNode, 'isCombine') ||
              (getParent(storeStack) &&
                getMeta(getParent(storeStack).node, 'op') !== 'combine')
            ) {
              forkPage.warnSerialize = true
            }
          }
        }
      }),
    ],
  })
  const resultScope: Scope = {
    cloneOf: is.domain(baseUnit) ? baseUnit : undefined,
    reg: page,
    sidValuesMap: {},
    sidIdMap: {},
    sidSerializeMap: {},
    getState(store: StateRef | Store<any>) {
      if ('current' in store) {
        return getPageRef(currentPage, resultScope, null, store).current
      }
      const node = getGraph(store)
      return getPageRef(currentPage, resultScope, node, node.scope.state, true)
        .current
    },
    kind: SCOPE,
    graphite: createNode({
      family: {
        type: DOMAIN,
        links: [forkInFlightCounter, storeChange, warnSerializeNode],
      },
      meta: {unit: 'fork'},
      scope: {forkInFlightCounter},
    }),
    additionalLinks: {},
    handlers: {},
    fxCount: forkInFlightCounter,
    storeChange,
    warnSerializeNode,
    scopeRef: {ref: null as unknown as Scope},
  }
  // set initial scope ref to the scope itself
  resultScope.scopeRef.ref = resultScope

  if (is.scope(baseUnit)) {
    const oldScope = baseUnit
    // Update old scope scopeRef
    // to redirect all effect.finally and scope-binded events to new scope
    oldScope.scopeRef.ref = resultScope

    // transfer old scope scopeRef to the new scope,
    // so any further fork(scope) calls will also redirect any effect.finally and scope-binded events to new scope
    resultScope.scopeRef = oldScope.scopeRef

    // transfer old scope state to the new one
    resultScope.sidValuesMap = {...oldScope.sidValuesMap}
    resultScope.sidSerializeMap = oldScope.sidSerializeMap

    // transfer old scope handlers to the new one
    resultScope.handlers = oldScope.handlers

    // transfer old scope additionalLinks to the new one
    resultScope.additionalLinks = oldScope.additionalLinks
  }

  return resultScope
}
