import * as React from 'react'
import {Event, Effect, Scope, Domain} from 'effector'
import {Gate} from 'effector-react'

export {useStore, useStoreMap, useList, useGate} from 'effector-react'

export const Provider: React.Provider<Scope>

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent(event: Event<void>): () => void
export function useEvent<T>(event: Event<T>): (payload: T) => T
export function useEvent<R>(fx: Effect<void, R, any>): () => Promise<R>
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
): (payload: T) => Promise<R>
export function useEvent<List extends (Event<any> | Effect<any, any>)[]>(
  list: [...List],
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? (payload: T) => T
    : List[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : never
}
export function useEvent<
  Shape extends Record<string, Event<any> | Effect<any, any, any>>,
>(
  shape: Shape,
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? (payload: T) => T
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? (payload: P) => Promise<D>
    : never
}

export function createGate<State>(config: {
  domain?: Domain
  defaultState?: State
  name?: string
}): Gate<State>
