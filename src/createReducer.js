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
  handlers: Handlers<S> | OnOff<S> = {}
): Reducer<S> {
  const opts = {
    fallback: null,
  }

  const reducer = Object.assign(reduce, {
    has, on, off, options, reset
  })

  function has(typeOrActionCreator) {
    return !!handlers[normalizeType(typeOrActionCreator)]
  }

  function reset(typeOrActionCreator) {
    on(typeOrActionCreator, () => defaultState)
    return reducer
  }

  function on(typeOrActionCreator, handler) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(action => {
        on(action, handler)
      })
    } else {
      handlers[normalizeType(typeOrActionCreator)] = handler
    }

    return reducer
  }

  function off(typeOrActionCreator) {
    if (Array.isArray(typeOrActionCreator)) {
      typeOrActionCreator.forEach(off)
    } else {
      delete handlers[normalizeType(typeOrActionCreator)]
    }
    return reducer
  }

  function options(newOpts) {
    // $off
    Object.keys(newOpts).forEach(name => opts[name] = newOpts[name])
    return reducer
  }

  if (typeof handlers === 'function') {
    const factory = handlers
    // $off
    handlers = {}
    factory(on, off)
  }

  function reduce<P>(state: S = defaultState, action: RawAction<P>) {
    if (!action || (typeof action.type !== 'string')) { return state }
    if (action.type.startsWith('@@redux/')) { return state }

    const handler = handlers[String(action.type)] || opts.fallback
    if (handler) {
      return handler(state, action.payload, action.meta) || defaultState
    }

    return state
  }

  return reducer
}