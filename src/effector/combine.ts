import type {Store} from './unit.h'
import {createStore} from './createUnit'
import {createStateRef, addRefOp} from './stateRef'
import {step} from './typedef'
import {onConfigNesting} from './config'
import {getStoreState, setMeta} from './getter'
import {is, isFunction, isObject} from './is'
import {unitObjectName} from './naming'
import {createLinkNode} from './forward'
import {throwError} from './throw'
import {readTemplate} from './region'
import {forIn} from './collection'
import {BARRIER, MAP, REG_A, VALUE} from './tag'
import {applyTemplate} from './template'
import {callStack} from './caller'

export function combine(...args: any[]): Store<any> {
  let handler
  let stores
  let config
  onConfigNesting(args[0], (injectedData, userConfig) => {
    config = injectedData
    args = userConfig
  })
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
  let noArraySpread: boolean | void
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
      noArraySpread = true
      const fn = handler
      handler = (list: any[]) => fn(...list)
    }
  }
  if (!isObject(structStoreShape)) throwError('shape should be an object')
  return storeCombination(
    Array.isArray(structStoreShape),
    !noArraySpread,
    structStoreShape,
    config,
    handler,
  )
}

const storeCombination = (
  isArray: boolean,
  needSpread: boolean,
  obj: any,
  config?: string,
  fn?: (upd: any) => any,
) => {
  const clone = isArray ? (list: any) => list.slice() : (obj: any) => ({...obj})
  const defaultState: any = isArray ? [] : {}

  const stateNew = clone(defaultState)
  const rawShape = createStateRef(stateNew)
  const isFresh = createStateRef(true)
  rawShape.type = isArray ? 'list' : 'shape'
  rawShape.noInit = true
  applyTemplate('combineBase', rawShape, isFresh)
  const store = createStore(stateNew, {
    name: config ? config : unitObjectName(obj),
  })
  const storeStateRef = getStoreState(store)
  storeStateRef.noInit = true
  setMeta(store, 'isCombine', true)
  const node = [
    step.mov({store: rawShape, to: REG_A}),
    step.mov({store: isFresh, to: 'b'}),
    step.compute({
      safe: true,
      filter: true,
      fn(upd, {key}, reg) {
        if (upd !== reg.a[key]) {
          if (needSpread && reg.b) {
            reg.a = clone(reg.a)
          }
          reg.a[key] = upd
          return true
        }
      },
    }),
    step.mov({from: REG_A, target: rawShape}),
    step.mov({from: VALUE, store: false, target: isFresh}),
    step.mov({
      from: VALUE,
      store: true,
      target: isFresh,
      priority: BARRIER,
      batch: true,
    }),
    step.mov({store: rawShape}),
    fn && step.compute({fn: callStack}),
    step.changed({store: storeStateRef}),
  ]
  forIn(obj, (child: Store<any> | any, key) => {
    if (!is.store(child)) {
      stateNew[key] = defaultState[key] = child
      return
    }
    defaultState[key] = child.defaultState
    stateNew[key] = child.getState()
    const linkNode = createLinkNode(child, store, {
      scope: {key, fn},
      node,
      meta: {op: 'combine'},
    })
    const childRef = getStoreState(child)
    addRefOp(rawShape, {type: 'field', field: key, from: childRef})
    applyTemplate('combineField', childRef, linkNode)
  })

  store.defaultShape = obj
  addRefOp(storeStateRef, {
    type: MAP,
    from: rawShape,
    fn,
  })
  if (!readTemplate()) {
    store.defaultState = fn
      ? (storeStateRef.current = fn(stateNew))
      : defaultState
  }
  return store
}

export function createStoreObject(...args: any[]) {
  console.error('createStoreObject is deprecated, use combine instead')
  return combine(...args)
}
