import * as React from 'react'
import {Event, Effect} from 'effector'

import {Scope} from 'effector/fork'

export {useStore, useStoreMap, useList, useGate} from 'effector-react'

export const Provider: React.Provider<Scope>

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent<T>(event: Event<T>): (payload: T) => T
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
): (payload: T) => Promise<R>
