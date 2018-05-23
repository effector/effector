//@flow
import type {Stream} from 'most'
import type {Subscription, Subscriber, GraphiteMeta} from '../effector/index.h'
import type {Store} from 'effector/store'
import type {Event} from 'effector/event'
import type {CompositeName} from '../compositeName'

export type Effect<Params, Done, Fail = Error> = {
 (
  payload: Params,
 ): {
  done(): Promise<{params: Params, result: Done}>,
  fail(): Promise<{params: Params, error: Fail}>,
  promise(): Promise<Done>,
 },
 done: Event<{params: Params, result: Done}>,
 fail: Event<{params: Params, error: Fail}>,
 use: {
  (asyncFunction: (params: Params) => Promise<Done>): void,
  getCurrent(): (params: Params) => Promise<Done>,
 },
 watch(watcher: (payload: Params) => any): Subscription,
 //map<T>(fn: (_: E) => T): Event<T>,
 prepend<Before>(fn: (_: Before) => Params): Event<Before>,
 subscribe(subscriber: Subscriber<Params>): Subscription,
 //prettier-ignore
 +to: (
  & (<T>(
   store: Store<T>,
   reducer: (state: T, payload: Params) => T
  ) => Subscription)
  & ((store: Store<Params>, _: void) => Subscription)
 ),
 epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
 getType(): string,
 shortName: string,
 domainName: string,
 graphite: GraphiteMeta,
 compositeName: CompositeName,
}
