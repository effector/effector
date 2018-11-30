//@flow
import type {Subscription, Subscriber, GraphiteMeta} from '../effector/index.h'
import type {Store} from 'effector/store'
import type {CompositeName} from '../compositeName'
import type {Vertex} from 'effector/graphite/tarjan'

export type Event<E> = {
  (payload: E): E,
  /*::+*/ id: string,
  getType(): string,
  getNode(): Vertex<['event', string]>,
  create(payload: E, type: string): E,
  watch(watcher: (payload: E) => any): Subscription,
  map<T>(fn: (_: E) => T): Event<T>,
  filter<T>(fn: (_: E) => T | void): Event<T>,
  prepend<Before>(fn: (_: Before) => E): Event<Before>,
  subscribe(subscriber: Subscriber<E>): Subscription,
  //prettier-ignore
  +to: (
  & (<T>(store: Store<T>, reducer: (state: T, payload: E) => T) => Subscription)
  & ((store: Store<E>, _: void) => Subscription)
 ),
  // epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>,
  getType(): string,
  shortName: string,
  domainName?: CompositeName,
  graphite: GraphiteMeta,
  compositeName: CompositeName,
}
