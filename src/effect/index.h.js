//@flow
import type {Subscription, Subscriber} from '../effector/index.h'
import type {GraphiteMeta} from 'effector/stdlib/typedef'
import type {kind} from 'effector/stdlib/kind'
// import type {Store} from 'effector/store'
import type {Event} from 'effector/event'
import type {CompositeName} from '../compositeName'
// import type {Future} from './future'
// import type {Vertex} from 'effector/graphite/tarjan'

export type Effect<Params, Done, Fail = Error> = {
  // (payload: Params): Future<Params, Done, Fail>,
  /*::
  [[call]](payload: Params): Promise<Done>,
  */
  done: Event<{params: Params, result: Done}>,
  fail: Event<{params: Params, error: Fail}>,
  /*::+*/ id: string,
  use: {
    /*::
    [[call]](asyncFunction: (params: Params) => Promise<Done> | Done): void,
    */
    getCurrent(): (params: Params) => Promise<Done>,
  },
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
  graphite: GraphiteMeta,
  compositeName: CompositeName,
}

export type Thunk<Args, Done> = (_: Args) => Promise<Done>
export type Callbacks<Args, Done, Fail> = [
  (_: {result: Done, params: Args}) => void,
  (_: {error: Fail, params: Args}) => void,
  Thunk<Args, Done>,
]
