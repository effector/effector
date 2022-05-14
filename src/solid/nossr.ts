import { Event, Store } from "effector";
import { useStoreBase, useStoreMapBase } from "./lib/base";
import { Accessor } from "solid-js";

export function useEvent<T>(event: Event<T>): (payload: T) => T {
  return event
}

export function useStore<State>(store: Store<State>): Accessor<State> {
  return useStoreBase(store)
}

export function useStoreMap<State, Result, Keys extends ReadonlyArray<any>>(
  configOrStore:
    | {
    store: Store<State>
    keys: Keys
    fn(state: State, keys: Keys): Result
    updateFilter?: (update: Result, current: Result) => boolean
  }
    | Store<State>,
  separateFn?: (state: State, keys: Keys) => Result,
): Accessor<Result> {
  return useStoreMapBase([configOrStore, separateFn])
}