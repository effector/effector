/// <reference types="symbol-observable" />

/**
 * This tuple type is intended for use as a generic constraint to infer concrete
 * tuple type of ANY length.
 *
 * @see https://github.com/krzkaczor/ts-essentials/blob/a4c2485bc3f37843267820ec552aa662251767bc/lib/types.ts#L169
 */
type Tuple<T = unknown> = [T] | T[]

/**
 * Non inferential type parameter usage.
 *
 * @see https://github.com/microsoft/TypeScript/issues/14829#issuecomment-504042546
 */
type NoInfer<T> = [T][T extends any ? 0 : never]

// Type for extention purpose. Represents combinable sample source.
export type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
// Helper type, which unwraps combinable sample source value.
export type GetCombinedValue<T> = {
  [K in keyof T]: T[K] extends Store<infer U> ? U : never
}

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
  //error(err: Error): void
  //complete(): void
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

export type CompositeName = {
  shortName: string
  fullName: string
  path: Array<string>
}

export interface Event<Payload> extends Unit<Payload> {
  (payload: Payload): Payload
  watch(watcher: (payload: Payload) => any): Subscription
  map<T>(fn: (payload: Payload) => T): Event<T>
  filter<T extends Payload>(config: {
    fn(payload: Payload): payload is T
  }): Event<T>
  filter(config: {fn(payload: Payload): boolean}): Event<Payload>
  /**
   * @deprecated This form is deprecated, use `filterMap` method instead.
   */
  filter<T>(fn: (payload: Payload) => T | undefined): Event<T>
  filterMap<T>(fn: (payload: Payload) => T | undefined): Event<T>
  prepend<Before>(fn: (_: Before) => Payload): Event<Before>
  subscribe(observer: Observer<Payload>): Subscription
  thru<U>(fn: (event: Event<Payload>) => U): U
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
  [Symbol.observable](): Observable<Payload>
}

/**
 * This is a workaround for https://github.com/microsoft/TypeScript/issues/35162
 *
 * The problem was that we couldn't use guard as sample's clock parameter because
 * sample's clock-related generic inferred as `unknown` in cases when guard returned
 * `Event<T>`. This happens because `Event` has a callable signature. With `Unit<T>`
 * as the return type we won't see any problems.
 */
type EventAsReturnType<Payload> = Payload extends any ? Event<Payload> : never

export interface Effect<Params, Done, Fail = Error> extends Unit<Params> {
  (payload: Params): Promise<Done>
  readonly done: Event<{params: Params; result: Done}>
  readonly doneData: Event<Done>
  readonly fail: Event<{params: Params; error: Fail}>
  readonly failData: Event<Fail>
  readonly finally: Event<
    | {
        status: 'done'
        params: Params
        result: Done
      }
    | {
        status: 'fail'
        params: Params
        error: Fail
      }
  >
  readonly use: {
    (asyncFunction: (params: Params) => Promise<Done> | Done): Effect<
      Params,
      Done,
      Fail
    >
    getCurrent(): (params: Params) => Promise<Done>
  }
  pending: Store<boolean>
  inFlight: Store<number>
  watch(watcher: (payload: Params) => any): Subscription
  map<T>(fn: (params: Params) => T): Event<T>
  prepend<Before>(fn: (_: Before) => Params): Event<Before>
  subscribe(observer: Observer<Params>): Subscription
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
  [Symbol.observable](): Observable<Params>
}

export interface Store<State> extends Unit<State> {
  reset(...triggers: Array<Unit<any>>): this
  reset(triggers: Array<Unit<any>>): this
  getState(): State
  map<T>(fn: (state: State, lastState?: T) => T): Store<T>
  map<T>(fn: (state: State, lastState: T) => T, firstState: T): Store<T>
  on<E>(
    triggers: Unit<E>[],
    handler: (state: State, payload: E) => State | void,
  ): this
  on<E>(
    trigger: Unit<E>,
    handler: (state: State, payload: E) => State | void,
  ): this
  off(trigger: Unit<any>): this
  subscribe(listener: (state: State) => any): Subscription
  updates: Event<State>
  watch<E>(watcher: (state: State, payload: undefined) => any): Subscription
  watch<E>(
    trigger: Unit<E>,
    watcher: (state: State, payload: E) => any,
  ): Subscription
  thru<U>(fn: (store: Store<State>) => U): U
  defaultState: State
  compositeName: CompositeName
  shortName: string
  sid: string | null
  [Symbol.observable](): Observable<State>
}

