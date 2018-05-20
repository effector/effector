//@flow

import type {Stream} from 'most'

import * as Ctx from './datatype/context'
import type {Emit, Update} from './datatype/cmd'
import type {
 Multi as MultiStep,
 Seq as SeqStep,
 Single as SingleStep,
} from './datatype/step'

export type Subscriber<A> = {
 next(value: A): void,
 // error(err: Error): void,
 //complete(): void,
}

export type SingleStepValidContext =
 | Ctx.EmitContext
 | Ctx.ComputeContext
 | Ctx.FilterContext
 | Ctx.UpdateContext

export type Subscription = {
 (): void,
 unsubscribe(): void,
}

export type Unsubscribe = () => void

export type GraphiteMeta = {
 next: MultiStep,
 seq: SeqStep,
}

export type Event<E> = {
 (payload: E): E,
 getType(): string,
 create(payload: E, type: string): E,
 watch(watcher: (payload: E) => any): Subscription,
 map<T>(fn: (_: E) => T): Event<T>,
 prepend<Before>(fn: (_: Before) => E): Event<Before>,
 subscribe(subscriber: Subscriber<E>): Subscription,
 //prettier-ignore
 +to: (
  & (<T>(store: Store<T>, reducer: (state: T, payload: E) => T) => Subscription)
  & ((store: Store<E>, _: void) => Subscription)
 ),
 epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>,
 getType(): string,
 shortName: string,
 domainName: string,
 graphite: GraphiteMeta,
}

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
}

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
 graphite: {
  next: MultiStep,
  seq: SeqStep,
 },
 displayName?: string,
}

export type Domain = {
 event<Payload>(name: string): Event<Payload>,
 effect<Params, Done, Fail>(name: string): Effect<Params, Done, Fail>,
 domain(name: string): Domain,
 store<State>(defaultState: State): Store<State>,
}
