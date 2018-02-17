//@flow

import {PING, PONG, HALT, type Config} from './config'

export function effectorMiddleware({ dispatch }: { dispatch: Function }) {
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

    if (typeof action.send === 'function') {
      action.send(dispatch)
      return action
    }
    if (!(typeof action.meta === 'object' && action.meta != null))
      action.meta = {}
    if (action.meta.passed === true)
      return action
    action.meta.passed = true
    const isFromHandler = action.meta.plain === true
    const result = next(action)
    if (handler && !isFromHandler) {
      handler(action.payload)
    }
    return result
  }
}


