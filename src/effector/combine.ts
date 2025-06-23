import type {Store} from './unit.h'
import {createStore, requireExplicitSkipVoidMessage} from './createUnit'
import {createStateRef, addRefOp} from './stateRef'
import {mov, calc, read, userFnCall} from './step'
import {processArgsToConfig} from './config'
import {getStoreState, setMeta} from './getter'
import {is, isFunction, isObject, isVoid} from './is'
import {generateErrorTitle, unitObjectName} from './naming'
import {createLinkNode} from './forward'
import {assert} from './throw'
import {readTemplate} from './region'
import {forIn} from './collection'
import {MAP, REG_A, VALUE} from './tag'
import {applyTemplate} from './template'
import type {Config} from './index.h'
import {createNode} from './createNode'
import {own} from './own'

export function combine(...args: any[]): Store<any> {
  let handler
  let stores
  let config
  ;[args, config] = processArgsToConfig(args)
  const errorTitle = generateErrorTitle('combine', config)
  // skipVoid support, to be removed in effector 24
  const maybeExtConfig = args[args.length - 1]
  /**
   * if there only one argument then it's a store or object with stores
   * else if last argument is a store, then its `combine($foo, $bar)`
   * else if last argument is not an object, then it's a handler
   * else it's a config object
   */
  const isExtendedConfig =
    args.length > 1 && !is.store(maybeExtConfig) && isObject(maybeExtConfig)
  const extConfig = isExtendedConfig && maybeExtConfig
  const rawHandler = isExtendedConfig ? args[args.length - 2] : maybeExtConfig
  if (isFunction(rawHandler)) {
    stores = args.slice(0, isExtendedConfig ? -2 : -1)
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
  let noArraySpread: boolean | undefined
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
  assert(isObject(structStoreShape), `${errorTitle}: shape should be an object`)
  return storeCombination(
    Array.isArray(structStoreShape),
    !noArraySpread,
    structStoreShape,
    config,
    handler,
    extConfig,
  )
}

const storeCombination = (
  isArray: boolean,
  needSpread: boolean,
  obj: any,
  config?: Config,
  fn?: (upd: any) => any,
  extConfig?: false | {skipVoid?: boolean},
) => {
  const errorTitle = generateErrorTitle('combine', config)
  const clone = isArray ? (list: any) => [...list] : (obj: any) => ({...obj})
  const defaultState: Record<string, any> = isArray ? [] : {}

  const stateNew = clone(defaultState)
  const rawShape = createStateRef(stateNew)
  const isFresh = createStateRef(true)
  rawShape.type = isArray ? 'list' : 'shape'
  rawShape.noInit = true
  applyTemplate('combineBase', rawShape, isFresh)
  const store = createStore(stateNew, {
    name: unitObjectName(obj),
    derived: true,
    ...extConfig,
    and: config,
  })
  const storeStateRef = getStoreState(store)
  storeStateRef.noInit = true
  setMeta(store, 'isCombine', true)
  /**
   * Easiest way to clean orphaned stateRefs which participate in initialization graph
   * (has `addRefOp` calls).
   * If you need to distinguish these nodes during graph analysis,
   * note that they are not regional
   * (because they belong explicitly to the unit) which is pretty uncommon
   */
  own(store, [createNode({meta: {stateRef: rawShape}})])
  const rawShapeReader = read(rawShape)
  /**
   * usual ref reading has very high priority, which leads to data races
   * ref reading for combine should have same "barrier" priority but without batching
   * (thats why order has no "barrierID" field, which assume batching)
   **/
  rawShapeReader.order = {priority: 'barrier'}
  /**
   * Soft store reading is required for
   * setting target store as inited in scope
   * for preventing retriggering issues
   **/
  const softReader = mov({
    store: storeStateRef,
    to: 'b',
    priority: 'read',
  })
  softReader.data.softRead = true
  const node = [
    calc((upd, _, stack) => {
      if (stack.scope && !stack.scope.reg[rawShape.id]) {
        stack.c = true
      }
      return upd
    }),
    rawShapeReader,
    mov({store: isFresh, to: 'b'}),
    calc((upd, {key}, reg) => {
      if (reg.c || upd !== reg.a[key]) {
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
      priority: 'barrier',
      batch: true,
    }),
    /**
     * `read` with `sampler` priority is used to prevent cases,
     *  where `combine` triggers are duplicated
     *
     *  basically, this makes `sample` and `combine` priorities equal
     */
    read(rawShape, true, true),
    fn && userFnCall(),
    softReader,
  ]
  forIn(obj, (child: Store<any> | any, key) => {
    if (!is.store(child)) {
      assert(
        !is.unit(child) && !isVoid(child),
        `combine expects a store in a field ${key}`,
        errorTitle,
      )
      stateNew[key] = defaultState[key] = child
      return
    }
    defaultState[key] = child.defaultState
    stateNew[key] = child.getState()
    const linkNode = createLinkNode(child, store, node, 'combine', fn)
    linkNode.scope.key = key
    const childRef = getStoreState(child)
    addRefOp(rawShape, {type: 'field', field: key, from: childRef})
    applyTemplate('combineField', childRef, linkNode)
  })

  store.defaultShape = obj
  setMeta(store, 'defaultShape', obj)
  addRefOp(storeStateRef, {
    type: MAP,
    from: rawShape,
    fn,
  })
  if (!readTemplate()) {
    if (fn) {
      const computedValue = fn(stateNew)

      if (isVoid(computedValue) && (!extConfig || !('skipVoid' in extConfig))) {
        console.error(`${errorTitle}: ${requireExplicitSkipVoidMessage}`)
      }

      storeStateRef.current = computedValue
      storeStateRef.initial = computedValue
      store.defaultState = computedValue
    } else {
      store.defaultState = defaultState
    }
  }
  return store
}
