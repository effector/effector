import {getForkPage, getGraph, getMeta} from '../getter'
import {setForkPage, getPageRef, currentPage} from '../kernel'
import {createNode} from '../createNode'
import {calc, compute} from '../step'
import type {Scope, SettledDefer, Store} from '../unit.h'
import type {Stack, StateRef} from '../index.h'
import {forEach} from '../collection'
import {DOMAIN, SAMPLER, SCOPE} from '../tag'

export function createScope(): Scope {
  const forkInFlightCounter = createNode({
    scope: {
      defers: [],
      inFlight: 0,
      fxID: 0,
    },
    node: [
      calc((_, scope, stack) => {
        if (!stack.parent) {
          scope.fxID += 1
          return
        }
        if (stack.parent.node.meta.needFxCounter === 'dec') {
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
        const storeStack = stack.parent
        if (storeStack) {
          const storeNode = storeStack.node
          if (isNotCombineNode(storeStack)) {
            const forkPage = getForkPage(stack)!
            const id = storeNode.scope.state.id
            const sid = storeNode.meta.sid
            forkPage.sidIdMap[sid] = id
            forkPage.values.sidMap[sid] = value

            const serialize = storeNode.meta.serialize
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
  const warnSerializeNode = createNode({
    node: [
      calc((_, __, stack) => {
        const forkPage = getForkPage(stack)
        const parent = stack.parent
        if (forkPage && parent) {
          if (isNotCombineNode(parent)) {
            forkPage.warnSerializeTraces.add(getMeta(parent.node, 'storeTrace'))
          }
        }
      }),
    ],
  })
  const resultScope: Scope = {
    reg: page,
    values: {sidMap: {}, idMap: {}},
    sidIdMap: {},
    sidSerializeSettings: new Map(),
    getState(store: StateRef | Store<any>) {
      if ('current' in store) {
        return getPageRef(currentPage, resultScope, store, false).current
      }
      const node = getGraph(store)
      return getPageRef(currentPage, resultScope, node.scope.state, true)
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
    handlers: new Map(),
    fxCount: forkInFlightCounter,
    storeChange,
    warnSerializeTraces: new Set(),
    warnSerializeNode,
  }
  return resultScope
}

const isNotCombineNode = (storeStack: Stack) =>
  !storeStack.node.meta.isCombine ||
  (storeStack.parent && storeStack.parent.node.meta.op !== 'combine')
