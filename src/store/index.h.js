//@flow
import type {Subscription, Subscriber, GraphiteMeta} from '../effector/index.h'

import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'

export type Store<State> = {
 reset(event: Event<any> | Effect<any, any, any>): Store<State>,
 dispatch(action: any): any,
 getState(): State,
 //prettier-ignore
 +setState: (
  & (<T>(newState: T, handler: (state: State, newState: T) => State) => void)
  & (<T>(newState: State, _: void) => void)
 ),
 withProps<Props, R>(
  fn: (state: State, props: Props) => R,
 ): (props: Props) => R,
 map<T>(fn: (_: State, lastState?: T) => T): Store<T>,
 on<E>(
  event: Event<E> | Effect<E, any, any>,
  handler: (state: State, payload: E) => State | void,
 ): Store<State>,
 to<T>(store: Store<T>, reducer: (state: T, payload: State) => T): Subscription,
 subscribe(listner: any): Subscription,
 thru<U>(fn: (store: Store<State>) => U): U,
 watch<E>(
  watcher: (state: State, payload: E, type: string) => any,
 ): Subscription,
 graphite: GraphiteMeta,
 displayName?: string,
}
