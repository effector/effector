//@flow

import type {Event} from 'effector'

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent<T>(event: Event<T>): (payload: T) => T {
  return event
}
