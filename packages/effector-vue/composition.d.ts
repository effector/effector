import {DeepReadonly, Ref, UnwrapRef} from '@vue/reactivity'
import {Domain, Store, Event} from 'effector'

type UnwrapNestedRefs<T> = T extends Ref ? T : UnwrapRef<T>

type GateConfig<T> = {
  name?: string;
  defaultState?: T;
  domain?: Domain;
};

type Gate<Props> = {
  open: Event<Props>;
  close: Event<Props>;
  status: Store<boolean>;
  state: Store<Props>;
  set: Event<Props>;
};

export function useStore<T>(store: Store<T>): DeepReadonly<UnwrapNestedRefs<T>>
export function useVModel<T>(store: Store<T>): Ref<UnwrapRef<T>>
export function createGate<Props>(config?: GateConfig<Props>): Gate<Props>
export function useGate<Props>(GateComponent: Gate<Props>, cb?: () => Props): void