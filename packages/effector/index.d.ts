/// <reference types="symbol-observable" />

export const version: string

export type kind = 'store' | 'event' | 'effect' | 'domain'

export type mixed_non_void =
  | null
  | string
  | number
  | boolean
  | {}
  | ReadonlyArray<unknown>

export const Kind: {
readonly store: kind
readonly event: kind
readonly effect: kind
readonly domain: kind
}

export type Observer<A> = {
  readonly next?: (value: A) => void
  // error(err: Error): void,
  //complete(): void,
}

export type Observable<T> = {
  subscribe: (observer: Observer<T>) => Subscription
  [Symbol.observable](): Observable<T>
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
  map<T>(fn: (payload: Payload) => T): Event<T>
  filter(config: {fn(payload: Payload): boolean}): Event<Payload>
  filter<T>(fn: (payload: Payload) => T | undefined): Event<T>
  prepend<Before>(fn: (_: Before) => Payload): Event<Before>
  subscribe(observer: Observer<Payload>): Subscription
  thru<U>(fn: (event: Event<Payload>) => U): U
  getType(): string
  [Symbol.observable](): Observable<Payload>
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
  pending: Store<boolean>
  watch(watcher: (payload: Params) => any): Subscription
  map<T>(fn: (params: Params) => T): Event<T>
  prepend<Before>(fn: (_: Before) => Params): Event<Before>
  subscribe(observer: Observer<Params>): Subscription
  getType(): string
  [Symbol.observable](): Observable<Params>
}

export interface Store<State> extends Unit<State> {
  reset(...triggers: Array<Unit<any>>): this
  getState(): State
  map<T>(fn: (state: State, lastState?: T) => T): Store<T>
  map<T>(fn: (state: State, lastState: T) => T, firstState: T): Store<T>
  on<E>(
    trigger: Unit<E>,
    handler: (state: State, payload: E) => State | void,
  ): this
  off(trigger: Unit<any>): void
  subscribe(listener: (state: State) => any): Subscription
  updates: Event<State>
  watch<E>(watcher: (state: State, payload: undefined) => any): Subscription
  watch<E>(
    trigger: Unit<E>,
    watcher: (state: State, payload: E) => any,
  ): Subscription
  thru<U>(fn: (store: Store<State>) => U): U
  shortName: string
  defaultState: State
  [Symbol.observable](): Observable<State>
}

export function isUnit<T>(obj: unknown): obj is Unit<T>
export function isStore<State>(obj: unknown): obj is Store<State>
export function isEvent<Payload>(obj: unknown): obj is Event<Payload>
export function isEffect<Params, Done, Error>(
  obj: unknown,
): obj is Effect<Params, Done, Error>
export function isDomain(obj: unknown): obj is Domain

export const is: {
unit(obj: unknown): boolean
store(obj: unknown): boolean
event(obj: unknown): boolean
effect(obj: unknown): boolean
domain(obj: unknown): boolean
}

interface InternalStore<State> extends Store<State> {
  setState(state: State): void
}

export class Domain {
  readonly kind: kind
  onCreateEvent(hook: (newEvent: Event<unknown>) => any): Subscription
  onCreateEffect(
    hook: (newEffect: Effect<unknown, unknown, unknown>) => any,
  ): Subscription
  onCreateStore(
    hook: (newStore: InternalStore<mixed_non_void>) => any,
  ): Subscription
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription
  event<Payload = void>(name?: string): Event<Payload>
  effect<Params, Done, Fail = Error>(
    name?: string,
    config?: {
    handler?: (params: Params) => Promise<Done> | Done
    },
  ): Effect<Params, Done, Fail>
  domain(name?: string): Domain
  store<State>(defaultState: State, config?: {name?: string}): Store<State>
  getType(): string
}

export type ID = string
export type StateRef = {
  current: any
  id: ID
}
//prettier-ignore
export type Cmd =
  | Update
  | Run
  | Filter
  | Emit
  | Compute
  | Tap
  | Barrier

