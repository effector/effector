import * as React from 'react'
import {Event, Effect, Fork} from 'effector'

export {useStore, useStoreMap, useList, useGate} from 'effector-react'

export const Provider: React.Provider<Fork>

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent<T>(event: Event<T>): (payload: T) => T
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
): (payload: T) => Promise<R>
