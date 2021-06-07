import * as React from 'react'
import {Event, Effect, Scope, Domain, Subscription} from 'effector'
import {Gate} from 'effector-react'

export {useStore, useStoreMap, useList, useGate} from 'effector-react'

export const Provider: React.Provider<Scope>

interface ScopedEvent<T> {
  (payload: T): T;
  watch(handler: (payload: T) => any): Subscription;
}

interface ScopedEffect<T, R> {
  (payload: T): Promise<R>;
  watch(handler: (payload: T) => any): Subscription;
}

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent<T>(event: Event<T>): ScopedEvent<T>
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
): ScopedEffect<T, R>
export function useEvent<List extends (Event<any> | Effect<any, any>)[]>(
  list: [...List],
): {
  [Key in keyof List]: List[Key] extends Event<infer T>
    ? ScopedEvent<T>
    : List[Key] extends Effect<infer P, infer D, any>
    ? ScopedEffect<P, D>
    : never
}
export function useEvent<
  Shape extends Record<string, Event<any> | Effect<any, any, any>>
>(
  shape: Shape,
): {
  [Key in keyof Shape]: Shape[Key] extends Event<infer T>
    ? ScopedEvent<T>
    : Shape[Key] extends Effect<infer P, infer D, any>
    ? ScopedEffect<P, D>
    : never
}

export function createGate<State>(config: {
  domain: Domain
  defaultState?: State
  name?: string
}): Gate<State>
