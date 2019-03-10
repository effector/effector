export type kind = 'store' | 'event' | 'effect' | 'domain'

export const Kind: {
readonly store: kind
readonly event: kind
readonly effect: kind
readonly domain: kind
}

export type Subscriber<A> = {
  next(value: A): void
  // error(err: Error): void,
  //complete(): void,
}

export type Subscription = {
  (): void
  unsubscribe(): void
}

export interface Unit<T> {
  readonly kind: kind
  readonly __: T
}

export interface Event<Payload> extends Unit<Payload> {
  (payload: Payload): Payload
  watch(watcher: (payload: Payload) => any): Subscription
  map<T>(fn: (_: Payload) => T): Event<T>
  filter<T>(fn: (_: Payload) => T | void): Event<T>
  prepend<Before>(fn: (_: Before) => Payload): Event<Before>
  subscribe(subscriber: Subscriber<Payload>): Subscription
  getType(): string
}

export interface Future<Params, Done, Fail> extends Promise<Done> {
  readonly args: Params
  anyway(): Promise<void>
  cache(): Done | void
}

export interface Effect<Params, Done, Fail = Error> extends Unit<Params> {
  (payload: Params): Future<Params, Done, Fail>
  readonly done: Event<{params: Params; result: Done}>
  readonly fail: Event<{params: Params; error: Fail}>
  readonly use: {
    (asyncFunction: (params: Params) => Promise<Done> | Done): Effect<
      Params,
      Done,
      Fail
    >
    getCurrent(): (params: Params) => Promise<Done>
  }
  watch(watcher: (payload: Params) => any): Subscription
  prepend<Before>(fn: (_: Before) => Params): Event<Before>
  subscribe(subscriber: Subscriber<Params>): Subscription
  getType(): string
}

export interface Store<State> extends Unit<State> {
  reset(trigger: Unit<any>): this
  getState(): State
  map<T>(fn: (_: State, lastState?: T) => T): Store<T>
  map<T>(fn: (_: State, lastState: T) => T, firstState: T): Store<T>
  on<E>(
    trigger: Unit<E>,
    handler: (state: State, payload: E) => State | void,
  ): this
  off(trigger: Unit<any>): void
  subscribe(listener: any): Subscription
  watch<E>(
    watcher: (state: State, payload: undefined, type: string) => any,
  ): Subscription
  watch<E>(
    trigger: Unit<E>,
    watcher: (state: State, payload: E, type: string) => any,
  ): Subscription
  thru<U>(fn: (store: Store<State>) => U): U
  shortName: string
  defaultState: State
}

export function isUnit<T>(obj: unknown): obj is Unit<T>
export function isStore<State>(obj: unknown): obj is Store<State>
export function isEvent<Payload>(obj: unknown): obj is Event<Payload>
export function isEffect<Params, Done, Error>(obj: unknown): obj is Effect<Params, Done, Error>
export function isDomain(obj: unknown): obj is Domain

export class Domain {
  onCreateEvent(hook: (newEvent: Event<unknown>) => any): Subscription
  onCreateEffect(
    hook: (newEffect: Effect<unknown, unknown, unknown>) => any,
  ): Subscription
  onCreateStore(hook: (newStore: Store<unknown>) => any): Subscription
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription
  event<Payload>(name?: string): Event<Payload>
  effect<Params, Done, Fail>(name?: string): Effect<Params, Done, Fail>
  domain(name?: string): Domain
  store<State>(defaultState: State): Store<State>
  getType(): string
}

export function forward<T>(opts: {from: Unit<T>; to: Unit<T>}): Subscription
export function relayShape<
  E,
  O extends {[field: string]: Unit<any>},
  F extends {[K in keyof O]: O[K] extends Unit<infer T> ? T : any}
>(opts: {from: Unit<E>; shape: O; query(data: E): Partial<F>}): Subscription
export function relay<T, Arg>(
  from: Unit<T>,
  query: (
    data: T,
  ) => {
  arg: Arg
  list: Array<Unit<Arg> | null>
  },
): Subscription
export function relay<T, Arg>(opts: {
from: Unit<T>
query(
  data: T,
): {
arg: Arg
list: Array<Unit<Arg> | null>
}
}): Subscription

export function createEvent<E>(eventName?: string): Event<E>

export function createEffect<Params, Done, Fail>(
  effectName?: string,
  config?: {
  handler?: (params: Params) => Promise<Done> | Done
  },
): Effect<Params, Done, Fail>

export function createStore<State>(
  defaultState: State,
  config?: {name?: string},
): Store<State>
export function setStoreName<State>(store: Store<State>, name: string): void

export function createStoreObject<State>(
  defaultState: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
export function createApi<
  S,
  Api extends {[name: string]: (store: S, e: any) => S}
>(
  store: Store<S>,
  api: Api,
): {
  [K in keyof Api]: Api[K] extends (store: S, e: infer E) => S ? Event<E> : any
}

export function extract<State, NextState>(
  obj: Store<State>,
  extractor: (_: State) => NextState,
): Store<NextState>
export function restoreObject<State extends {[key: string]: Store<any> | any}>(
  state: State,
): {[K in keyof State]: State[K] extends Store<infer S> ? Store<S> : State[K]}
export function restoreEffect<Done>(
  effect: Effect<any, Done, any>,
  defaultState: Done,
): Store<Done>
export function restoreEvent<E>(event: Event<E>, defaultState: E): Store<E>
export function restore<Done>(
  effect: Effect<any, Done, any>,
  defaultState: Done,
): Store<Done>
export function restore<E>(event: Event<E>, defaultState: E): Store<E>
export function restore<State extends {[key: string]: Store<any> | any}>(
  state: State,
): {[K in keyof State]: State[K] extends Store<infer S> ? Store<S> : State[K]}

export function createDomain(domainName?: string): Domain

export function sample<A, B>(source: Event<A>, sampler: Event<B> | Store<B>): Event<A>
export function sample<A, B>(source: Store<A>, sampler: Event<B> | Store<B>): Store<A>
export function sample<A, B>(source: Effect<A, any, any>, sampler: Event<B> | Store<B>): Event<A>

export function combine<R>(fn: () => R): Store<R>
export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
export function combine<A, B, R>(
  a: Store<A>,
  b: Store<B>,
  fn: (a: A, b: B) => R,
): Store<R>
export function combine<A, B, C, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  fn: (a: A, b: B, c: C) => R,
): Store<R>
export function combine<A, B, C, D, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  fn: (a: A, b: B, c: C, d: D) => R,
): Store<R>
export function combine<A, B, C, D, E, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
): Store<R>
export function combine<A, B, C, D, E, F, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, I, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, I, J, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  j: Store<J>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R,
): Store<R>
export function combine<A, B, C, D, E, F, G, H, I, J, K, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  j: Store<J>,
  k: Store<K>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => R,
): Store<R>
