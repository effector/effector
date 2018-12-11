//@flow
import type {Subscription} from '../effector/index.h'
import type {GraphiteMeta} from 'effector/stdlib/typedef'
import type {kind} from 'effector/stdlib/kind'
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'
import type {CompositeName} from '../compositeName'

export type Store<State> = {
  /*::+*/ id: string,
  reset(event: Event<any> | Effect<any, any, any>): Store<State>,
  getState(): State,
  //prettier-ignore
  /*::+*/ setState: (
  & (<T>(newState: T, handler: (state: State, newState: T) => State) => void)
  & (<T>(newState: State, _: void) => void)
 ),
  // withProps<Props, R>(
  //   fn: (state: State, props: Props) => R,
  // ): (props: Props) => R,
  //prettier-ignore
  /*::+*/ map: (
  & (<T>(fn: (_: State, lastState?: T) => T, _: void) => Store<T>)
  & (<T>(fn: (_: State, lastState: T) => T, firstState: T) => Store<T>)
 ),
  on<E>(
    event: Event<E> | Effect<E, any, any>,
    handler: (state: State, payload: E) => State | void,
  ): Store<State>,
  off(event: Event<any>): void,
  // to<T>(
  //   store: Store<T>,
  //   reducer: (state: T, payload: State) => T,
  // ): Subscription,
  subscribe(listner: any): Subscription,
  thru<U>(fn: (store: Store<State>) => U): U,
  watch<E>(
    watcher: (state: State, payload: E, type: string) => any,
  ): Subscription,
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: GraphiteMeta,
  compositeName?: CompositeName,
}
