/**
 * This tuple type is intended for use as a generic constraint to infer concrete
 * tuple type of ANY length.
 *
 * @see https://github.com/krzkaczor/ts-essentials/blob/a4c2485bc3f37843267820ec552aa662251767bc/lib/types.ts#L169
 */
type Tuple<T = unknown> = [T] | [T, ...T[]]

/**
 * Non inferential type parameter usage. NoInfer in source and in return of fn helps with
 detecting loose objects against target type.
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
type AsyncResult<Done> = Done extends Promise<infer Async> ? Async : Done
type OptionalParams<Args extends any[]> =
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
    : Args[0]
type EffectByHandler<FN extends Function, Fail> = FN extends (...args: infer Args) => infer Done
  ? Effect<OptionalParams<Args>, AsyncResult<Done>, Fail>
  : never

export const version: string

export type kind = 'store' | 'event' | 'effect' | 'domain' | 'scope'

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

/**
 * This is a workaround for https://github.com/microsoft/TypeScript/issues/35162
 *
 * The problem was that we couldn't use guard as sample's clock parameter because
 * sample's clock-related generic inferred as `unknown` in cases when guard returned
 * `Event<T>`. This happens because `Event` has a callable signature. With `Unit<T>`
 * as the return type we won't see any problems.
 */
type EventAsReturnType<Payload> = any extends Payload ? Event<Payload> : never

export interface Event<Payload> extends Unit<Payload> {
  (payload: Payload): Payload
  (this: Payload extends void ? void : `Error: Expected 1 argument, but got 0`, payload?: Payload): void
  watch(watcher: (payload: Payload) => any): Subscription
  map<T>(fn: (payload: Payload) => T): EventAsReturnType<T>
  filter<T extends Payload>(config: {
    fn(payload: Payload): payload is T
  }): EventAsReturnType<T>
  filter(config: {fn(payload: Payload): boolean}): EventAsReturnType<Payload>
  filterMap<T>(fn: (payload: Payload) => T | undefined): EventAsReturnType<T>
  prepend<Before = void>(fn: (_: Before) => Payload): Event<Before>
  subscribe(observer: Observer<Payload>): Subscription
  /**
   * @deprecated use js pipe instead
   */
  thru<U>(fn: (event: Event<Payload>) => U): U
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
}

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
  }): EventAsReturnType<T>
  filter(config: {fn(payload: Params): boolean}): EventAsReturnType<Params>
  filterMap<T>(fn: (payload: Params) => T | undefined): EventAsReturnType<T>
  map<T>(fn: (params: Params) => T): EventAsReturnType<T>
  prepend<Before>(fn: (_: Before) => Params): Event<Before>
  subscribe(observer: Observer<Params>): Subscription
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
}
type InferValueFromTupleOfUnits<T extends Tuple<Unit<any>>> =
  T[number] extends Unit<infer R> ? R : never

export interface Store<State> extends Unit<State> {
  reset(...triggers: Array<Unit<any>>): this
  reset(triggers: Array<Unit<any>>): this
  getState(): State
  map<T>(fn: (state: State, lastState?: T) => T): Store<T>
  /**
   * @deprecated second argument of `fn` and `firstState` are deprecated, use `updateFilter` or explicit `createStore` instead
   */
  map<T>(fn: (state: State, lastState: T) => T, firstState: T): Store<T>
  on<E>(
    trigger: Unit<E>,
    reducer: (state: State, payload: E) => State | void,
  ): this
  on<E>(
    triggers: Unit<E>[],
    reducer: (state: State, payload: E) => State | void,
  ): this
  on<E extends Tuple<Unit<any>>>(
    triggers: E,
    reducer: (state: State, payload: InferValueFromTupleOfUnits<E>) => State | void,
  ): this
  off(trigger: Unit<any>): this
  subscribe(listener: Observer<State> | ((state: State) => any)): Subscription
  updates: Event<State>
  watch<E>(watcher: (state: State, payload: undefined) => any): Subscription
  watch<E>(
    trigger: Unit<E>,
    watcher: (state: State, payload: E) => any,
  ): Subscription
  /**
   * @deprecated use js pipe instead
   */
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
  scope(obj: unknown): obj is Scope
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
    hook: (newStore: InternalStore<unknown>) => any,
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
    config?: {
      name?: string
      sid?: string
      updateFilter?: (update: State, current: State) => boolean
      serialize?: 'ignore'
    },
  ): Store<State>
  createStore<State>(
    defaultState: State,
    config?: {
      name?: string
      sid?: string
      updateFilter?: (update: State, current: State) => boolean
      serialize?: 'ignore'
    },
  ): Store<State>
  sid: string | null
  compositeName: CompositeName
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
export type StateRefOp =
  | {type: 'map'; from?: StateRef; fn?: (value: any) => any}
  | {type: 'field'; from: StateRef; field: string}
  | {type: 'closure'; of: StateRef}
