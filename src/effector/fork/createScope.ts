import {getForkPage, getGraph, getMeta, getParent} from '../getter'
import {setForkPage, getPageRef, currentPage} from '../kernel'
import {createNode} from '../createNode'
import {calc, compute} from '../step'
import type {Domain, Scope, SettledDefer, Store} from '../unit.h'
import type {StateRef} from '../index.h'
import {forEach} from '../collection'
import {DOMAIN, SAMPLER, SCOPE} from '../tag'

export function createScope(unit?: Domain): Scope {
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
  forkInFlightCounter.lazy = {
    alwaysActive: true,
    usedBy: 0,
    activate: [],
  }
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
            forkPage.values.sidMap[sid] = value

            const serialize = getMeta(storeNode, 'serialize')
            if (serialize) {
              if (serialize === 'ignore') {
                forkPage.sidSerializeSettings.set(sid, {ignore: true})
              } else {
                forkPage.sidSerializeSettings.set(sid, {
                  ignore: false,
                  write: serialize.write,
                })
              }
            }
          }
        }
      }),
    ],
  })
  storeChange.lazy = {
    alwaysActive: true,
    usedBy: 0,
    activate: [],
  }
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
  warnSerializeNode.lazy = {
    alwaysActive: true,
    usedBy: 0,
    activate: [],
  }
  const resultScope: Scope = {
    cloneOf: unit,
    reg: page,
    values: {sidMap: {}, idMap: {}},
    sidIdMap: {},
    sidSerializeSettings: new Map(),
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
    handlers: {sidMap: {}, unitMap: new Map()},
    fxCount: forkInFlightCounter,
    storeChange,
    warnSerializeNode,
    lazy: {},
  }
  return resultScope
}
