//@flow

import type {ReducerRedux} from './index.h'
// import type {Event} from './carrier/event'
// import type {Carrier} from './carrier/carrier'

// import type {ID} from './id'

// import {Map} from 'immutable'


// export class Reducer<T> {
//   used: Map<ID, (data: any, state: T) => T> = new Map
//   defaultState: T
//   on<P, C>(event: Event<P, C, any>, handler: (data: P, state: T) => T) {
//     this.used.set(event.id, handler)
//     return this
//   }

// }


export function createReducer<T>(
  defaultState: T,
  handlers:{[type: any]: Function} = {}
): ReducerRedux<T, any> {
  const opts = {
    // fallback: null,
  }

  const reducer = Object.assign(reduce, {
    has, on, off, options, map, fallback,
  })
  function fallback(fn) {
    opts.fallback = fn
    return reducer
  }
  function map(fn) {
    const handlerMap = Object
      .keys(/*::Object.freeze*/(handlers))
      .reduce(
        (handlerMap, key) => (a, b, c) => ({
          ...handlerMap,
          [key]: fn(handlers[key](a, b, c)),
        }),
        {}
      )
    return createReducer(fn(defaultState), handlerMap)
  }

  function has(typeOrActionCreator) {
    return !!handlers[typeOrActionCreator]
  }

  function on(typeOrActionCreator, handler) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach((action) => {
        on(action, handler)
      })
    } else {
      handlers[typeOrActionCreator] = handler
    }

    return reducer
  }

  function off(typeOrActionCreator) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(off)
    } else {
      delete handlers[typeOrActionCreator]
    }
    return reducer
  }

  function options(newOpts) {
    Object.keys(newOpts).forEach(name => opts[name] = newOpts[name])
    return reducer
  }

  function reduce(state: T = defaultState, action) {
    if (!action) { return state }
    if (action.type.startsWith('@@redux/')) { return state }

    const handler = handlers[action.id || action.type] || opts.fallback
    if (handler) {
      const result = handler(state, action.payload, action.meta)
      if (result)
        return result
    }

    return state
  }

  return reducer
}

// export function combineReducer<M/*:{[string]: Reducer<any>}>*/(
//   reduceMap: M
// ): Reducer<$ObjMap<M, <T>(r: Reducer<T>) => T>> {
//   function reducer(event: Carrier<any>, state) {


//   }
//   Object.keys(Object.freeze(reduceMap)).map(e => )
// }

// export interface Reader<State> {
//   $call: <Payload>(data: Payload, state: State) => State,
// }