export const is: {
  unit(obj: unknown): obj is Unit<any>
  store(obj: unknown): obj is Store<any>
  event(obj: unknown): obj is Event<any>
  effect(obj: unknown): obj is Effect<any, any, any>
  domain(obj: unknown): obj is Domain
}

interface InternalStore<State> extends Store<State> {
  setState(state: State): void
}

export class Domain implements Unit<any> {
  readonly kind: kind
  readonly __: any
  onCreateEvent(hook: (newEvent: Event<unknown>) => any): Subscription
  onCreateEffect(
    hook: (newEffect: Effect<unknown, unknown, unknown>) => any,
  ): Subscription
  onCreateStore(
    hook: (newStore: InternalStore<mixed_non_void>) => any,
  ): Subscription
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription
  event<Payload = void>(name?: string): Event<Payload>
  event<Payload = void>(config: {name?: string; sid?: string}): Event<Payload>
  createEvent<Payload = void>(name?: string): Event<Payload>
  createEvent<Payload = void>(config: {
    name?: string
    sid?: string
  }): Event<Payload>
  effect<Params, Done, Fail = Error>(
    name?: string,
    config?: {
      handler?: (params: Params) => Promise<Done> | Done
      sid?: string
    },
  ): Effect<Params, Done, Fail>
  effect<Params, Done, Fail = Error>(config: {
    handler?: (params: Params) => Promise<Done> | Done
    sid?: string
    name?: string
  }): Effect<Params, Done, Fail>
  createEffect<Params, Done, Fail = Error>(
    name?: string,
    config?: {
      handler?: (params: Params) => Promise<Done> | Done
      sid?: string
    },
  ): Effect<Params, Done, Fail>
  createEffect<Params, Done, Fail = Error>(config: {
    handler?: (params: Params) => Promise<Done> | Done
    sid?: string
    name?: string
  }): Effect<Params, Done, Fail>
  domain(name?: string): Domain
  createDomain(name?: string): Domain
  store<State>(
    defaultState: State,
    config?: {name?: string; sid?: string},
  ): Store<State>
  createStore<State>(
    defaultState: State,
    config?: {name?: string; sid?: string},
  ): Store<State>
  sid: string | null
  shortName: string
  getType(): string
  history: {
    domains: Set<Domain>
    stores: Set<Store<any>>
    effects: Set<Effect<any, any, any>>
    events: Set<Event<any>>
  }
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
  | Compute
  | Barrier

export type Barrier = {
  id: ID
  type: 'barrier'
  data: {
    barrierID: ID
  }
}

export type Update = {
  id: ID
  type: 'update'
  data: {
    store: StateRef
  }
}
export type Run = {
  id: ID
  type: 'run'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => any
  }
}

export type Filter = {
  id: ID
  type: 'filter'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => boolean
  }
}

export type Compute = {
  id: ID
  type: 'compute'
  data: {
    fn: (data: any, scope: {[field: string]: any}) => any
  }
}
export type Step = {
  next: Array<Step>
  seq: Array<Cmd>
  scope: {[field: string]: any}
  meta: {[field: string]: any}
  family: {
    type: 'regular' | 'crosslink'
    links: Step[]
    owners: Step[]
  }
}
export const step: {
  compute(data: {
    fn: (data: any, scope: {[field: string]: any}) => any
  }): Compute
  filter(data: {
    fn: (data: any, scope: {[field: string]: any}) => boolean
  }): Filter
  update(data: {store: StateRef}): Update
  run(data: {fn: (data: any, scope: {[field: string]: any}) => any}): Run
}

