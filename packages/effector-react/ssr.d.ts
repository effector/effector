import * as React from 'react'
import {Store, Event, Effect} from 'effector'

import {Scope} from 'effector/fork'

export function useStore<State>(store: Store<State>): State
export function useStoreMap<
  State,
  Result,
  Keys extends ReadonlyArray<any> | any[]
>(opts: {
  readonly store: Store<State>
  readonly keys: Keys
  readonly fn: (state: State, keys: Keys) => Result
}): Result
export function useList<T>(
  list: Store<T[]>,
  renderItem:
    | {
        readonly keys?: any[]
        readonly fn: (item: T, index: number) => React.ReactNode
      }
    | ((item: T, index: number) => React.ReactNode),
): React.ReactNode

export const Provider: React.Provider<Scope>

/**
bind event to scope

works like React.useCallback, but for scopes
*/
export function useEvent<T>(event: Event<T>): (payload: T) => T
export function useEvent<T, R>(
  fx: Effect<T, R, any>,
): (payload: T) => Promise<R>
