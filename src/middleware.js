//@flow

import {PING, PONG, type Config} from './config'

export function effectorMiddleware() {
  const config: Config = {
    plain: new Map()
  }
  return (next: Function) => (action: mixed) => {
    if (typeof action === 'object' && action != null && typeof action.type === 'string') {
      if (action.type === PING) {
        return {
          type: PONG,
          payload: config,
        }
      }
      const handler = config.plain.get(action.type)

      if (typeof action.send === 'function') {
        action.send(next)
        return action
      }
      const result = next(action)
      if (handler && action.meta == null) {
        handler(action.payload)
        return action
      }

      return result
    }
    return next(action)
  }
}