export function forward<T>(opts: {
  /**
   * By default TS picks "best common type" `T` between `from` and `to` arguments.
   * This lets us forward from `string | number` to `string` for instance, and
   * this is wrong.
   *
   * Fortunately we have a way to disable such behavior. By adding `& {}` to some
   * generic type we tell TS "do not try to infer this generic type from
   * corresponding argument type".
   *
   * Generic `T` won't be inferred from `from` any more. Forwarding from "less
   * strict" to "more strict" will produce an error as expected.
   *
   * @see https://www.typescriptlang.org/docs/handbook/type-inference.html#best-common-type
   */
  from: Unit<T & {}>
  to: Unit<T> | ReadonlyArray<Unit<T>>
}): Subscription
export function forward(opts: {
  from: Unit<any>
  to: ReadonlyArray<Unit<void>>
}): Subscription
export function forward(opts: {
  from: ReadonlyArray<Unit<any>>
  to: ReadonlyArray<Unit<void>>
}): Subscription
export function forward(opts: {
  from: ReadonlyArray<Unit<any>>
  to: Unit<void>
}): Subscription
export function forward<To, From extends To>(opts: {
  from: ReadonlyArray<Unit<From>>
  to: Unit<To> | ReadonlyArray<Unit<To>>
}): Subscription
// Allow `* -> void` forwarding (e.g. `string -> void`).
export function forward(opts: {from: Unit<any>; to: Unit<void>}): Subscription
// Do not remove the signature below to avoid breaking change!
export function forward<To, From extends To>(opts: {
  from: Unit<From>
  to: Unit<To> | ReadonlyArray<Unit<To>>
}): Subscription

export function merge<T>(events: ReadonlyArray<Unit<T>>): Event<T>
export function merge<T extends ReadonlyArray<Unit<any>>>(
  events: T,
): T[number] extends Unit<infer R> ? Event<R> : never
export function clearNode(unit: Unit<any> | Step, opts?: {deep?: boolean}): void
export function createNode(opts: {
  node?: Array<Cmd>
  parent?: Array<Unit<any> | Step>
  child?: Array<Unit<any> | Step>
  scope?: {[field: string]: any}
  meta?: {[field: string]: any}
  family?: {
    type?: 'regular' | 'crosslink'
    owners?: Unit<any> | Step | Array<Unit<any> | Step>
    links?: Unit<any> | Step | Array<Unit<any> | Step>
  }
}): Step
export function launch<T>(unit: Unit<T> | Step, payload: T): void
export function launch<T>(config: {
  target: Unit<T> | Step
  params: T
  defer?: boolean
  page?: any
}): void
export function fromObservable<T>(observable: unknown): Event<T>

export function createEvent<E = void>(eventName?: string): Event<E>
export function createEvent<E = void>(config: {
  name?: string
  sid?: string
}): Event<E>

export function createEffect<Params, Done, Fail = Error>(
  effectName?: string,
  config?: {
    handler?: (params: Params) => Promise<Done> | Done
    sid?: string
  },
): Effect<Params, Done, Fail>

export function createEffect<FN extends Function>(config: {
  name?: string
  handler: FN
  sid?: string
}): FN extends (...args: infer Args) => infer Done
  ? Effect<
      Args['length'] extends 0 // does handler accept 0 arguments?
        ? void // works since TS v3.3.3
        : 0 | 1 extends Args['length']  // is the first argument optional?
          /**
           * Applying `infer` to a variadic arguments here we'll get `Args` of
           * shape `[T]` or `[T?]`, where T(?) is a type of handler `params`.
           * In case T is optional we get `T | undefined` back from `Args[0]`.
           * We lose information about argument's optionality, but we can make it
           * optional again by appending `void` type, so the result type will be
           * `T | undefined | void`.
           *
           * The disadvantage of this method is that we can't restore optonality
           * in case of `params?: any` because in a union `any` type absorbs any
           * other type (`any | undefined | void` becomes just `any`). And we
           * have similar situation also with the `unknown` type.
           */
        ? Args[0] | void
        : Args[0],
      Done extends Promise<infer Async> ? Async : Done,
      Error
    >
  : never
export function createEffect<Params, Done, Fail = Error>(config: {
  name?: string
  handler?: (params: Params) => Promise<Done> | Done
  sid?: string
}): Effect<Params, Done, Fail>

export function createStore<State>(
  defaultState: State,
  config?: {name?: string; sid?: string},
): Store<State>
export function setStoreName<State>(store: Store<State>, name: string): void

