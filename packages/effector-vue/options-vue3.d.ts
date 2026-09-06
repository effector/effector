import {Plugin} from 'vue'
import {Effect, Event, Store} from 'effector'

type EffectorOptionValue =
  | Store<any>
  | Event<any>
  | Effect<any, any, any>
  | {value: Store<any>; vModel: boolean}

declare module 'vue' {
  interface ComponentCustomOptions {
    effector?: () => Record<string, EffectorOptionValue>
  }
}

export declare const VueEffector: Plugin