export type Barrier = {
  id: ID
  type: 'barrier'
  group: 'cmd'
  data: {
    barrierID: ID
  }
}

export type Update = {
  id: ID
  type: 'update'
  group: 'cmd'
  data: {
    store: StateRef
  }
}
export type Run = {
  id: ID
  type: 'run'
  group: 'cmd'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => any
  }
}

export type Filter = {
  id: ID
  type: 'filter'
  group: 'cmd'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => boolean
  }
}
export type Emit = {
  id: ID
  type: 'emit'
  group: 'cmd'
  data: {
    fullName: string
  }
}
export type Compute = {
  id: ID
  type: 'compute'
  group: 'cmd'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => any
  }
}
export type Tap = {
  id: ID
  type: 'tap'
  group: 'cmd'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => any
  }
}
export type Step = {
  from: Array<Step>
  next: Array<Step>
  seq: Array<Cmd>
  scope: {[field: string]: any}
}
export const step: {
emit(data: {fullName: string}): Emit
compute(data: {
  fn: (data: any, scope: {[field: string]: any}) => any
  }): Compute
tap(data: {fn: (data: any, scope: {[field: string]: any}) => any}): Tap
filter(data: {
  fn: (data: any, scope: {[field: string]: any}) => boolean
  }): Filter
update(data: {store: StateRef}): Update
run(data: {fn: (data: any, scope: {[field: string]: any}) => any}): Run
}
export function forward<T>(opts: {from: Unit<T>; to: Unit<T>}): Subscription
export function clearNode(unit: Unit<any> | Step, opts?: {deep?: boolean}): void
export function createNode(opts: {
node: Array<Cmd>
child?: Array<Unit<any> | Step>
from?: Array<Unit<any> | Step>
scope?: {[field: string]: any}
}): Step
export function launch<T>(unit: Unit<T> | Step, payload: T): void
export function fromObservable<T>(observable: unknown): Event<T>
export function createEvent<E = void>(eventName?: string): Event<E>

export function createEffect<Params, Done, Fail = Error>(
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
  [K in keyof Api]: Api[K] extends (store: S, e: void) => S
    ? Event<void>
    : Api[K] extends (store: S, e: infer E) => S
    ? Event<E extends void ? Exclude<E, undefined> | void : E>
    : any
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
): {
  [K in keyof State]: State[K] extends Store<infer S>
    ? Store<S>
    : Store<State[K]>
}

export function createDomain(domainName?: string): Domain

export function sample<A>(config: {
source: Unit<A>
clock: Unit<any>
target?: Unit<A>
}): Unit<A>
export function sample<A, B, C>(config: {
source: Unit<A>
clock: Unit<B>
target?: Unit<C>
fn(source: A, clock: B): C
}): Unit<C>

export function sample<A>(source: Store<A>, clock?: Store<any>): Store<A>
export function sample<A>(
  source: Event<A> | Effect<A, any, any>,
  clock: Store<any>,
): Event<A>
export function sample<A>(
  source: Event<A> | Store<A> | Effect<A, any, any>,
  clock: Event<any> | Effect<any, any, any>,
): Event<A>

export function sample<A, B, C>(
  source: Store<A>,
  clock: Store<B>,
  fn: (source: A, clock: B) => C,
): Store<C>
export function sample<A, B, C>(
  source: Event<A> | Effect<A, any, any>,
  clock: Store<B>,
  fn: (source: A, clock: B) => C,
): Event<A>
export function sample<A, B, C>(
  source: Event<A> | Store<A> | Effect<A, any, any>,
  clock: Event<B> | Effect<B, any, any>,
  fn: (source: A, clock: B) => C,
): Event<C>

export function invariant(
  condition: boolean,
  format: string,
  ...args: unknown[]
): void
export function warning(
  condition: boolean,
  format: string,
  ...args: unknown[]
): void

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
