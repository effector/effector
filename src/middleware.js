//@flow

export function effectorMiddleware() {
  return (next: Function) => (action: mixed) => {
    if (typeof action === 'object' && action != null && typeof action.send === 'function') {
      action.send(next)
      return action
    }
    return next(action)
  }
}
