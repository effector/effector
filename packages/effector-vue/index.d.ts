import Vue, {ComponentOptions, WatchOptions, VueConstructor} from 'vue'
import {
  ThisTypedComponentOptionsWithArrayProps,
  ThisTypedComponentOptionsWithRecordProps,
} from 'vue/types/options'
import {ExtendedVue} from 'vue/types/vue'
import {Store, Event} from 'effector'

type Inference<EffectorState> = EffectorState extends Store<infer State>
  ? State
  : EffectorState extends {[storeName: string]: Store<any>}
  ? {[K in keyof EffectorState]: EffectorState[K] extends Store<infer U> ? U : never}
  : never

type EffectorType = Store<any> | {[key: string]: Store<any> | Event<any>} | (() => Store<any>)

type ExpandType<V extends Vue, EffectorState extends EffectorType> = EffectorState extends ((this: V) => Store<infer State>) | Store<infer State>
  ? {state: State}
  : EffectorState extends {[storeName: string]: Store<any>}
  ? {[Key in keyof EffectorState]: Inference<EffectorState[Key]>}
  : never

declare module 'vue/types/vue' {
  interface Vue {
    $watchAsStore: typeof watchAsStore
    $store: typeof store
    _clear?: Event<any>;
  }

  interface VueConstructor<V extends Vue> {
    extend<EffectorState extends EffectorType, Data, Methods, Computed, PropNames extends string = never>(
      options?: {effector?: EffectorState} & ThisTypedComponentOptionsWithArrayProps<
        ExpandType<V, EffectorState> & V,
        Data,
        Methods,
        Computed,
        PropNames
      >,
    ): ExtendedVue<ExpandType<V, EffectorState> & V, Data, Methods, Computed, Record<PropNames, any>>
    extend<EffectorState extends EffectorType, Data, Methods, Computed, Props>(
      options?: {effector?: EffectorState} & ThisTypedComponentOptionsWithRecordProps<
        ExpandType<V, EffectorState> & V,
        Data,
        Methods,
        Computed,
        Props
      >,
    ): ExtendedVue<ExpandType<V, EffectorState> & V, Data, Methods, Computed, Props>
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    effector?: EffectorType
    _clear?: Event<any>
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
  S extends {[field: string]: Store<any> | Event<any>},
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
  S extends {[field: string]: Store<any> | Event<any>},
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
