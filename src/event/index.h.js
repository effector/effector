//@flow
import type {Subscription, Subscriber} from '../effector/index.h'
import type {kind, GraphiteMeta} from 'effector/stdlib'
import type {CompositeName} from '../compositeName'

export type Event<E> = {
  /*::
  [[call]](payload: E): E,
  */
  /*::+*/ id: string,
  getType(): string,
  create(payload: E, type: string, args: any[]): E,
  watch(watcher: (payload: E) => any): Subscription,
  map<T>(fn: (_: E) => T): Event<T>,
  filter<T>(fn: (_: E) => T | void): Event<T>,
  prepend<Before>(fn: (_: Before) => E): Event<Before>,
  subscribe(subscriber: Subscriber<E>): Subscription,
  //prettier-ignore
  //   +to: (
  //   & (<T>(store: Store<T>,
  // reducer: (state: T, payload: E) => T) => Subscription)
  //   & ((store: Store<E>, _: void) => Subscription)
  //  ),
  /*::+*/ kind: kind,
  // epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>,
  getType(): string,
  shortName: string,
  domainName?: CompositeName,
  graphite: GraphiteMeta,
  compositeName: CompositeName,
}
