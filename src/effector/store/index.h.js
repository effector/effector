//@flow
import type {Subscription} from '../index.h'
import type {Graph, kind, StateRef, ID, Unit} from '../stdlib'
import type {Event} from '../event'
import type {Effect} from '../effect'
import type {CompositeName} from '../compositeName'
import type {StoreConfigPart} from '../config'

export type ThisStore = {|
  compositeName?: CompositeName,
  defaultState: any,
  domainName?: CompositeName,
  +graphite: Graph,
  +id: string,
  kind: kind,
  plainState: StateRef,
  shortName: ID,
  subscribers: Map<Event<any>, Subscription>,
  defaultConfig: StoreConfigPart,
|}

export type Store<State> = /*::interface extends Unit*/ {
  /*::+*/ id: string,
  /*::+*/ stateRef: StateRef,
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
    event: Event<E> | Effect<E, any, any> | Store<E>,
    handler: (state: State, payload: E) => State | void,
  ): Store<State>,
  off(event: Event<any>): void,
  subscribe(listener: any): Subscription,
  thru<U>(fn: (store: Store<State>) => U): U,
  //prettier-ignore
  /*::+*/ watch: (
    & (
      <E>(
        watcher: (state: State, payload: E, type: string) => any,
        _: void,
      ) => Subscription
    )
    & (
      <E>(
        trigger: Store<E>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
    & (
      <E>(
        event: Event<E>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
    & (
      <E>(
        effect: Effect<E, any, any>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
  ),
  +kind: kind,
  +defaultState: State,
  +defaultConfig: StoreConfigPart,
  defaultShape?: Object,
  shortName: string,
  domainName?: CompositeName,
  +graphite: Graph,
  +updates: Event<State>,
  +fail: Event<{|
    error: mixed,
    state: State
  |}>,
  compositeName?: CompositeName,
}
