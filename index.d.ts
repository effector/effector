
import {Stream} from 'most'

export type Subscriber<A> = {
 next(value: A): void,
 // error(err: Error): void,
 //complete(): void,
}

export type Subscription = {
 (): void,
 unsubscribe(): void,
}

export class Event<E> {
 (payload: E): E;
 watch(watcher: (payload: E) => any): void;
 map<T>(fn: (_: E) => T): Event<T>;
 prepend<Before>(fn: (_: Before) => E): Event<Before>;
 subscribe(subscriber: Subscriber<E>): Subscription;
 to(store: Store<E>, _: void): void;
 to<T>(store: Store<T>, reducer: (state: T, payload: E) => T): void;
 epic<T>(fn: (_: Stream<E>) => Stream<T>): Event<T>;
}

export class Effect<Params, Done, Fail = Error> {
 (
  payload: Params,
 ): {
  done(): Promise<Done>,
  fail(): Promise<Fail>,
  promise(): Promise<Done>,
 };
 done: Event<Done>;
 fail: Event<Fail>;
 use(asyncFunction: (params: Params) => Promise<Done>): void;
 watch(watcher: (payload: Params) => any): void;
 //map<T>(fn: (_: E) => T): Event<T>,
 prepend<Before>(fn: (_: Before) => Params): Event<Before>;
 subscribe(subscriber: Subscriber<Params>): Subscription;
 to(store: Store<Params>, _: void): void;
 to<T>(store: Store<T>, reducer: (state: T, payload: Params) => T): void;
 epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>;
}

export class Store<State> {
 reset(event: Event<any> | Effect<any, any, any>): this;
 dispatch(action: any): any;
 getState(): State;
 withProps<Props, R>(
  fn: (state: State, props: Props) => R,
 ): (props: Props) => R;
 map<T>(fn: (_: State) => T): Store<T>;
 on<E>(
  event: Event<E> | Effect<E, any, any>,
  handler: (state: State, payload: E) => State,
 ): this;
 subscribe(listner: any): Subscription;
 watch<E>(watcher: (state: State, payload: E, type: string) => any): void;
}

export class Domain {
 event<Payload>(name: string): Event<Payload>;
 effect<Params, Done, Fail>(name: string): Effect<Params, Done, Fail>;
 domain(name: string): Domain;
 store<State>(defaultState: State): Store<State>;
}

export function createEvent<E>(eventName: string): Event<E>

export function createEffect<Params, Done, Fail>(
 effectName: string,
): Effect<Params, Done, Fail>

export function createStore<State>(defaultState: State): Store<State>

declare export function createStoreObject<State>(
 defaultState: State,
): Store<any>

export function createReduxStore<T>(
 reducer: (state: T, event: any) => T,
 preloadedState?: T,
 enhancer?: Function | Function[],
): Store<T>

export function createDomain(domainName?: string): Domain
