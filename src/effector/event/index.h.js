//@flow
import type {Subscription, Subscriber} from '../index.h'
import type {kind, Graph, Unit} from 'effector/stdlib'
import type {CompositeName} from '../compositeName'

export type Event<E> = /*::interface extends Unit*/ {
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
  /*::+*/ kind: kind,
  getType(): string,
  shortName: string,
  domainName?: CompositeName,
  graphite: Graph<>,
  compositeName: CompositeName,
}
