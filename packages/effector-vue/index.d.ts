import Vue, {ComponentOptions, WatchOptions, VueConstructor} from 'vue'
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
} from 'vue/types/options'
import {ExtendedVue} from 'vue/types/vue'
import {Store} from 'effector'

type Inference<S> = S extends Store<infer State>
  ? State
  : S extends {[storeName: string]: Store<any>}
  ? {[K in keyof S]: S[K] extends Store<infer U> ? U : never}
  : never

type EffectorType = Store<any> | {[key: string]: Store<any>} | (() => Store<any>)

type ExpandType<V extends Vue, S extends EffectorType> = S extends (this: V) => Store<infer STATE>
  ? {state: STATE}
  : S extends {[storeName: string]: Store<any>}
    ? {[U in keyof S]: Inference<S[U]>}
    : S extends Store<infer STATE>
      ? {state: STATE}
      : never

declare module 'vue/types/vue' {
  interface Vue {
    $watchAsStore: typeof watchAsStore
    $store: typeof store
  }

  interface VueConstructor<V extends Vue> {
    extend<S extends EffectorType, Data, Methods, Computed, PropNames extends string = never>(
      options?: {effector?: S} & ThisTypedComponentOptionsWithArrayProps<
        ExpandType<V, S> & V,
        Data,
        Methods,
        Computed,
        PropNames
      >,
    ): ExtendedVue<ExpandType<V, S> & V, Data, Methods, Computed, Record<PropNames, any>>
    extend<S extends EffectorType, Data, Methods, Computed, Props>(
      options?: {effector?: S} & ThisTypedComponentOptionsWithRecordProps<
        ExpandType<V, S> & V,
        Data,
        Methods,
        Computed,
        Props
      >,
    ): ExtendedVue<ExpandType<V, S> & V, Data, Methods, Computed, Props>
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    effector?: EffectorType
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
  options: ThisTypedComponentOptionsWithRecordProps<
    V,
    Data,
    Methods,
    Computed,
    Props
  >,
): ExtendedVue<V, Data, Methods, Computed, Props>

declare function createComponent<
  V extends Vue,
  Data,
  Methods,
  Computed,
  PropNames extends string
>(
  options: ThisTypedComponentOptionsWithArrayProps<
    V,
    Data,
    Methods,
    Computed,
    PropNames
  >,
): ExtendedVue<V, Data, Methods, Computed, PropNames>

declare function createComponent<
  S extends {[field: string]: Store<any>},
  V extends Vue,
  Data,
  Methods,
  Computed,
  Props
>(
  options: ThisTypedComponentOptionsWithRecordProps<
    Inference<S> & V,
    Data,
    Methods,
    Computed,
    Props
  >,
  store?: S,
): ExtendedVue<Inference<S> & V, Data, Methods, Computed, Props>
declare function createComponent<
  S extends {[field: string]: Store<any>},
  V extends Vue,
  Data,
  Methods,
  Computed,
  PropNames extends string
>(
  options: ThisTypedComponentOptionsWithArrayProps<
    Inference<S> & V,
    Data,
    Methods,
    Computed,
    PropNames
  >,
  store?: S,
): ExtendedVue<Inference<S> & V, Data, Methods, Computed, PropNames>
