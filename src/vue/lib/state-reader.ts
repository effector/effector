import {Scope, Store} from "effector"

export function stateReader<T>(store: Store<T>, scope?: Scope) {
  return scope ? scope.getState(store) : store.getState()
}