export type StateRef = {
  id: ID
  current: any
  type?: 'list' | 'shape'
  before?: StateRefOp[]
  noInit?: boolean
  sid?: string
}

export type Stack = {
  value: any
  a: any
  b: any
  parent?: Stack
  node: Node
  page?: any
  scope?: Scope
}

type BarrierPriorityTag = 'barrier' | 'sampler' | 'effect'

type FromValue = {
  from: 'value'
  store: any
}
type FromStore = {
  from: 'store'
  store: StateRef
}
type FromRegister = {
  from: 'a' | 'b' | 'stack'
}

type ToRegister = {
  to: 'a' | 'b' | 'stack'
}
type ToStore = {
  to: 'store'
  target: StateRef
}

type MoveCmd<Data> = {
  id: ID
  type: 'mov'
  data: Data
  order?: {
    priority: BarrierPriorityTag
    barrierID?: number
  }
}

export type Cmd =
  | Compute
  | Mov

type MovValReg = MoveCmd<FromValue & ToRegister>
type MovValStore = MoveCmd<FromValue & ToStore>
type MovStoreReg = MoveCmd<FromStore & ToRegister>
type MovStoreStore = MoveCmd<FromStore & ToStore>
type MovRegReg = MoveCmd<FromRegister & ToRegister>
type MovRegStore = MoveCmd<FromRegister & ToStore>

export type Mov =
  | MovValReg
  | MovValStore
  | MovStoreReg
  | MovStoreStore
  | MovRegReg
  | MovRegStore

export type Compute = {
  id: ID
  type: 'compute'
  data: {
    fn?: (data: any, scope: {[key: string]: any}, reg: Stack) => any
    safe: boolean
    filter: boolean
  }
  order?: {
    priority: BarrierPriorityTag
    barrierID?: number
  }
}
export type Node = {
  id: ID
  next: Array<Node>
  seq: Array<Cmd>
  scope: {[field: string]: any}
  meta: {[field: string]: any}
  family: {
    type: 'regular' | 'crosslink' | 'domain'
    links: Node[]
    owners: Node[]
  }
}

