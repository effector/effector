/**
 * This tuple type is intended for use as a generic constraint to infer concrete
 * tuple type of ANY length.
 *
 * @see https://github.com/krzkaczor/ts-essentials/blob/a4c2485bc3f37843267820ec552aa662251767bc/lib/types.ts#L169
 */
type Tuple<T = unknown> = [T]
  | [T, T]
  | [T, T, T]
  | [T, T, T, T]
  | [T, T, T, T, T]
  | [T, T, T, T, T, T]
  | [T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T, T, T]
  | [T, T, T, T, T, T, T, T, T, T, T, T]

/**
 * Non inferential type parameter usage.
 *
 * @see https://github.com/microsoft/TypeScript/issues/14829#issuecomment-504042546
 */
type NoInfer<T> = [T][T extends any ? 0 : never]

// Type for extention purpose. Represents combinable sample source.
export type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
// Helper type, which unwraps combinable sample source value.
export type GetCombinedValue<T> = Show<{
  [K in keyof T]: T[K] extends Store<infer U> ? U : never
}>

export type StoreValue<T> = T extends Store<infer S> ? S : never
export type EventPayload<T> = T extends Event<infer P> ? P : never
export type UnitValue<T> = T extends Unit<infer V> ? V : never
export type EffectParams<FX extends Effect<any, any, any>> = FX extends Effect<
  infer P,
  any,
  any
>
  ? P
  : never
export type EffectResult<FX extends Effect<any, any, any>> = FX extends Effect<
  any,
  infer D,
  any
>
  ? D
  : never
export type EffectError<FX extends Effect<any, any, any>> = FX extends Effect<
  any,
  any,
  infer E
>
  ? E
  : never

type EffectByHandler<FN extends Function, Fail> = FN extends (...args: infer Args) => infer Done
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
      Fail
    >
  : never

export const version: string

export type kind = 'store' | 'event' | 'effect' | 'domain'

export type mixed_non_void =
  | null
  | string
  | number
  | boolean
  | {}
  | ReadonlyArray<unknown>

export type Observer<A> = {
  readonly next?: (value: A) => void
  //error(err: Error): void
  //complete(): void
}

export type Observable<T> = {
  subscribe: (observer: Observer<T>) => Subscription
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
  (this: Payload extends void ? void : `Error: Expected 1 argument, but got 0`, payload?: Payload): void
  watch(watcher: (payload: Payload) => any): Subscription
  map<T>(fn: (payload: Payload) => T): Event<T>
  filter<T extends Payload>(config: {
    fn(payload: Payload): payload is T
  }): Event<T>
  filter(config: {fn(payload: Payload): boolean}): Event<Payload>
  filterMap<T>(fn: (payload: Payload) => T | undefined): Event<T>
  prepend<Before = void>(fn: (_: Before) => Payload): Event<Before>
  subscribe(observer: Observer<Payload>): Subscription
  thru<U>(fn: (event: Event<Payload>) => U): U
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
}

/**
 * This is a workaround for https://github.com/microsoft/TypeScript/issues/35162
 *
 * The problem was that we couldn't use guard as sample's clock parameter because
 * sample's clock-related generic inferred as `unknown` in cases when guard returned
 * `Event<T>`. This happens because `Event` has a callable signature. With `Unit<T>`
 * as the return type we won't see any problems.
 */
type EventAsReturnType<Payload> = any extends Payload ? Event<Payload> : never

export interface Effect<Params, Done, Fail = Error> extends Unit<Params> {
  (params: Params): Promise<Done>
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
    (handler: (params: Params) => Promise<Done> | Done): Effect<
      Params,
      Done,
      Fail
    >
    getCurrent(): (params: Params) => Promise<Done>
  }
  pending: Store<boolean>
  inFlight: Store<number>
  watch(watcher: (payload: Params) => any): Subscription
  filter<T extends Params>(config: {
    fn(payload: Params): payload is T
  }): Event<T>
  filter(config: {fn(payload: Params): boolean}): Event<Params>
  filterMap<T>(fn: (payload: Params) => T | undefined): Event<T>
  map<T>(fn: (params: Params) => T): Event<T>
  prepend<Before>(fn: (_: Before) => Params): Event<Before>
  subscribe(observer: Observer<Params>): Subscription
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
}