export function createStoreObject<State>(
  defaultState: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
export function split<S, Obj extends {[name: string]: (payload: S) => boolean}>(
  source: Unit<S>,
  cases: Obj,
): {
  [K in keyof Obj]: Obj[K] extends (p: any) => p is infer R
    ? Event<R>
    : Event<S>
} & {__: Event<S>}

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
export function restore<Done>(
  effect: Effect<any, Done, any>,
  defaultState: null,
): Store<Done | null>
export function restore<E>(event: Event<E>, defaultState: E): Store<E>
export function restore<E>(event: Event<E>, defaultState: null): Store<E | null>
export function restore<State extends {[key: string]: Store<any> | any}>(
  state: State,
): {
  [K in keyof State]: State[K] extends Store<infer S>
    ? Store<S>
    : Store<State[K]>
}

export function createDomain(domainName?: string): Domain

/* basic overloads */
export function sample<A>(source: Store<A>, clock?: Store<any>): Store<A>
export function sample<A>(
  source: Store<A>,
  clock: Event<any> | Effect<any, any, any>,
): Event<A>
export function sample<A>(
  source: Event<A> | Effect<A, any, any>,
  clock: Unit<any>,
): Event<A>
export function sample<A, B, C>(
  source: Store<A>,
  clock: Store<B>,
  fn: (source: A, clock: B) => C,
  greedy?: boolean,
): Store<C>
export function sample<A, B, C>(
  source: Unit<A>,
  clock: Unit<B>,
  fn: (source: A, clock: B) => C,
  greedy?: boolean,
): Event<C>
export function sample<A, B, C>(config: {
  source: Unit<A>
  clock: Unit<B>
  fn: (source: A, clock: B) => NoInfer<C>
  target: Unit<C>
  greedy?: boolean
}): Unit<C>
export function sample<A, B>(config: {
  source: Unit<A>
  fn: (source: A) => NoInfer<B>
  target: Unit<B>
  greedy?: boolean
}): Unit<B>
export function sample<A>(config: {
  source: Unit<NoInfer<A>>
  clock: Unit<any>
  target: Unit<A>
  greedy?: boolean
}): Unit<A>
export function sample<A>(config: {
  source: Unit<A>
  target: Unit<A>
  greedy?: boolean
}): Unit<A>
export function sample(config: {
  source: Unit<any>
  target: Unit<void>
  greedy?: boolean
}): Unit<void>
export function sample<A, B, C>(config: {
  source: Store<A>
  clock: Store<B>
  fn(source: A, clock: B): C
  name?: string
  greedy?: boolean
}): Store<C>
export function sample<A, B, C>(config: {
  source: Unit<A>
  clock: Unit<B>
  fn(source: A, clock: B): C
  name?: string
  greedy?: boolean
}): Event<C>
export function sample<A>(config: {
  source: Store<A>
  clock?: Store<any>
  name?: string
  greedy?: boolean
}): Store<A>
export function sample<A>(config: {
  source: Store<A>
  clock?: Event<any> | Effect<any, any, any>
  name?: string
  greedy?: boolean
}): Event<A>
export function sample<A>(config: {
  source: Event<A> | Effect<A, any, any>
  clock?: Unit<any>
  name?: string
  greedy?: boolean
}): Event<A>
/* overloads with implicit `combine` */
export function sample<A extends Combinable>(
  source: A,
  clock: Event<any> | Effect<any, any, any>,
): Event<GetCombinedValue<A>>
export function sample<A extends Combinable, B, C>(
  source: A,
  clock: Store<B>,
  fn: (source: GetCombinedValue<A>, clock: B) => C,
  greedy?: boolean,
): Store<C>
export function sample<A extends Combinable, B, C>(
  source: A,
  clock: Store<B>,
  fn: (source: GetCombinedValue<A>, clock: B) => C,
  greedy?: boolean,
): Store<C>
export function sample<A extends Combinable, B, C>(
  source: A,
  clock: Event<B> | Effect<B, any, any>,
  fn: (source: GetCombinedValue<A>, clock: B) => C,
  greedy?: boolean,
): Event<C>
export function sample<A extends Combinable>(config: {
  source: A
  clock: Store<any>
  name?: string
  greedy?: boolean
}): Store<GetCombinedValue<A>>
export function sample<A extends Combinable>(config: {
  source: A
  clock: Event<any> | Effect<any, any, any>
  name?: string
  greedy?: boolean
}): Event<GetCombinedValue<A>>
export function sample<A extends Combinable, B, C>(config: {
  source: A
  clock: Store<B>
  fn(source: GetCombinedValue<A>, clock: B): C
  name?: string
  greedy?: boolean
}): Store<C>
export function sample<A extends Combinable, B, C>(config: {
  source: A
  clock: Event<B> | Effect<B, any, any>
  fn(source: GetCombinedValue<A>, clock: B): C
  name?: string
  greedy?: boolean
}): Event<C>
export function sample<A extends Combinable>(config: {
  source: A
  clock: Unit<any>
  target: Unit<GetCombinedValue<A>>
  greedy?: boolean
}): Unit<GetCombinedValue<A>>
export function sample<A extends Combinable, B, C>(config: {
  source: A
  clock: Unit<B>
  fn(source: GetCombinedValue<A>, clock: B): C
  target: Unit<C>
  greedy?: boolean
}): Unit<C>
export function sample<A extends Combinable, B, C>(config: {
  source: A
  clock: Unit<B>
  target: Unit<C>
  greedy?: boolean
}): Unit<GetCombinedValue<A>>

export function guard<Source, Result extends Source>(
  source: Unit<Source>,
  config: {
    filter: (value: Source) => value is Result
  },
): EventAsReturnType<Result>
export function guard<A>(
  source: Unit<A>,
  config: {
    filter: Store<boolean> | ((value: A) => boolean)
  },
): EventAsReturnType<A>
export function guard<Source, Result extends Source>(
  source: Unit<Source>,
  config: {
    filter: (value: Source) => value is Result
    target: Unit<Result>
  },
): Unit<Result>
export function guard<A>(
  source: Unit<A>,
  config: {
    filter: Store<boolean> | ((value: A) => boolean)
    target: Unit<A>
  },
): Unit<A>
export function guard<A>(config: {
  source: Unit<A>
  filter: (value: A) => boolean
  target: Unit<void>
}): Unit<void>
export function guard(config: {
  source: Unit<any>
  filter: Store<boolean>
  target: Unit<void>
}): Unit<void>
export function guard<Source, Result extends Source>(config: {
  source: Unit<Source>
  filter: (value: Source) => value is Result
}): EventAsReturnType<Result>
export function guard<A>(config: {
  source: Unit<A>
  filter: Store<boolean> | ((value: A) => boolean)
}): EventAsReturnType<A>
export function guard<Source, Result extends Source>(config: {
  source: Unit<Source>
  filter: (value: Source) => value is Result
  target: Unit<Result>
}): Unit<Result>
export function guard<A>(config: {
  source: Unit<A>
  filter: Store<boolean> | ((value: A) => boolean)
  target: Unit<A>
}): Unit<A>

type StoreShape = Store<any> | Combinable
type GetShapeValue<T> = T extends Store<infer S> ? S : GetCombinedValue<T>
type FXParams<FX extends Effect<any, any, any>> = FX extends Effect<
  infer P,
  any,
  any
>
  ? P
  : never
type FXResult<FX extends Effect<any, any, any>> = FX extends Effect<
  any,
  infer D,
  any
>
  ? D
  : never
type FXError<FX extends Effect<any, any, any>> = FX extends Effect<
  any,
  any,
  infer E
>
  ? E
  : never

export function attach<
  Params,
  States extends StoreShape,
  FX extends Effect<any, any, any>
>(config: {
  source: States
  effect: FX
  mapParams: (params: Params, states: GetShapeValue<States>) => FXParams<FX>
}): Effect<Params, FXResult<FX>, FXError<FX>>
export function attach<Params, FX extends Effect<any, any, any>>(config: {
  effect: FX
  mapParams: (params: Params) => FXParams<FX>
}): Effect<Params, FXResult<FX>, FXError<FX>>

export function withRegion(unit: Unit<any> | Step, cb: () => void): void
export function combine<T extends Store<any>>(
  store: T,
): T extends Store<infer R> ? Store<[R]> : never
export function combine<State extends Tuple>(
  shape: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
export function combine<State>(
  shape: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
export function combine<State extends Tuple, R>(
  shape: State,
  fn: (
    shape: {[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]},
  ) => R,
): Store<R>
export function combine<State, R>(
  shape: State,
  fn: (
    shape: {[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]},
  ) => R,
): Store<R>
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
export function combine<T extends Tuple<Store<any>>>(
  ...stores: T
): Store<{[K in keyof T]: T[K] extends Store<infer U> ? U : T[K]}>
