//@flow

import type {Store} from './unit.h'
import {createStore} from './createUnit'
import type {StateRef} from './index.h'
import {createStateRef} from './stateRef'
import {step} from './typedef'
import {getStoreState, getConfig, getNestedConfig, getGraph} from './getter'
import {is, isFunction} from './is'
import {unitObjectName} from './naming'
import {createLinkNode} from './forward'
import {throwError} from './throw'
import {isTemplateRegion} from './region'

export function combine(...args: any[]): Store<any> {
  if (args.length === 0) throwError('at least one argument required')
  let handler
  let stores
  let config
  if (getNestedConfig(args[0])) {
    config = getConfig(args[0])
    args = getNestedConfig(args[0])
  }
  const rawHandler = args[args.length - 1]
  if (isFunction(rawHandler)) {
    stores = args.slice(0, -1)
    handler = rawHandler
  } else {
    stores = args
  }

  let structStoreShape
  let shapeReady
  if (stores.length === 1) {
    const obj = stores[0]
    /*
      without edge case combine(Color, (Color) => '~')
      */
    if (!is.store(obj)) {
      /*
      case combine([R,G,B], ([R,G,B]) => '~')
      case combine({R,G,B}, ({R,G,B}) => '~')

      edge case combine([Color], ([Color]) => '~')
      edge case combine({Color}, ({Color}) => '~')

      edge case combine([R,G,B])
      edge case combine({R,G,B})

      edge case combine([Color])
      edge case combine({Color})
      */
      structStoreShape = obj
      shapeReady = true
    }
  }
  if (!shapeReady) {
    /*
    case combine(R,G,B, (R,G,B) => '~')
    */
    structStoreShape = stores
    /*
    without edge case combine(R,G,B)
    without edge case combine(Color)
    */
    if (handler) {
      handler = spreadArgs(handler)
    }
  }
  //$off
  const mergedStore = Array.isArray(structStoreShape)
    ? storeCombination(
      structStoreShape,
      list => list.slice(),
      [],
      config,
      handler,
    )
    : storeCombination(
      structStoreShape,
      obj => Object.assign({}, obj),
      {},
      config,
      handler,
    )
  return mergedStore
}

const spreadArgs = fn => list => fn(...list)

const storeCombination = (
  obj: any,
  clone: Function,
  defaultState: any,
  config?: string,
  fn?: Function,
) => {
  const stateNew = clone(defaultState)
  const store = createStore(stateNew, {
    name: config ? config : unitObjectName(obj),
  })
  const rawShape = createStateRef(stateNew)
  const isFresh = createStateRef(true)
  const {meta} = getGraph(store)
  meta.fn = fn
  meta.rawShape = rawShape
  meta.shape = obj
  const node = [
    step.check.defined(),
    step.mov({
      store: rawShape,
      to: 'a',
    }),
    //prettier-ignore
    step.filter({
      fn: (upd, {key}, {a}) => upd !== a[key],
    }),
    step.mov({
      store: isFresh,
      to: 'b',
    }),
    step.compute({
      fn(upd, {clone, key}, reg) {
        if (reg.b) {
          reg.a = clone(reg.a)
        }
        reg.a[key] = upd
      },
    }),
    step.mov({
      from: 'a',
      target: rawShape,
    }),
    step.mov({
      from: 'value',
      store: false,
      target: isFresh,
    }),
    step.barrier({priority: 'barrier'}),
    step.mov({
      from: 'value',
      store: true,
      target: isFresh,
    }),
    step.mov({store: rawShape}),
    fn && step.compute({fn}),
    step.check.changed({
      store: getStoreState(store),
    }),
  ]

  for (const key in obj) {
    const child = obj[key]
    if (!is.store(child)) {
      stateNew[key] = defaultState[key] = child
      continue
    }
    defaultState[key] = child.defaultState
    stateNew[key] = child.getState()
    createLinkNode(child, store, {
      scope: {key, clone},
      node,
      meta: {op: 'combine'},
    })
  }

  store.defaultShape = obj
  if (!isTemplateRegion()) {
    store.defaultState = fn
      ? (getStoreState(store).current = fn(stateNew))
      : defaultState
  }
  return store
}