export interface Store<State> extends Unit<State> {
  reset(...triggers: Array<Unit<any>>): this
  reset(triggers: Array<Unit<any>>): this
  getState(): State
  map<T>(fn: (state: State, lastState?: T) => T): Store<T>
  map<T>(fn: (state: State, lastState: T) => T, firstState: T): Store<T>
  on<E>(
    trigger: Unit<E>,
    reducer: (state: State, payload: E) => State | void,
  ): this
  on<E>(
    triggers: Unit<E>[],
    reducer: (state: State, payload: E) => State | void,
  ): this
  off(trigger: Unit<any>): this
  subscribe(listener: Observer<State> | ((state: State) => any)): Subscription
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
  effect<FN extends Function>(handler: FN): EffectByHandler<FN, Error>
  effect<Params, Done, Fail = Error>(
    handler: (params: Params) => Done | Promise<Done>,
  ): Effect<Params, Done, Fail>
  effect<FN extends Function, Fail>(handler: FN): EffectByHandler<FN, Fail>
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
  createEffect<FN extends Function>(handler: FN): EffectByHandler<FN, Error>
  createEffect<Params, Done, Fail = Error>(
    handler: (params: Params) => Done | Promise<Done>,
  ): Effect<Params, Done, Fail>
  createEffect<FN extends Function, Fail>(handler: FN): EffectByHandler<FN, Fail>
  createEffect<FN extends Function>(config: {
    name?: string
    handler: FN
    sid?: string
  }): EffectByHandler<FN, Error>
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
export type Node = {
  next: Array<Node>
  seq: Array<Cmd>
  scope: {[field: string]: any}
  meta: {[field: string]: any}
  family: {
    type: 'regular' | 'crosslink'
    links: Node[]
    owners: Node[]
  }
}
export type Step = Node

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
export function clearNode(unit: Unit<any> | Node, opts?: {deep?: boolean}): void
export function createNode(opts?: {
  node?: Array<Cmd>
  parent?: Array<Unit<any> | Node>
  child?: Array<Unit<any> | Node>
  scope?: {[field: string]: any}
  meta?: {[field: string]: any}
  family?: {
    type?: 'regular' | 'crosslink'
    owners?: Unit<any> | Node | Array<Unit<any> | Node>
    links?: Unit<any> | Node | Array<Unit<any> | Node>
  }
}): Node
export function launch<T>(unit: Unit<T> | Node, payload: T): void
export function launch<T>(config: {
  target: Unit<T> | Node
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

export function createEffect<FN extends Function>(handler: FN): EffectByHandler<FN, Error>
export function createEffect<Params, Done, Fail = Error>(
  handler: (params: Params) => Done | Promise<Done>,
): Effect<Params, Done, Fail>
export function createEffect<FN extends Function, Fail>(handler: FN): EffectByHandler<FN, Fail>
export function createEffect<FN extends Function>(name: string, config: {
  handler: FN
  sid?: string
}): EffectByHandler<FN, Error>
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
}): EffectByHandler<FN, Error>
export function createEffect<Params, Done, Fail = Error>(config: {
  name?: string
  handler?: (params: Params) => Promise<Done> | Done
  sid?: string
}): Effect<Params, Done, Fail>

export function createStore<State>(
  defaultState: State,
  config?: {
    name?: string;
    sid?: string
    updateFilter?: (update: State, current: State) => boolean
  },
): Store<State>
export function setStoreName<State>(store: Store<State>, name: string): void

export function createStoreObject<State>(
  defaultState: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>

export function split<
  S,
  Match extends {[name: string]: ((payload: S) => boolean) | Store<boolean>}
>(config: {
  source: Unit<S>
  match: Match
  cases: Partial<
    {
      [K in keyof Match]: Match[K] extends (p: any) => p is infer R
        ? Unit<R>
        : Unit<S>
    } & {__: Unit<S>}
  >
}): void
export function split<
  S,
  Match extends {[name: string]: (payload: S) => boolean}
>(
  source: Unit<S>,
  match: Match,
): Show<{
  [K in keyof Match]: Match[K] extends (p: any) => p is infer R
    ? Event<R>
    : Event<S>
} & {__: Event<S>}>
export function split<S, Match extends ((p: S) => keyof any)>(config: {
  source: Unit<S>
  cases: ReturnType<Match> extends infer CaseSet
    ? Partial<Record<(CaseSet extends string ? CaseSet : never) | '__', Unit<S>>>
    : never
  match: Match
}): void
export function split<S, Match extends Unit<keyof any>>(config: {
  source: Unit<S>
  cases: Match extends Unit<infer CaseSet>
    ? Partial<Record<(CaseSet extends string ? CaseSet : never) | '__', Unit<S>>>
    : never
  match: Match
}): void

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

type UnitList<T> = ReadonlyArray<Unit<T>>
type AnyClock = Unit<any> | UnitList<any>
// type Clock<T> = Unit<T> | UnitList<NoInfer<T>>

type SourceValue<A extends Unit<unknown> | Combinable> =
  A extends Unit<unknown>
  ? UnitValue<A>
  : GetCombinedValue<A>

type BuiltInObject =
    | Error
    | Date
    | RegExp
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array
    | Float64Array
    | ReadonlyMap<unknown, unknown>
    | ReadonlySet<unknown>
    | WeakMap<object, unknown>
    | WeakSet<object>
    | ArrayBuffer
    | DataView
    | Function
    | Promise<unknown>
    | Generator

type UnitObject = Store<any> | Event<any> | Effect<any, any, any> | Unit<any>

/**
 * Force typescript to print real type instead of geneic types
 * 
 * It's better to see {a: string; b: number}
 * instead of GetCombinedValue<{a: Store<string>; b: Store<number>}>
 * */
type Show<A extends any> =
    A extends BuiltInObject
    ? A
    : A extends UnitObject
    ? A
    : {
        [K in keyof A]: A[K]
      } // & {}

/** string error message is used when target value is assignable to source type
  * because ValidTargetList works backward by checking
  * whether target is assignable to source
*/
type ReplaceGeneric<U extends Unit<unknown>, Source, Target> =
  Target extends Source
  ? 'incompatible unit in target array'
  : U extends Store<unknown>
  ? Store<Source>
  : U extends Effect<unknown, unknown, unknown>
  ? Effect<Source, unknown, unknown>
  : U extends Event<unknown>
  ? Event<Source>
  : U extends Unit<unknown>
  ? Unit<Source>
  : never

/** validates target array per element
  * and replaces incompatible types thereby showing
  * precise type error message
  * 
  * unit kind is preserved to improve message quality,
  * otherwise typescript will bloat errors with messages about fields
  * which missing in Unit but exists in Event, Store or effect
*/
type ValidTargetList<Match, Target extends Tuple<unknown>> = {
  [Index in keyof Target]: Target[Index] extends Unit<infer Value>
  ? Match extends Value
  ? Target[Index]
  : Value extends void
  ? Target[Index]
  : ReplaceGeneric<Target[Index], Match, Value>
  : 'non-unit item in target array'
}

//  NoInfer in source and in return of fn helps with
//        detecting loose objects against target type

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
// export type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
export type Source = Unit<any> | Combinable
export type Clock = Unit<any> | Tuple<Unit<any>>
export type Target = Unit<any> | Tuple<Unit<any>>
export type GetCombined<T> = {
  [K in keyof T]: T[K] extends Unit<infer U> ? U : never
}
export type GetMerged<T> = T extends ReadonlyArray<infer C>
  ? C extends Unit<infer U>
    ? IfAny<U, never, U>
    : never
  : never
type GetSource<T> = T extends Unit<infer S> ? S : GetCombined<T>
type GetClock<T> = T extends Unit<infer S> ? S : GetMerged<T>
type GetInvalidTarget<T, D> = T extends ReadonlyArray<infer U>
  ? U extends Unit<infer P>
    ? D extends P ? never : P extends void ? never : P
    : never
  : T extends Unit<infer P>
    ? D extends P ? never : P extends void ? never : P
    : never
type GetTarget<S, T> = GetInvalidTarget<T, S> extends never
  ? S
  : GetInvalidTarget<T, S>
type AnyFn = (...args: any) => any
type Fn<S, C, F extends AnyFn, T> = (source: GetSource<S>, clock: GetClock<C>) => GetTarget<ReturnType<F>, T>
type Src<S, T> = Unit<GetTarget<GetSource<S>, T>>
  // Error messages are not very useful
  |
  {
    [key: string]: GetInvalidTarget<T, GetSource<S>> extends never
      ? Store<any>
      : GetInvalidTarget<T, GetSource<S>>
  }
  // Error messages are not very useful
  |
  Tuple<
    GetInvalidTarget<T, GetSource<S>> extends never
      ? Unit<any>
      : GetInvalidTarget<T, GetSource<S>>
    >
type GetResultSouce<S> = S extends Store<any>
  ? Store<GetSource<S>>
  : Event<GetSource<S>>

type GetResult<S, C> = S extends Store<any>
  ? C extends Store<any>
    ? Store<GetSource<S>>
    : Event<GetSource<S>>
  : Event<GetSource<S>>

type GetResultFn<S, C, F extends AnyFn> = S extends Store<any>
  ? C extends Store<any>
    ? Store<ReturnType<F>>
    : Event<ReturnType<F>>
  : Event<ReturnType<F>>

/* overloads without config */
export function sample<S extends Source, C extends Clock, T extends Target, F extends Fn<S, C, F, T>>(
  source: S,
  clock: C,
  fn: F
): GetResultFn<S, C, F>
export function sample<S extends Source, C extends Clock>(source: S): GetResultSouce<S>
export function sample<S extends Source, C extends Clock>(source: S, clock?: C): GetResult<S, C>

/* overloads with config */
export function sample<S extends Source, C extends Clock, T extends Target, F extends Fn<S, C, F, T>>(config: {
  source: S,
  clock?: C,
  fn: F,
  target: T
}): T

export function sample<T extends Target, C extends Clock, S extends Src<S, T>>(config: {
  source: S,
  clock?: C,
  fn?: never
  target: T
}): T

export function sample<S extends Source, C extends Clock, T extends Target, F extends Fn<S, C, F, T>>(config: {
  source: S,
  clock?: C,
  fn: F,
  target?: never
}): GetResultFn<S, C, F>

export function sample<T extends Target, C extends Clock, S extends Src<S, T>>(config: {
  source: S,
  clock?: C,
  fn?: never
  target?: never
}): GetResult<S, C>

type ValidTargetList2<Match, Target extends Tuple<unknown>> = {
  [Index in keyof Target]: Target[Index] extends Unit<infer Value>
  ? Match extends Value
  ? Target[Index]
  : Value extends void
  ? Target[Index]
  : Unit<Match> // ReplaceGeneric<Target[Index], Match, Value>
  : never
}

export function guard<Source, Result extends Source>(config: {
  source: Unit<Source>
  clock?: AnyClock
  filter: (value: Source) => value is Result
  target?: never
}): EventAsReturnType<Result>
export function guard<Source>(config: {
  source: Unit<Source>
  clock?: AnyClock
  filter: typeof Boolean
  target?: never
}): EventAsReturnType<NonNullable<Source>>
export function guard<A>(config: {
  source: Unit<A>
  clock?: AnyClock
  filter: Store<boolean> | ((value: A) => boolean)
  target?: never
}): EventAsReturnType<A>
export function guard<Source, Result extends Source>(config: {
  source: Unit<Source>
  clock?: AnyClock
  filter: (value: Source) => value is Result
  target: Unit<Result>
}): Unit<Result>
export function guard<A extends Combinable>(config: {
  source: A
  clock?: AnyClock
  filter: (value: GetCombinedValue<A>) => boolean
  target: Unit<void>
}): Unit<void>
export function guard(config: {
  source: Combinable
  clock?: AnyClock
  filter: Store<boolean> | typeof Boolean
  target: Unit<void>
}): Unit<void>
export function guard(config: {
  source: Unit<any>
  clock?: AnyClock
  filter: typeof Boolean | Store<boolean>
  target: Unit<void>
}): Unit<void>
export function guard<A>(config: {
  source: Unit<A>
  clock?: AnyClock
  filter: (value: A) => boolean
  target: Unit<void>
}): Unit<void>
export function guard<Source>(config: {
  source: Unit<Source>
  clock?: AnyClock
  filter: typeof Boolean
  target: Unit<NonNullable<Source>>
}): Unit<NonNullable<Source>>
export function guard<A extends (Unit<unknown> | Combinable), Tar extends Tuple<unknown>>(config: {
  source: A
  clock?: AnyClock
  filter: Store<boolean> | ((value: SourceValue<A>) => boolean)
  target: ValidTargetList2<SourceValue<A>, Tar>
}): Tar
export function guard<A extends Combinable>(config: {
  source: A
  clock?: AnyClock
  filter: Store<boolean> | ((value: GetCombinedValue<A>) => boolean)
  target: Unit<GetCombinedValue<A>>
}): Unit<GetCombinedValue<A>>
export function guard<A>(config: {
  source: Unit<A>
  clock?: AnyClock
  filter: Store<boolean> | ((value: A) => boolean)
  target: Unit<A>
}): Unit<A>

export function guard<Source, Result extends Source>(
  source: Unit<Source>,
  config: {
    clock?: AnyClock
    filter: (value: Source) => value is Result
    target?: never
  },
): EventAsReturnType<Result>
export function guard<Source>(
  source: Unit<Source>,
  config: {
    clock?: AnyClock
    filter: typeof Boolean
    target?: never
  },
): EventAsReturnType<NonNullable<Source>>
export function guard<A>(
  source: Unit<A>,
  config: {
    clock?: AnyClock
    filter: Store<boolean> | ((value: A) => boolean)
    target?: never
  },
): EventAsReturnType<A>
export function guard<Source, Result extends Source>(
  source: Unit<Source>,
  config: {
    clock?: AnyClock
    filter: (value: Source) => value is Result
    target: Unit<Result>
  },
): Unit<Result>
export function guard<Source>(
  source: Unit<Source>,
  config: {
    clock?: AnyClock
    filter: typeof Boolean
    target: Unit<NonNullable<Source>>
  },
): Unit<NonNullable<Source>>
export function guard<A>(
  source: Unit<A>,
  config: {
    clock?: AnyClock
    filter: Store<boolean> | ((value: A) => boolean)
    target: Unit<A>
  },
): Unit<A>

type StoreShape = Store<any> | Combinable
type GetShapeValue<T> = T extends Store<infer S> ? S : GetCombinedValue<T>

export function attach<
  Params,
  States extends StoreShape,
  FX extends Effect<any, any, any>
>(config: {
  source: States
  effect: FX
  mapParams: (params: Params, states: GetShapeValue<States>) => NoInfer<EffectParams<FX>>
  name?: string
}): Effect<Params, EffectResult<FX>, EffectError<FX>>
export function attach<FN extends ((params: any) => any), FX extends Effect<any, any, any>>(config: {
  effect: FX
  mapParams: FN extends (...args: any[]) => NoInfer<EffectParams<FX>> 
    ? FN
    : never
  name?: string
}): FN extends (...args: infer Args) => NoInfer<EffectParams<FX>> 
  ? Effect<
    Args['length'] extends 0
      ? void
      : 0 | 1 extends Args['length']
      ? Args[0] | void
      : Args[0],
    EffectResult<FX>,
    EffectError<FX>
  >
  : never
export function attach<Params, FX extends Effect<any, any, any>>(config: {
  effect: FX
  mapParams: (params: Params) => NoInfer<EffectParams<FX>>
  name?: string
}): Effect<Params, EffectResult<FX>, EffectError<FX>>
export function attach<
  States extends StoreShape,
  FX extends Effect<GetShapeValue<States>, any, any>
>(config: {
  source: States
  effect: FX
  name?: string
}): Effect<void, EffectResult<FX>, EffectError<FX>>
export function attach<
  FX extends Effect<any, any, any>,
>(config: {
  effect: FX
}): Effect<EffectParams<FX>, EffectResult<FX>, EffectError<FX>>
export function attach<
  States extends StoreShape,
  FX extends Effect<any, any, any>,
  FN extends ((params: any, source: GetShapeValue<States>) => NoInfer<EffectParams<FX>>)
>(config: {
  source: States
  effect: FX
  mapParams: FN
  name?: string
}): Effect<Parameters<FN>[0] , EffectResult<FX>, EffectError<FX>>

export function withRegion(unit: Unit<any> | Node, cb: () => void): void
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

export interface Fork {
  getState<T>(store: Store<T>): T
}

export {Fork as Scope}

export type ValueMap = Map<Store<any>, any> | {[sid: string]: any}

/**
hydrate state on client

const root = createDomain()
hydrate(root, {
  values: window.__initialState__
})

*/
export function hydrate(domainOrScope: Domain | Fork, config: {values: ValueMap}): void

/**
serialize state on server
*/
export function serialize(
  scope: Fork,
  options?: {ignore?: Array<Store<any>>; onlyChanges?: boolean},
): {[sid: string]: any}

/** bind event to scope from .watch call */
export function scopeBind<T>(unit: Unit<T>): (payload: T) => void

export function fork(
  domain: Domain,
  config?: {
    values?: ValueMap
    handlers?: Map<Effect<any, any, any>, Function> | {[sid: string]: Function}
  },
): Fork

/** run effect or event in scope and wait for all triggered effects */
export function allSettled<FX extends Effect<any, any, any>>(
  unit: FX,
  config: {scope: Fork; params: EffectParams<FX>},
): Promise<{status: 'done', value: EffectResult<FX>} | {status: 'fail'; value: EffectError<FX>}>
export function allSettled<FX extends Effect<void, any, any>>(
  unit: FX,
  config: {scope: Fork},
): Promise<{status: 'done', value: EffectResult<FX>} | {status: 'fail'; value: EffectError<FX>}>
export function allSettled<T>(
  unit: Unit<T>,
  config: {scope: Fork; params: T},
): Promise<void>
export function allSettled(
  unit: Unit<void>,
  config: {scope: Fork},
): Promise<void>
