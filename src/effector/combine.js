//@flow

import type {Store} from './unit.h'
import {createStore} from './createUnit'
import {createStateRef} from './stateRef'
import {step} from './typedef'
import {getStoreState, getConfig, getNestedConfig, getGraph} from './getter'
import {is, isFunction} from './is'
import {unitObjectName} from './naming'
import {createLinkNode} from './forward'
import {throwError} from './throw'
import {readTemplate} from './region'
import {forIn} from './forIn'

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
  return storeCombination(
    Array.isArray(structStoreShape),
    structStoreShape,
    config,
    handler,
  )
}

const spreadArgs = fn => list => fn(...list)

const storeCombination = (
  isArray,
  obj: any,
  config?: string,
  fn?: Function,
) => {
  const clone = isArray ? list => list.slice() : obj => Object.assign({}, obj)
  const defaultState = isArray ? [] : {}
  const template = readTemplate()
  const stateNew = clone(defaultState)
  const rawShape = createStateRef(stateNew)
  const isFresh = createStateRef(true)
  rawShape.type = isArray ? 'list' : 'shape'
  let after
  if (template) {
    template.plain.push(rawShape, isFresh)
    after = template.seq[rawShape.id] = []
  }
  const store = createStore(stateNew, {
    name: config ? config : unitObjectName(obj),
  })
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
  forIn(obj, (child, key) => {
    if (!is.store(child)) {
      stateNew[key] = defaultState[key] = child
      return
    }
    defaultState[key] = child.defaultState
    stateNew[key] = child.getState()
    const linkNode = createLinkNode(child, store, {
      scope: {key, clone},
      node,
      meta: {op: 'combine'},
    })
    if (template) {
      const childRef = getStoreState(child)
      if (
        !template.plain.includes(childRef) &&
        !template.closure.includes(childRef)
      ) {
        forIn(getGraph(child).reg, (ref, key) => {
          template.closure.push(ref)
          template.seq[key] = []
        })
        linkNode.seq.unshift(template.loader)
      }
      template.seq[childRef.id].push({
        type: 'field',
        field: key,
        to: rawShape,
      })
    }
  })

  store.defaultShape = obj
  if (template) {
    // template.plain.push(isFresh)
    after.push(
      fn
        ? {
          type: 'map',
          to: getStoreState(store),
          fn,
        }
        : {
          type: 'copy',
          to: getStoreState(store),
        },
    )
  } else {
    store.defaultState = fn
      ? (getStoreState(store).current = fn(stateNew))
      : defaultState
  }
  return store
}
