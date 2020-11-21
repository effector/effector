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
export function useEvent<
  Shape extends Record<string, Event<any> | Effect<any, any, any>>
>(
  shape: Shape,
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : never
}
