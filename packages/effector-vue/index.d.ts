import Vue, {ComponentOptions, WatchOptions, VueConstructor} from 'vue'
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
} from "vue/types/options";
import { ExtendedVue } from "vue/types/vue"
import {Store} from 'effector'

type Inference<S> = S extends Store<infer State>
    ? State
    : S extends { [storeName: string]: Store<any> }
      ? { [K in keyof S]: State<S[K]> }
      : never;

declare module 'vue/types/vue' {
  interface Vue {
    $watchAsStore: typeof watchAsStore
    $store: typeof store
  }

  interface VueConstructor<V extends Vue> {
    extend<S, Data, Methods, Computed, PropNames extends string = never>(
      options?: ThisTypedComponentOptionsWithArrayProps<S & V, Data, Methods, Computed, PropNames>
    ): ExtendedVue<V, Data, Methods, Computed, Record<PropNames, any>>;
    extend<S, Data, Methods, Computed, Props>(
      options?: ThisTypedComponentOptionsWithRecordProps<S & V, Data, Methods, Computed, Props>
    ): ExtendedVue<V, Data, Methods, Computed, Props>;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    effector?: (this: V) => Store<any> | {[field: string]: Store<any>}
  }
}

declare function watchAsStore<State>(
  exp: string,
  options?: WatchOptions,
): Store<{oldValue: State; newValue: State}>
declare function watchAsStore<State>(
  fn: () => State,
  options?: WatchOptions,
): Store<{oldValue: State; newValue: State}>

declare function store<State>(exp: string): Store<State>
declare function store<State>(fn: () => State): Store<State>
declare function VueEffector(vm: VueConstructor<Vue>, options?: Object): void

declare function createComponent<V extends Vue, Data, Methods, Computed, Props>(
  options: ThisTypedComponentOptionsWithRecordProps<V, Data, Methods, Computed, Props>,
): ExtendedVue<V, Data, Methods, Computed, Props>;

declare function createComponent<V extends Vue, Data, Methods, Computed, PropNames extends string>(
  options: ThisTypedComponentOptionsWithArrayProps<V, Data, Methods, Computed, PropNames>,
): ExtendedVue<V, Data, Methods, Computed, PropNames>;

declare function createComponent<
  S extends { [field: string]: Store<any> },
  V extends Vue, Data, Methods, Computed, Props
>(
  options: ThisTypedComponentOptionsWithRecordProps<
    Inference<S> & V, Data, Methods, Computed, Props
  >,
  store?: S
): ExtendedVue<V, Data, Methods, Computed, Props>;
declare function createComponent<
  S extends { [field: string]: Store<any> },
  V extends Vue, Data, Methods, Computed, PropNames extends string
>(
  options: ThisTypedComponentOptionsWithArrayProps<
    Inference<S> & V, Data, Methods, Computed, PropNames
  >,
  store?: S,
): ExtendedVue<V, Data, Methods, Computed, Props>
