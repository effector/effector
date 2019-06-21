//@flow
import type {Subscription, Subscriber} from '../index.h'
import type {kind, Graph, Unit} from '../stdlib'
import type {Event} from '../event'
import type {Store} from '../store'
import type {CompositeName} from '../compositeName'

export type Effect<Params, Done, Fail = Error> = /*::interface extends Unit*/ {
  // (payload: Params): Future<Params, Done, Fail>,
  /*::
  [[call]](payload: Params): Promise<Done>,
  */
  done: Event<{|
    params: Params,
    result: Done,
  |}>,
  fail: Event<{|
    params: Params,
    error: Fail,
  |}>,
  finally: Event<{|
    params: Params,
  |}>,
  /*::+*/ id: string,
  use: {|
    /*::
    [[call]](asyncFunction: (params: Params) => Promise<Done> | Done): void,
    */
    getCurrent(): (params: Params) => Promise<Done>,
  |},
  create(payload: Params, type: string, args: any[]): Params,
  pending: Store<boolean>,
  watch(watcher: (payload: Params) => any): Subscription,
  // getNode(): Vertex<['event', string]>,
  //map<T>(fn: (_: E) => T): Event<T>,
  prepend<Before>(fn: (_: Before) => Params): Event<Before>,
  subscribe(subscriber: Subscriber<Params>): Subscription,
  //prettier-ignore
  //   +to: (
  //   & (<T>(
  //    store: Store<T>,
  //    reducer: (state: T, payload: Params) => T
  //   ) => Subscription)
  //   & ((store: Store<Params>, _: void) => Subscription)
  //  ),
  // epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
  getType(): string,
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: Graph,
  compositeName: CompositeName,
}

export type FnEffect<Params, Done, Fail = Error, +Fn = Function> = {
  // (payload: Params): Future<Params, Done, Fail>,
  /*::
  [[call]]: Fn,
  */
  +done: Event<{|
    params: Params,
    result: Done,
  |}>,
  +fail: Event<{|
    params: Params,
    error: Fail,
  |}>,
  /*::+*/ id: string,
  +use: {|
    (asyncFunction: Fn): void,
    getCurrent(): Fn,
  |},
  create(payload: Params, type: string, args: any[]): Params,
  +watch: (watcher: (payload: Params) => any) => Subscription,
  // getNode(): Vertex<['event', string]>,
  //map<T>(fn: (_: E) => T): Event<T>,
  prepend<Before>(fn: (_: Before) => Params): Event<Before>,
  subscribe(subscriber: Subscriber<Params>): Subscription,
  //prettier-ignore
  //   +to: (
  //   & (<T>(
  //    store: Store<T>,
  //    reducer: (state: T, payload: Params) => T
  //   ) => Subscription)
  //   & ((store: Store<Params>, _: void) => Subscription)
  //  ),
  // epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
  getType(): string,
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: Graph,
  compositeName: CompositeName,
}

export type Thunk<Args, Done> = (_: Args) => Promise<Done>
