//@flow

import type {Stream} from 'most'

import {Atom} from '../derive'

export type Subscriber<A> = {
 next(value: A): void,
 // error(err: Error): void,
 //complete(): void,
}

export type Subscription = {
 (): void,
 unsubscribe(): void,
}

export type Event<E> = {
 (payload: E): E,
 eventState: Atom<{payload: E}>,
 getType(): string,
 create(payload: E, type: string): E,
 watch(watcher: (payload: E) => any): void,
 map<T>(fn: (_: E) => T): Event<T>,
 subscribe(subscriber: Subscriber<E>): Subscription,
 to(store: Store<E>, _: void): void,
 to<T>(store: Store<T>, reducer: (state: T, payload: E) => T): void,
 epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>,
}

export type Effect<Params, Done, Fail = Error> = {
 (
  payload: Params,
 ): {
  done(): Promise<Done>,
  fail(): Promise<Fail>,
  promise(): Promise<Done>,
 },
 done: Event<Done>,
 fail: Event<Fail>,
 use: (asyncFunction: (params: Params) => Promise<Done>) => void,
 watch(watcher: (payload: Params) => any): void,
 //map<T>(fn: (_: E) => T): Event<T>,
 subscribe(subscriber: Subscriber<Params>): Subscription,
 to(store: Store<Params>, _: void): void,
 to<T>(store: Store<T>, reducer: (state: T, payload: Params) => T): void,
 epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
}

export type Store<State> = {
 reset(event: Event<any> | Effect<any, any, any>): Store<State>,
 dispatch(action: any): any,
 getState(): State,
 withProps<Props, R>(
  fn: (state: State, props: Props) => R,
 ): (props: Props) => R,
 map<T>(fn: (_: State) => T): Store<T>,
 on<E>(
  event: Event<E> | Effect<E, any, any>,
  handler: (state: State, payload: E) => State,
 ): Store<State>,
 subscribe(listner: any): Subscription,
 watch(watcher: (payload: State) => any): void,
}

export type Domain = {
 event<Payload>(name: string): Event<Payload>,
 effect<Params, Done, Fail>(name: string): Effect<Params, Done, Fail>,
 domain(name: string): Domain,
 store<State>(defaultState: State): Store<State>,
}
