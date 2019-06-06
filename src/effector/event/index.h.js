//@flow
import type {Subscription, Subscriber} from '../index.h'
import type {kind, Graph, Unit} from '../stdlib'
import type {CompositeName} from '../compositeName'

export type Event<E> = /*::interface extends Unit*/ {
  /*::
  [[call]](payload: E): E,
  */
  /*::+*/ id: string,
  /*::+*/ kind: kind,
  getType(): string,
  create(payload: E, type: string, args: any[]): E,
  watch(watcher: (payload: E) => any): Subscription,
  map<T>(fn: (_: E) => T): Event<T>,
  filter(config: {|fn(_: E): boolean|}): Event<E>,
  filter<T>(fn: (_: E) => T | void): Event<T>,
  prepend<Before>(fn: (_: Before) => E): Event<Before>,
  subscribe(subscriber: Subscriber<E>): Subscription,
  thru<U>(fn: (event: Event<E>) => U): U,
  getType(): string,
  shortName: string,
  domainName?: CompositeName,
  graphite: Graph,
  compositeName: CompositeName,
}
