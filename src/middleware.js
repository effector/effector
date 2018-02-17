//@flow

import {PING, PONG, type Config} from './config'

export function effectorMiddleware({dispatch}: {dispatch: Function}) {
  const config: Config = {
    plain: new Map()
  }
  return (next: Function) => (action: mixed) => {
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
    const handler = config.plain.get(action.type)

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


