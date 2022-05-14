import { Accessor, createContext, createEffect, createMemo, useContext } from "solid-js";
import { Domain, is, Scope, scopeBind, Store } from "effector";
import { throwError } from "./lib/throw";
import { useStoreBase, useStoreMapBase } from "./lib/base";
import {useGate as commonUseGate, createGateImplementation} from './lib/gate'
import type { Gate } from './index.h'

const ScopeContext = createContext<Scope | null>(null);
export const {Provider} = ScopeContext;

function getScope() {
  const scope = useContext(ScopeContext);
  if (!scope)
    throwError('No scope found, consider adding <Provider> to app root')
  return scope as Scope
}

export function createGate<Props>(
  config: {
    domain?: Domain
    defaultState?: Props
    name?: string
  } = {},
) {
  return createGateImplementation({
    domain: config.domain,
    name: config.name,
    defaultState: 'defaultState' in config ? config.defaultState : {},
    hook: useGate,
  })
}

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Accessor<Props> = () => ({}) as any,
) {
  const events = useEvent([
    GateComponent.open,
    GateComponent.close,
    GateComponent.set,
  ]);

  const ForkedGate = createMemo(() => {
    const [open, close, set] = events();

    return {
      open,
      close,
      set
    } as Gate<Props>
  });

  createEffect(() => commonUseGate(ForkedGate(), props))
}

/** useStore wrapper for scopes */
export function useStore<T>(store: Store<T>): Accessor<T> {
  return useStoreBase(store, getScope())
}
/** useStoreMap wrapper for scopes */
export function useStoreMap(configOrStore: any, separateFn: any) {
  const scope = getScope()
  if (separateFn) return useStoreMapBase([configOrStore, separateFn], scope)
  return useStoreMapBase(
    [
      {
        store: configOrStore.store,
        keys: configOrStore.keys,
        fn: configOrStore.fn,
        updateFilter: configOrStore.updateFilter,
      },
    ],
    scope,
  )
}
/**
 bind event to scope
 */
export function useEvent(eventObject: any) {
  const scope = getScope()

  if (is.unit(eventObject)) {
    //@ts-expect-error
    return scopeBind(eventObject, {scope})
  }
  const shape = Array.isArray(eventObject) ? [] : ({} as any)
  for (const key in eventObject) {
    shape[key] = scopeBind(eventObject[key], {scope})
  }
  return shape
}