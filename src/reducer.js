// @flow

import type {
  RawAction,
  Reducer,
  Handlers,
  OnOff
} from './index.h'

function normalizeType(typeOrActionCreator) {
  if (typeOrActionCreator && typeOrActionCreator.getType) {
    return typeOrActionCreator.toString()
  }
  return typeOrActionCreator
}

export function createReducer<S>(
  defaultState: S,
  handlers: Handlers<S> | OnOff<S> = {},
  thisType?: Reducer<S>
): Reducer<S> {
  const opts = {
    fallback: null,
    defaultState,
  }

  const reducer = Object.assign(reduce, {
    has, on, off, options, reset
  })
  const returnType = thisType
    ? thisType
    : reducer

  function has(typeOrActionCreator) {
    return !!handlers[normalizeType(typeOrActionCreator)]
  }

  function reset(typeOrActionCreator) {
    on(typeOrActionCreator, () => opts.defaultState)
    return returnType
  }

  function on(typeOrActionCreator, handler) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(action => {
        on(action, handler)
      })
    } else {
      handlers[normalizeType(typeOrActionCreator)] = handler
    }

    return returnType
  }

  function off(typeOrActionCreator) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(off)
    } else {
      delete handlers[normalizeType(typeOrActionCreator)]
    }
    return returnType
  }

  function options(newOpts) {
    // $off
    Object.keys(newOpts).forEach(name => opts[name] = newOpts[name])
    return returnType
  }

  if (typeof handlers === 'function') {
    const factory = handlers
    // $off
    handlers = {}
    factory(on, off)
  }

  function reduce<P>(state: S = opts.defaultState, action: RawAction<P>) {
    if (!action || (typeof action.type !== 'string')) { return state }
    if (action.type.startsWith('@@redux/')) { return state }

    const handler = handlers[String(action.type)] || opts.fallback
    if (handler) {
      const result = handler(state, action.payload, action.meta)
      if (result === undefined)
        return opts.defaultState
      return result
    }

    return state
  }

  return reducer
}