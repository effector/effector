import { Scope } from '@babel/traverse';
import {ComputedRef, DeepReadonly, Ref, UnwrapRef} from '@vue/reactivity'
import {Domain, Store, Event} from 'effector'

type GateConfig<T> = {
  name?: string;
  defaultState?: T;
  domain?: Domain;
  sid?: string;
};

type Gate<Props> = {
  open: Event<Props>;
  close: Event<Props>;
  status: Store<boolean>;
  state: Store<Props>;
  set: Event<Props>;
};

type ExtractStore<T extends Record<string, Store<unknown>>> = {
  [Key in keyof T]: T[Key] extends Store<infer U> ? Ref<UnwrapRef<U>> : never
 }

 export interface UseVModel {
   <T>(vm: Store<T>): Ref<T>
   <T extends Record<string, Store<any>>>(vm: T): ExtractStore<T>
 }

export function useStoreMap<State, Result, Keys = unknown>(
  config: {
    store: Store<State>;
    keys?: () => Keys;
    fn: (state: State, keys: Keys) => Result;
    updateFilter?: (update: Result, current: Result) => boolean;
    defaultValue?: Result;
  },
  scope?: Scope
): ComputedRef<Result>
export function useVModel<T>(vm: Store<T>): Ref<UnwrapRef<T>>
export function useVModel<T extends Record<string, Store<any>>>(vm: T): ExtractStore<T>
export function useStore<T>(store: Store<T>): DeepReadonly<Ref<T>>
export function createGate<Props>(config?: GateConfig<Props>): Gate<Props>
export function useGate<Props>(GateComponent: Gate<Props>, cb?: () => Props): void
