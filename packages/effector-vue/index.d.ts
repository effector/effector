import Vue, {ComponentOptions, WatchOptions} from 'vue'
import {Store} from 'effector'

declare module 'vue/types/vue' {
  interface Vue {
    $watchAsStore: typeof watchAsStore
    $store: typeof store
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    effector?: (this: V) => Store<any>
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
