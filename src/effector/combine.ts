import type {Store} from './unit.h'
import {createStore} from './createUnit'
import {createStateRef, addRefOp} from './stateRef'
import {mov, compute, calc, read} from './step'
import {processArgsToConfig} from './config'
import {getStoreState, setMeta} from './getter'
import {is, isFunction, isObject, isVoid} from './is'
import {unitObjectName} from './naming'
import {createLinkNode} from './forward'
import {assert, deprecate} from './throw'
import {readTemplate} from './region'
import {forIn} from './collection'
import {BARRIER, MAP, REG_A, VALUE} from './tag'
import {applyTemplate} from './template'
import {callStack} from './caller'
import type {Config} from './index.h'

export function combine(...args: any[]): Store<any> {
  let handler
  let stores
  let config
  ;[args, config] = processArgsToConfig(args)
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
  assert(isObject(structStoreShape), 'shape should be an object')
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
  config?: Config,
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
    name: unitObjectName(obj),
    derived: true,
    and: config,
  })
  const storeStateRef = getStoreState(store)
  storeStateRef.noInit = true
  setMeta(store, 'isCombine', true)
  const node = [
    read(rawShape),
    mov({store: isFresh, to: 'b'}),
    calc((upd, {key}, reg) => {
      if (upd !== reg.a[key]) {
        if (needSpread && reg.b) {
          reg.a = clone(reg.a)
        }
        reg.a[key] = upd
        return true
      }
    }, true),
    mov({from: REG_A, target: rawShape}),
    mov({from: VALUE, store: false, target: isFresh}),
    mov({
      from: VALUE,
      store: true,
      target: isFresh,
      priority: BARRIER,
      batch: true,
    }),
    read(rawShape, true),
    fn && compute({fn: callStack}),
  ]
  forIn(obj, (child: Store<any> | any, key) => {
    if (!is.store(child)) {
      assert(
        !is.unit(child) && !isVoid(child),
        `combine expects a store in a field ${key}`,
      )
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
  deprecate(false, 'createStoreObject', 'combine')
  return combine(...args)
}