export const step: {
  compute(data: {
    fn?: (data: any, scope: {[key: string]: any}, stack: Stack) => any
    batch?: boolean
    priority?: BarrierPriorityTag | false
    safe?: boolean
    filter?: boolean
  }): Compute
  filter(data: {
    fn: (data: any, scope: {[field: string]: any}) => boolean
  }): Compute
  run(data: {fn: (data: any, scope: {[field: string]: any}) => any}): Compute
  mov(data: {
    from?: 'value' | 'store' | 'stack' | 'a' | 'b'
    to?: 'stack' | 'a' | 'b' | 'store'
    store?: StateRef
    target?: StateRef
    batch?: boolean
    priority?: BarrierPriorityTag | false
  }): Mov
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

export function merge<T>(events: ReadonlyArray<Unit<T>>): EventAsReturnType<T>
export function merge<T extends ReadonlyArray<Unit<any>>>(
  events: T,
): T[number] extends Unit<infer R> ? Event<R> : never
export function clearNode(unit: Unit<any> | Node, opts?: {deep?: boolean}): void
export function createNode(opts?: {
  node?: Array<Cmd | false | void | null>
  parent?: Array<Unit<any> | Node>
  child?: Array<Unit<any> | Node>
  scope?: {[field: string]: any}
  meta?: {[field: string]: any}
  family?: {
    type?: 'regular' | 'crosslink' | 'domain'
    owners?: Unit<any> | Node | Array<Unit<any> | Node>
    links?: Unit<any> | Node | Array<Unit<any> | Node>
  }
  regional?: boolean
}): Node
export function launch<T>(unit: Unit<T> | Node, payload: T): void
export function launch<T>(config: {
  target: Unit<T> | Node
  params: T
  defer?: boolean
  page?: any
  scope?: Scope
}): void
export function launch(config: {
  target: Array<Unit<any> | Node>
  params: any[]
  defer?: boolean
  page?: any
  scope?: Scope
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
    serialize?: 'ignore'
  },
): Store<State>
export function setStoreName<State>(store: Store<State>, name: string): void

/**
 * @deprecated use combine() instead
 */
export function createStoreObject<State>(
  defaultState: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>

export function split<
  S,
  Match extends {[name: string]: ((payload: S) => boolean) | Store<boolean>},
  T extends Target = Target
>(config: {
  source: Unit<S>
  match: Match
  cases: Partial<
    {
      [K in keyof Match]: Match[K] extends (p: any) => p is infer R
      ? MultiTarget<T, R>
      : MultiTarget<T, S>
    } & {__: MultiTarget<T, S>}
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
export function split<
  S,
  K extends keyof any,
  T extends Target = Target
>(config: {
  source: Unit<S>
  match: (p: S) => K
  cases: Partial<{[X in K]: MultiTarget<T, S>} & {__: MultiTarget<T, S>}>
}): void
export function split<
  S,
  K extends keyof any,
  T extends Target = Target
>(config: {
  source: Unit<S>
  match: Unit<K>
  cases: Partial<{[X in K]: MultiTarget<T, S>} & {__: MultiTarget<T, S>}>
}): void

export function createApi<
  S,
  Api extends {[name: string]: ((store: S, e: any) => (S | void))}
>(
  store: Store<S>,
  api: Api,
): {
  [K in keyof Api]: ((store: S, e: void) => (S | void)) extends Api[K]
    ? Event<void>
    : Api[K] extends ((store: S) => (S | void))
    ? Event<void>
    : Api[K] extends ((store: S, e: infer E) => (S | void))
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

type AnyClock = Unit<any> | Tuple<Unit<any>>

type ClockBound = Unit<unknown> | Tuple<unknown>
type ClockValue<Clk extends ClockBound> =
  Clk extends Unit<infer Value>
  ? Value
  : Clk extends Tuple<infer U>
  ? U extends Unit<infer V>
  ? V
  : never
  : never

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

/* sample types */
type TupleObject<T extends Array<any>> = {
  [I in Exclude<keyof T, keyof any[]>]: T[I]
}

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;
type IfUnknown<T, Y, N> = 0 extends (1 & T) ? N : unknown extends T ? Y : N;
type IfAssignable<T, U, Y, N> =
  (<G>() => IfAny<T & U, 0, G extends T ? 1 : 2>) extends
    (<G>() => IfAny<T & U, 0, G extends U ? 1 : 2>)
    ? Y
    : (T extends U ? never : 1) extends never
      ? Y
      : T extends Array<any>
        ? number extends T['length']
          ? N
          : U extends Array<any>
            ? number extends U['length']
              ? N
              : TupleObject<T> extends TupleObject<U> ? Y : N
            : N
        : N

type SourceNotConfig<A> = Unit<A> | Tuple<Store<any>>
type Source<A> = Unit<A> | Combinable
type Clock<B> = Unit<B> | Tuple<Unit<any>>
type Target = Unit<any> | Tuple<any>

type GetTupleWithoutAny<T> = T extends Array<infer U>
  ? U extends Unit<infer Value>
    ? IfAny<Value, never, Value>
    : never
  : never

type GetMergedValue<T> = GetTupleWithoutAny<T> extends never ? any : GetTupleWithoutAny<T>

type GetSource<S> = S extends Unit<infer Value> ? Value : GetCombinedValue<S>
type GetClock<C> = C extends Unit<infer Value> ? Value : GetMergedValue<C>

type AnyFn = (...args: any) => any

type GetResultS<S> = S extends Store<any> | Combinable
  ? Store<GetSource<S>>
  : Event<GetSource<S>>

type GetResultC<C> = C extends Store<any>
  ? Store<GetClock<C>>
  : Event<GetClock<C>>

type GetResultSR<S, R> = S extends Store<any> | Combinable
  ? Store<R>
  : Event<R>

type GetResultCR<C, R> = C extends Store<any>
  ? Store<R>
  : Event<R>

type GetResultSC<S, C> = S extends Store<any> | Combinable
  ? C extends Store<any>
    ? Store<GetSource<S>>
    : Event<GetSource<S>>
  : Event<GetSource<S>>

type GetResultSCR<S, C, R> = S extends Store<any> | Combinable
  ? C extends Store<any>
    ? Store<R>
    : Event<R>
  : Event<R>

/** Replaces incompatible unit type with string error message.
 *  There is no error message if target type is void.
 */
type ReplaceUnit<Target, Result, Value> = IfAssignable<Result, Value,
  Target,
  Value extends void
    ? Target
    : 'incompatible unit in target'
>

// [...T] is used to show sample result as a tuple (not array)
type TargetTuple<Target extends Array<unknown>, Result> = [...{
  [Index in keyof Target]: Target[Index] extends Unit<infer Value>
    ? ReplaceUnit<Target[Index], Result, Value>
    : 'non-unit item in target'
}]

type MultiTarget<Target, Result> = Target extends Unit<infer Value>
  ? ReplaceUnit<Target, Result, Value>
  : Target extends Tuple<unknown>
    ? TargetTuple<Target, Result>
    : 'non-unit item in target'

/*
* Sample generics:
* A - source value
* B - clock value
* R - fn result
*/

// sample with target
// SCFT
export function sample<A = any, B = any, R = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(config: {
  source: S,
  clock: C,
  fn: (source: GetSource<S>, clock: GetClock<C>) => R,
  target: MultiTarget<T, R>,
  name?: string,
  greedy?: boolean
}): T
// SFT
export function sample<A = any, R = any,
  S extends Source<A> = Source<A>,
  T extends Target = Target
>(config: {
  source: S,
  fn: (source: GetSource<S>) => R,
  target: MultiTarget<T, R>,
  name?: string,
  greedy?: boolean
}): T
// СFT
export function sample<B = any, R = any,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(config: {
  clock: C,
  fn: (clock: GetClock<C>) => R,
  target: MultiTarget<T, R>,
  name?: string,
  greedy?: boolean
}): T
// SСT
export function sample<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(config: {
  source: S,
  clock: C,
  target: MultiTarget<T, GetSource<S>>,
  name?: string,
  greedy?: boolean
}): T
// ST
export function sample<A = any,
  S extends Source<A> = Source<A>,
  T extends Target = Target
>(config: {
  source: S,
  target: MultiTarget<T, GetSource<S>>,
  name?: string,
  greedy?: boolean
}): T
// СT
export function sample<B = any,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(config: {
  clock: C,
  target: MultiTarget<T, GetClock<C>>,
  name?: string,
  greedy?: boolean
}): T

// sample without target
// SCF
export function sample<A = any, B = any, R = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
>(config: {
  source: S,
  clock: C,
  fn: (source: GetSource<S>, clock: GetClock<C>) => R,
  name?: string,
  greedy?: boolean
}): GetResultSCR<S, C, R>
// SF
export function sample<A = any, R = any,
  S extends Source<A> = Source<A>,
>(config: {
  source: S,
  fn: (source: GetSource<S>) => R,
  name?: string,
  greedy?: boolean
}): GetResultSR<S, R>
// CF
export function sample<B = any, R = any,
  C extends Clock<B> = Clock<B>,
>(config: {
  clock: C,
  fn: (clock: GetClock<C>) => R,
  name?: string,
  greedy?: boolean
}): GetResultCR<C, R>
// SC
export function sample<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>
>(config: {
  source: S,
  clock: C,
  name?: string,
  greedy?: boolean
}): GetResultSC<S, C>
// S
export function sample<A = any,
  S extends Source<A> = Source<A>
>(config: {
  source: S,
  name?: string,
  greedy?: boolean
}): GetResultS<S>
// C
export function sample<B = any,
  C extends Clock<B> = Clock<B>
>(config: {
  clock: C,
  name?: string,
  greedy?: boolean
}): GetResultC<C>

// sample without config
export function sample<A = any, B = any, R = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
>(source: S, clock: C, fn: (source: GetSource<S>, clock: GetClock<C>) => R)
  : GetResultSCR<S, C, R>
export function sample<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>
>(source: S, clock: C): GetResultSC<S, C>
export function sample<A = any,
  S extends SourceNotConfig<A> = SourceNotConfig<A>
>(source: S): GetResultS<S>

// sample's last overload (for readable error messages)
export function sample<
  S extends Source<unknown>,
  C extends Clock<unknown>,
  F extends IfUnknown<UnitValue<S>,
    (clock: GetClock<C>) => unknown,
    IfUnknown<UnitValue<C>,
      (source: GetSource<S>) => unknown,
      (source: GetSource<S>, clock: GetClock<C>) => unknown
    >
  >,
  T extends Target
>(config: {
  source?: S,
  clock?: C,
  fn?: F,
  target: MultiTarget<T,
    IfUnknown<ReturnType<F>,
      IfUnknown<UnitValue<S>, GetClock<C>, GetSource<S>>,
      ReturnType<F>
    >
  >,
  name?: string,
  greedy?: boolean
}): T

/* guard types */

type NonFalsy<T> = T extends null | undefined | false | 0 | 0n | "" ? never : T;

type GuardFilterSC<S, C> =
  | ((source: GetSource<S>, clock: GetClock<C>) => boolean)
  | Store<boolean>
type GuardFilterS<S> =
  | ((source: GetSource<S>) => boolean)
  | Store<boolean>
type GuardFilterC<C> =
  | ((clock: GetClock<C>) => boolean)
  | Store<boolean>

type GuardResult<Value> = EventAsReturnType<Value>

type GetGuardSource<S, F> = F extends BooleanConstructor
  ? NonFalsy<GetSource<S>>
  : GetSource<S>
type GetGuardClock<C, F> = F extends BooleanConstructor
  ? NonFalsy<GetClock<C>>
  : GetClock<C>

// ---------------------------------------
/* user-defined typeguard: with target */
// SСT
export function guard<A, X extends GetSource<S>, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(config: {
  source: S,
  clock: C,
  filter: (source: GetSource<S>, clock: GetClock<C>) => source is X,
  target: MultiTarget<T, X>,
  name?: string,
  greedy?: boolean
}): T
// ST
export function guard<A, X extends GetSource<S>,
  S extends Source<A> = Source<A>,
  T extends Target = Target
>(config: {
  source: S,
  filter: (source: GetSource<S>) => source is X,
  target: MultiTarget<T, X>,
  name?: string,
  greedy?: boolean
}): T
// СT
export function guard<B, X extends GetClock<C>,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(config: {
  clock: C,
  filter: (clock: GetClock<C>) => clock is X,
  target: MultiTarget<T, X>,
  name?: string,
  greedy?: boolean
}): T

/* user-defined typeguard: without target */
// SC
export function guard<A, X extends GetSource<S>, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>
>(config: {
  source: S,
  clock: C,
  filter: (source: GetSource<S>, clock: GetClock<C>) => source is X,
  name?: string,
  greedy?: boolean
}): GuardResult<X>
// S
export function guard<A, X extends GetSource<S>,
  S extends Source<A> = Source<A>
>(config: {
  source: S,
  filter: (source: GetSource<S>) => source is X,
  name?: string,
  greedy?: boolean
}): GuardResult<X>
// C
export function guard<B, X extends GetClock<C>,
  C extends Clock<B> = Clock<B>
>(config: {
  clock: C,
  filter: (clock: GetClock<C>) => clock is X,
  name?: string,
  greedy?: boolean
}): GuardResult<X>

// ---------------------------------------
/* boolean fn or store: with target */
// SСT
export function guard<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  F extends GuardFilterSC<S, C> = GuardFilterSC<S, C>,
  T extends Target = Target
>(config: {
  source: S,
  clock: C,
  filter: F,
  target: MultiTarget<T, GetGuardSource<S, F>>,
  name?: string,
  greedy?: boolean
}): T
// ST
export function guard<A = any,
  S extends Source<A> = Source<A>,
  F extends GuardFilterS<S> = GuardFilterS<S>,
  T extends Target = Target
>(config: {
  source: S,
  filter: F,
  target: MultiTarget<T, GetGuardSource<S, F>>,
  name?: string,
  greedy?: boolean
}): T
// СT
export function guard<B = any,
  C extends Clock<B> = Clock<B>,
  F extends GuardFilterC<C> = GuardFilterC<C>,
  T extends Target = Target
>(config: {
  clock: C,
  filter: F,
  target: MultiTarget<T, GetGuardClock<C, F>>,
  name?: string,
  greedy?: boolean
}): T

/* boolean fn or store: without target */
// SC (units: BooleanConstructor)
export function guard<A = any, B = any>(config: {
  source: Unit<A>,
  clock: Unit<B>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// SC (units: boolean fn or store)
export function guard<A = any, B = any>(config: {
  source: Unit<A>,
  clock: Unit<B>,
  filter: ((source: A, clock: B) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// SC
export function guard<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  F extends GuardFilterSC<S, C> = GuardFilterSC<S, C>,
>(config: {
  source: S,
  clock: C,
  filter: F,
  name?: string,
  greedy?: boolean
}): GuardResult<GetGuardSource<S, F>>
// S (unit: BooleanConstructor)
export function guard<A = any>(config: {
  source: Unit<A>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// S (unit - boolean fn or store)
export function guard<A = any>(config: {
  source: Unit<A>,
  filter: ((source: A) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// S
export function guard<A = any,
  S extends Source<A> = Source<A>,
  F extends GuardFilterS<S> = GuardFilterS<S>,
>(config: {
  source: S,
  filter: F,
  name?: string,
  greedy?: boolean
}): GuardResult<GetGuardSource<S, F>>
// C (unit: boolean fn or store)
export function guard<B = any>(config: {
  clock: Unit<B>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<B>>
// C (unit: boolean fn or store)
export function guard<B = any>(config: {
  clock: Unit<B>,
  filter: ((clock: B) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<B>
// C
export function guard<B = any,
  C extends Clock<B> = Clock<B>,
  F extends GuardFilterC<C> = GuardFilterC<C>,
>(config: {
  clock: C,
  filter: F,
  name?: string,
  greedy?: boolean
}): GuardResult<GetGuardClock<C, F>>

// ---------------------------------------
// guard with source param
// ---------------------------------------

/* user-defined typeguard: with target */
// SСT
export function guard<A, X extends GetSource<S>, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  T extends Target = Target
>(source: S, config: {
  clock: C,
  filter: (source: GetSource<S>, clock: GetClock<C>) => source is X,
  target: MultiTarget<T, X>,
  name?: string,
  greedy?: boolean
}): T
// ST
export function guard<A, X extends GetSource<S>,
  S extends Source<A> = Source<A>,
  T extends Target = Target
>(source: S, config: {
  filter: (source: GetSource<S>) => source is X,
  target: MultiTarget<T, X>,
  name?: string,
  greedy?: boolean
}): T

/* user-defined typeguard: without target */
// SC
export function guard<A, X extends GetSource<S>, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>
>(source: S, config: {
  clock: C,
  filter: (source: GetSource<S>, clock: GetClock<C>) => source is X,
  name?: string,
  greedy?: boolean
}): GuardResult<X>
// S
export function guard<A, X extends GetSource<S>,
  S extends Source<A> = Source<A>
>(source: S, config: {
  filter: (source: GetSource<S>) => source is X,
  name?: string,
  greedy?: boolean
}): GuardResult<X>

// ---------------------------------------
/* boolean fn or store: with target */
// SСT
export function guard<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  F extends GuardFilterSC<S, C> = GuardFilterSC<S, C>,
  T extends Target = Target
>(source: S, config: {
  clock: C,
  filter: F,
  target: MultiTarget<T, GetGuardSource<S, F>>,
  name?: string,
  greedy?: boolean
}): T
// ST
export function guard<A = any,
  S extends Source<A> = Source<A>,
  F extends GuardFilterS<S> = GuardFilterS<S>,
  T extends Target = Target
>(source: S, config: {
  filter: F,
  target: MultiTarget<T, GetGuardSource<S, F>>,
  name?: string,
  greedy?: boolean
}): T

/* boolean fn or store: without target */
// SC (units: BooleanConstructor)
export function guard<A = any, B = any>(source: Unit<A>, config: {
  clock: Unit<B>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// SC (units: boolean fn or store)
export function guard<A = any, B = any>(source: Unit<A>, config: {
  clock: Unit<B>,
  filter: ((source: A, clock: B) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// SC
export function guard<A = any, B = any,
  S extends Source<A> = Source<A>,
  C extends Clock<B> = Clock<B>,
  F extends GuardFilterSC<S, C> = GuardFilterSC<S, C>,
>(source: S, config: {
  clock: C,
  filter: F,
  name?: string,
  greedy?: boolean
}): GuardResult<GetGuardSource<S, F>>
// S (unit: BooleanConstructor)
export function guard<A = any>(source: Unit<A>, config: {
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// S (unit: boolean fn or store)
export function guard<A = any>(source: Unit<A>, config: {
  filter: ((source: A) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// S
export function guard<A = any,
  S extends Source<A> = Source<A>,
  F extends GuardFilterS<S> = GuardFilterS<S>,
>(source: S, config: {
  filter: F,
  name?: string,
  greedy?: boolean
}): GuardResult<GetGuardSource<S, F>>

// guard's last overload for `guard(source, config)`
export function guard<
  S extends Source<unknown>,
  C extends Clock<unknown>,
  F extends IfUnknown<UnitValue<S>,
    Store<boolean> | ((clock: GetClock<C>) => boolean),
    IfUnknown<UnitValue<C>,
      Store<boolean> | ((source: GetSource<S>) => boolean),
      Store<boolean> | ((source: GetSource<S>, clock: GetClock<C>) => boolean)
      >
    >,
  T extends Target
>(source: S, config: {
  clock?: C,
  filter: F,
  target: F extends (value: any, ...args: any) => value is infer X
    ? MultiTarget<T, X>
    : MultiTarget<T, GetGuardSource<S, F>>,
  name?: string,
  greedy?: boolean
}): T

// guard's last overload for `guard(config)`
export function guard<
  S extends Source<unknown>,
  C extends Clock<unknown>,
  F extends IfUnknown<UnitValue<S>,
    Store<boolean> | ((clock: GetClock<C>) => boolean),
    IfUnknown<UnitValue<C>,
      Store<boolean> | ((source: GetSource<S>) => boolean),
      Store<boolean> | ((source: GetSource<S>, clock: GetClock<C>) => boolean)
      >
    >,
  T extends Target
>(config: {
  source?: S,
  clock?: C,
  filter: F,
  target: F extends (value: any, ...args: any) => value is infer X
    ? MultiTarget<T, X>
    : MultiTarget<T,
        IfUnknown<UnitValue<S>,
          GetGuardClock<C, F>,
          GetGuardSource<S, F>
        >
      >,
  name?: string,
  greedy?: boolean
}): T

/* attach types */

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
  States extends StoreShape,
  FX extends (state: GetShapeValue<States>, params: any) => any
>(config: {
  source: States
  effect: FX
  name?: string
}): FX extends (source: any, ...args: infer Args) => infer Done
  ? Effect<OptionalParams<Args>, AsyncResult<Done>>
  : never
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

type UnionToStoresUnion<T> = (T extends never
  ? never
  : () => T) extends infer U
    ? U extends () => infer S
      ? UnionToStoresUnion<Exclude<T, S>> | Store<S>
      : never
    : never

type CombineState<State> = State[keyof State] extends Store<any>
  // ensure that CombineState will be used only with explicit generics
  // without Store type in them
  ? never
  : {
    [K in keyof State]:
      | State[K]
      | (undefined extends State[K]
        ? Store<Exclude<State[K], undefined>>
        : Store<State[K]>)
      // probably not needed
      // as CombineState isn't dealing with implicit generics anymore
      | UnionToStoresUnion<Exclude<State[K], undefined>>
}

export function withRegion(unit: Unit<any> | Node, cb: () => void): void
export function combine<T extends Store<any>>(
  store: T,
): T extends Store<infer R> ? Store<[R]> : never
export function combine<State extends Tuple>(
  shape: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
export function combine<State>(shape: CombineState<State>): Store<State>
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

export interface Scope extends Unit<any> {
  getState<T>(store: Store<T>): T
}

export type ValueMap = Map<Store<any>, any> | Array<[Store<any>, any]> | {[sid: string]: any}

/**
hydrate state on client

const root = createDomain()
hydrate(root, {
  values: window.__initialState__
})

*/
export function hydrate(domainOrScope: Domain | Scope, config: {values: ValueMap}): void

/**
serialize state on server
*/
export function serialize(
  scope: Scope,
  options?: {ignore?: Array<Store<any>>; onlyChanges?: boolean},
): {[sid: string]: any}

/** bind event to scope from .watch call */
export function scopeBind<T>(unit: Event<T>, opts?: {scope: Scope}): (payload: T) => void
export function scopeBind<P, D>(unit: Effect<P, D>, opts?: {scope: Scope}): (params: P) => Promise<D>

export function fork(
  domain: Domain,
  config?: {
    values?: ValueMap
    handlers?: Map<Effect<any, any, any>, Function> | Array<[Effect<any, any>, Function]> | {[sid: string]: Function}
  },
): Scope
export function fork(
  config?: {
    values?: ValueMap
    handlers?: Map<Effect<any, any, any>, Function> | Array<[Effect<any, any>, Function]> | {[sid: string]: Function}
  },
): Scope

/** run effect or event in scope and wait for all triggered effects */
export function allSettled<FX extends Effect<any, any, any>>(
  unit: FX,
  config: {scope: Scope; params: EffectParams<FX>},
): Promise<{status: 'done', value: EffectResult<FX>} | {status: 'fail'; value: EffectError<FX>}>
export function allSettled<FX extends Effect<void, any, any>>(
  unit: FX,
  config: {scope: Scope},
): Promise<{status: 'done', value: EffectResult<FX>} | {status: 'fail'; value: EffectError<FX>}>
export function allSettled<T>(
  unit: Unit<T>,
  config: {scope: Scope; params: T},
): Promise<void>
export function allSettled(
  unit: Unit<void>,
  config: {scope: Scope},
): Promise<void>
