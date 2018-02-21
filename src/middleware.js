//@flow

import {PING, PONG, HALT, type Config} from './config'

export function effectorMiddleware() {
  const plainMap = new Map
  const config: Config = {
    plain: plainMap,
  }
  let isActive = true
  return (next: Function) => (action: mixed) => {
    if (!isActive) {
      return action
    }
    if (!(
      typeof action === 'object'
      && action != null
    )) {
      return next(action)
    }
    if (typeof action.type !== 'string') {
      return action
    }
    if (action.type === PING) {
      return {
        type: PONG,
        payload: config,
      }
    }
    if (action.type === HALT) {
      isActive = false
      plainMap.clear()
      return next(action)
    }
    const handler = plainMap.get(action.type)

    if (!(typeof action.meta === 'object' && action.meta != null))
      action.meta = {}
    if (action.meta.passed === true)
      return action
    if (handler)
      action.meta.plain = true

    if (typeof action.send === 'function') {
      const {send, meta} = action
      if (handler) {
        meta.passed = true
        send(next)
        handler(action)
        return action
      }
      action.send(next)
      return action
    } else {
      const {meta} = action
      if (handler) {
        if (meta.passed !== true) {
          meta.passed = true
          const result = next(action)
          handler(action)
          return result
        }
        action.meta.passed = true
      }
      action.meta.passed = true
      return next(action)
    }
  }
}


