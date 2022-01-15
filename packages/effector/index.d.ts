/**
 * This tuple type is intended for use as a generic constraint to infer concrete
 * tuple type of ANY length.
 *
 * @see https://github.com/krzkaczor/ts-essentials/blob/a4c2485bc3f37843267820ec552aa662251767bc/lib/types.ts#L169
 */
type Tuple<T = unknown> = [T?, ...T[]]

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

/**
 * Function you can subscribe to.
 * It can be an intention to change the store, indication of something happening in the application, a command to be executed, aggregated analytics trigger and so on
 */
export interface Event<Payload> extends Unit<Payload> {
  (payload: Payload): Payload
   (this: IfUnknown<Payload, void, Payload extends void ? void : `Error: Expected 1 argument, but got 0`>, payload?: Payload): void
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

/**
 * Container for (possibly async) side effects
 */
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

/**
 * A way to group and process events, stores and effects. Useful for logging and assigning a reset trigger to many effects.
 * Domain is notified via onCreateEvent, onCreateStore, onCreateEffect, onCreateDomain methods when events, stores, effects, or nested domains are created
 */
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
    pure: boolean
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
    pure?: boolean
  }): Compute
  filter(data: {
    fn: (data: any, scope: {[field: string]: any}, stack: Stack) => boolean
    pure?: boolean
  }): Compute
  run(data: {fn: (data: any, scope: {[field: string]: any}, stack: Stack) => any}): Compute
  mov(data: {
    from?: 'value' | 'store' | 'stack' | 'a' | 'b'
    to?: 'stack' | 'a' | 'b' | 'store'
    store?: StateRef
    target?: StateRef
    batch?: boolean
    priority?: BarrierPriorityTag | false
  }): Mov
}

/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
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
/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
export function forward(opts: {
  from: Unit<any>
  to: ReadonlyArray<Unit<void>>
}): Subscription
/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
export function forward(opts: {
  from: ReadonlyArray<Unit<any>>
  to: ReadonlyArray<Unit<void>>
}): Subscription
/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
export function forward(opts: {
  from: ReadonlyArray<Unit<any>>
  to: Unit<void>
}): Subscription
/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
export function forward<To, From extends To>(opts: {
  from: ReadonlyArray<Unit<From>>
  to: Unit<To> | ReadonlyArray<Unit<To>>
}): Subscription
// Allow `* -> void` forwarding (e.g. `string -> void`).
/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
export function forward(opts: {from: Unit<any>; to: Unit<void>}): Subscription
// Do not remove the signature below to avoid breaking change!
/**
 * Method to create connection between units in a declarative way. Sends updates from one set of units to another
 */
export function forward<To, From extends To>(opts: {
  from: Unit<From>
  to: Unit<To> | ReadonlyArray<Unit<To>>
}): Subscription

/**
 * Merges array of units (events, effects or stores), returns a new event, which fires upon trigger of any of given units
 * @param units array of units to be merged
 */
export function merge<T>(units: ReadonlyArray<Unit<T>>): EventAsReturnType<T>
/**
 * Merges array of units (events, effects or stores), returns a new event, which fires upon trigger of any of given units
 * @param units array of units to be merged
 */
export function merge<T extends ReadonlyArray<Unit<any>>>(
  units: T,
): T[number] extends Unit<infer R> ? Event<R> : never
/**
 * Method for destroying units and graph nodes. Low level tool, usually absent in common applications
 * @param unit unit to be erased
 * @param opts optional configuration object
 */
export function clearNode(unit: Unit<any> | Node, opts?: {deep?: boolean}): void
/**
 * Method to create a new graph node. Low level tool, usually absent in common applications
 */
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
/**
 * Allows to directly start computation from given unit or graph node. Low level tool, usually absent in common applications
 * @param unit unit or graph node to launch
 * @param payload data to pass to computation
 */
export function launch<T>(unit: Unit<T> | Node, payload: T): void
/**
 * Allows to directly start computation from given unit or graph node. Low level tool, usually absent in common applications
 * @param config configuration object
 */
export function launch<T>(config: {
  target: Unit<T> | Node
  params: T
  defer?: boolean
  page?: any
  scope?: Scope
}): void
/**
 * Allows to directly start computation from given unit or graph node. Low level tool, usually absent in common applications
 * @param config configuration object
 */
export function launch(config: {
  target: Array<Unit<any> | Node>
  params: any[]
  defer?: boolean
  page?: any
  scope?: Scope
}): void

/**
 * Method to create an event subscribed to given observable
 * @param observable object with `subscribe` method, e.g. rxjs stream or redux store
 */
export function fromObservable<T>(observable: unknown): Event<T>
/**
 * Creates an event
 */
export function createEvent<E = void>(eventName?: string): Event<E>
/**
 * Creates an event
 */
export function createEvent<E = void>(config: {
  name?: string
  sid?: string
}): Event<E>

/**
 * Creates an effect
 * @param handler function to handle effect calls
 */
export function createEffect<FN extends Function>(handler: FN): EffectByHandler<FN, Error>
/**
 * Creates an effect
 * @param handler function to handle effect calls
 */
export function createEffect<Params, Done, Fail = Error>(
  handler: (params: Params) => Done | Promise<Done>,
): Effect<Params, Done, Fail>
/**
 * Creates an effect
 * @param handler function to handle effect calls
 */
export function createEffect<FN extends Function, Fail>(handler: FN): EffectByHandler<FN, Fail>
/**
 * Creates an effect
 */
export function createEffect<FN extends Function>(name: string, config: {
  handler: FN
  sid?: string
}): EffectByHandler<FN, Error>
/**
 * Creates an effect
 */
export function createEffect<Params, Done, Fail = Error>(
  effectName?: string,
  config?: {
    handler?: (params: Params) => Promise<Done> | Done
    sid?: string
  },
): Effect<Params, Done, Fail>
/**
 * Creates an effect
 */
export function createEffect<FN extends Function>(config: {
  name?: string
  handler: FN
  sid?: string
}): EffectByHandler<FN, Error>
/**
 * Creates an effect
 */
export function createEffect<Params, Done, Fail = Error>(config: {
  name?: string
  handler?: (params: Params) => Promise<Done> | Done
  sid?: string
}): Effect<Params, Done, Fail>

/**
 * Creates a store
 * @param defaultState default state
 * @param config optional configuration object
 */
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

/**
 * Chooses one of the cases by given conditions. It "splits" source unit into several events, which fires when payload matches their conditions.
 * Works like pattern matching for payload values and external stores
 * @param source unit which will trigger computation in split
 * @param match object with matching functions which allows to trigger one of created events
 */
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

type SplitType<
  Cases extends CaseRecord,
  Match,
  Config,
  Source extends Unit<any>,
> =
  UnitValue<Source> extends CaseTypeReader<Cases, keyof Cases>
    ?
      Match extends Unit<any>
      ? Exclude<keyof Cases, '__'> extends UnitValue<Match>
        ? Config
        : {
          error: 'match unit should contain case names'
          need: Exclude<keyof Cases, '__'>
          got: UnitValue<Match>
        }

      : Match extends (p: UnitValue<Source>) => void
        ? Exclude<keyof Cases, '__'> extends ReturnType<Match>
          ? Config
          : {
            error: 'match function should return case names'
            need: Exclude<keyof Cases, '__'>
            got: ReturnType<Match>
          }

      : Match extends Record<string, ((p: UnitValue<Source>) => boolean) | Store<boolean>>
        ? Exclude<keyof Cases, '__'> extends keyof Match
          ? MatcherInferenceValidator<Cases, Match> extends Match
            ? Config
            : {
              error: 'case should extends type inferred by matcher function'
              incorrectCases: Show<MatcherInferenceIncorrectCases<Cases, Match>>
            }
          : {
            error: 'match object should contain case names'
            need: Exclude<keyof Cases, '__'>
            got: keyof Match
          }

      : {error: 'not implemented'}

  : {
    error: 'source type should extends cases'
    sourceType: UnitValue<Source>
    caseType: CaseTypeReader<Cases, keyof Cases>
  }

/**
 * Chooses one of cases by given conditions. It "splits" source unit into several targets, which fires when payload matches their conditions.
 * Works like pattern matching for payload values and external units
 */
export function split<
  Cases,
  Source,
  Match extends (
    | Unit<any>
    | ((p: UnitValue<Source>) => void)
    | Record<string, ((p: UnitValue<Source>) => boolean) | Store<boolean>>
  ),
  Clock,
>(
  config:
    {source: Source; match: Match; cases: Cases; clock: Clock} extends infer Config
    ?
      Config extends {cases: CaseRecord; match: any; source: Unit<any>; clock: Unit<any> | Array<Unit<any>>}
        ? Source extends Unit<any>
          ? Cases extends CaseRecord
            ? Clock extends Unit<any> | Array<Unit<any>>
              ? SplitType<Cases, Match, {source: Source; match: Match; cases: Cases; clock: Clock}, Source>
              : {error: 'clock should be a unit or array of units'; got: Clock}
            : {error: 'cases should be an object with units or arrays of units'; got: Cases}
          : {error: 'source should be a unit'; got: Source}

      : Config extends {cases: CaseRecord; match: any; source: Unit<any>}
        ? Source extends Unit<any>
          ? Cases extends CaseRecord
            ? SplitType<Cases, Match, {source: Source; match: Match; cases: Cases}, Source>
            : {error: 'cases should be an object with units or arrays of units'; got: Cases}
          : {error: 'source should be a unit'; got: Source}

      : {error: 'config should be object with fields "source", "match" and "cases"'; got: Config}

    : {error: 'cannot infer config object'}
): void

type CaseRecord = Record<string,  Unit<any> | Array<Unit<any>>>

type MatcherInferenceIncorrectCases<Cases, Match> = {
  [K in Exclude<keyof Match, keyof MatcherInferenceValidator<Cases, Match>>]: {
    caseType: CaseValue<Cases, Match, K>
    inferredType: Match[K] extends (p: any) => p is infer R ? R : never
  }
}

type MatcherInferenceValidator<Cases, Match> = {
  [
    K in keyof Match as
      Match[K] extends (p: any) => p is infer R
      ? R extends CaseValue<Cases, Match, K>
        ? K
        : never
      : K
  ]: Match[K]
}

type CaseTypeReader<Cases, K extends keyof Cases> =
  Cases[K] extends infer S
  ? WhichType<
    UnitValue<
      S extends Array<any>
      ? S[number]
      : S
    >
  > extends 'void'
    ? unknown
    : UnitValue<
      S extends Array<any>
      ? S[number]
      : S
    >
  : never

type CaseValue<Cases, Match, K extends keyof Match> =
  K extends keyof Cases
  ? CaseTypeReader<Cases, K>
  : never

/**
 * Shorthand for creating events attached to store by providing object with reducers for them
 * @param store target store
 * @param api object with reducers
 */
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

/**
 * Creates a Store out of successful results of Effect.
 * It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`
 * @param effect source effect
 * @param defaultState initial state of new store
 */
export function restore<Done>(
  effect: Effect<any, Done, any>,
  defaultState: Done,
): Store<Done>
/**
 * Creates a Store out of successful results of Effect.
 * It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`
 * @param effect source effect
 * @param defaultState initial state of new store
 */
export function restore<Done>(
  effect: Effect<any, Done, any>,
  defaultState: null,
): Store<Done | null>
/**
 * Creates a Store from Event.
 * It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`
 * @param event source event
 * @param defaultState initial state of new store
 */
export function restore<E>(event: Event<E>, defaultState: E): Store<E>
/**
 * Creates a Store from Event.
 * It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`
 * @param event source event
 * @param defaultState initial state of new store
 */
export function restore<E>(event: Event<E>, defaultState: null): Store<E | null>
export function restore<State extends {[key: string]: Store<any> | any}>(
  state: State,
): {
  [K in keyof State]: State[K] extends Store<infer S>
    ? Store<S>
    : Store<State[K]>
}

/**
 * Creates a domain
 */
export function createDomain(domainName?: string): Domain

type WhichTypeKind =
  | 'never'
  | 'any'
  | 'unknown'
  | 'void'
  | 'undefined'
  | 'value'
type NotType<T extends WhichTypeKind> = Exclude<WhichTypeKind, T>
type WhichType<T> = [T] extends [never]
  ? 'never'
  : [unknown] extends [T]
  ? [0] extends [1 & T]
    ? 'any'
    : 'unknown'
  : [T] extends [void]
  ? [void] extends [T]
    ? 'void'
    : 'undefined'
  : 'value'

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

type SampleImpl<
  Target,
  Source,
  Clock,
  FLBool,
  FilterFun,
  FN,
  FNInf,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? TypeOfSource<Source>
      : never
    ),
  FNInfClock extends (
    Clock extends Units
      ? TypeOfClock<Clock>
      : never
    ),
  FNAltArg,
  FLUnit,
  SomeFN,
> =
  // no target
  unknown extends Target
    // no target, no source
  ? unknown extends Source
    ? unknown extends Clock
      ? [message: {error: 'either target, clock or source should exists'}]
        // no target, no source, has clock
      : Clock extends Units
        ? SampleFilterDef<
            ModeSelector<
              'clock |        | filter | fn |       ',
              'clock |        | filter |    |       ',
              'clock |        |        | fn |       ',
              'clock |        |        |    |       ',
              SomeFN
            >,
            Source, Clock, FLUnit, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, SomeFN
          >
        : [message: {error: 'clock should be unit or array of units'; got: Clock}]
      // no target, has source
    : Source extends Unit<any> | SourceRecord
        // no target, has source, no clock
      ? unknown extends Clock
        ? SampleFilterDef<
            ModeSelector<
              '      | source | filter | fn |       ',
              '      | source | filter |    |       ',
              '      | source |        | fn |       ',
              '      | source |        |    |       ',
              SomeFN
            >,
            Source, Clock, FLUnit, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, SomeFN
          >
          // no target, has source, has clock
        : Clock extends Units
          ? SampleFilterDef<
              ModeSelector<
                'clock | source | filter | fn |       ',
                'clock | source | filter |    |       ',
                'clock | source |        | fn |       ',
                'clock | source |        |    |       ',
                SomeFN
              >,
              Source, Clock, FLUnit, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, SomeFN
            >
          : [message: {error: 'clock should be unit or array of units'; got: Clock}]
      : [message: {error: 'source should be unit or object with stores'; got: Source}]
  // has target
  : Target extends Units | ReadonlyArray<Unit<any>>
      // has target, no source
    ? unknown extends Source
      ? unknown extends Clock
        ? [message: {error: 'either target, clock or source should exists'}]
          // has target, no source, has clock
        : Clock extends Units
          ? SampleFilterTargetDef<
              ModeSelector<
                'clock |        | filter | fn | target',
                'clock |        | filter |    | target',
                'clock |        |        | fn | target',
                'clock |        |        |    | target',
                SomeFN
              >,
              Target, Source, Clock, FLUnit, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, SomeFN
            >
          : [message: {error: 'clock should be unit or array of units'; got: Clock}]
        // has target, has source
      : Source extends Unit<any> | SourceRecord
        // has target, has source, no clock
        ? unknown extends Clock
          ? SampleFilterTargetDef<
              ModeSelector<
                '      | source | filter | fn | target',
                '      | source | filter |    | target',
                '      | source |        | fn | target',
                '      | source |        |    | target',
                SomeFN
              >,
              Target, Source, Clock, FLUnit, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, SomeFN
            >
            // has target, has source, has clock
          : Clock extends Units
            ? SampleFilterTargetDef<
                ModeSelector<
                  'clock | source | filter | fn | target',
                  'clock | source | filter |    | target',
                  'clock | source |        | fn | target',
                  'clock | source |        |    | target',
                  SomeFN
                >,
                Target, Source, Clock, FLUnit, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, SomeFN
              >
            : [message: {error: 'clock should be unit or array of units'; got: Clock}]
        : [message: {error: 'source should be unit or object with stores'; got: Source}]
    : [message: {error: 'target should be unit or array of units'; got: Target}]

type ModeSelector<
  FilterAndFN,
  FilterOnly,
  FNOnly,
  None,
  SomeFN,
> = unknown extends SomeFN
  ? FilterAndFN
  : SomeFN extends {fn: any; filter: any}
    ? FilterAndFN
    : SomeFN extends {filter: any}
      ? FilterOnly
      : SomeFN extends {fn: any}
        ? FNOnly
        : None

type SampleRet<
  Target,
  Source,
  Clock,
  FLUnit,
  FLBool,
  FilterFun,
  FN,
  FNAltArg,
  FNInf,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? TypeOfSource<Source>
      : never
  ),
  FNInfClock extends (
    Clock extends Units
      ? TypeOfClock<Clock>
      : never
  ),
  SomeFN,
  ForceTargetInference
> = unknown extends Target
    ? unknown extends Clock
      ? unknown extends Source
        ? void
        : Source extends Unit<any> | SourceRecord
          // has filter, has fn
          ? unknown extends SomeFN
            ? FLUnit extends Unit<any>
              ? FN extends (src: TypeOfSource<Source>) => any
                ? EventAsReturnType<ReturnType<FN>>
                : never
              : FLBool extends BooleanConstructor
                ? FNAltArg extends (arg: NonFalsy<TypeOfSource<Source>>) => any
                  ? EventAsReturnType<ReturnType<FNAltArg>>
                  : never
                : FilterFun extends (src: TypeOfSource<Source>) => src is FNInfSource
                  ? FNInf extends (src: FNInfSource) => any
                    ? EventAsReturnType<ReturnType<FNInf>>
                    : never
                  : FN extends (src: TypeOfSource<Source>) => any
                    ? EventAsReturnType<ReturnType<FN>>
                    : never
            // has filter, has fn
            : SomeFN extends {filter: any; fn: any}
              ? FLUnit extends Unit<any>
                ? FN extends (src: TypeOfSource<Source>) => any
                  ? EventAsReturnType<ReturnType<FN>>
                  : never
                : FLBool extends BooleanConstructor
                  ? FNAltArg extends (arg: NonFalsy<TypeOfSource<Source>>) => any
                    ? EventAsReturnType<ReturnType<FNAltArg>>
                    : never
                  : FilterFun extends (src: TypeOfSource<Source>) => src is FNInfSource
                    ? FNInf extends (src: FNInfSource) => any
                      ? EventAsReturnType<ReturnType<FNInf>>
                      : never
                    : FN extends (src: TypeOfSource<Source>) => any
                      ? EventAsReturnType<ReturnType<FN>>
                      : never
              // no filter, has fn
              : SomeFN extends {fn: any}
                ? FN extends (src: TypeOfSource<Source>) => any
                  ? Source extends Store<any> | SourceRecord
                    ? Store<ReturnType<FN>>
                    : EventAsReturnType<ReturnType<FN>>
                  : never
                // has filter, no fn
                : SomeFN extends {filter: any}
                  ? FLUnit extends Unit<any>
                    ? EventAsReturnType<TypeOfSource<Source>>
                    : FLBool extends BooleanConstructor
                      ? EventAsReturnType<NonFalsy<TypeOfSource<Source>>>
                      : FilterFun extends (src: TypeOfSource<Source>) => src is FNInfSource
                        ? EventAsReturnType<FNInfSource>
                        : EventAsReturnType<TypeOfSource<Source>>
                  // no filter, no fn
                  : Source extends Store<any> | SourceRecord
                    ? Store<TypeOfSource<Source>>
                    : EventAsReturnType<TypeOfSource<Source>>
          : void
      : unknown extends Source
        ? Clock extends Units
          // has filter, has fn
          ? unknown extends SomeFN
            ? FLUnit extends Unit<any>
              ? FN extends (clk: TypeOfClock<Clock>) => any
                ? EventAsReturnType<ReturnType<FN>>
                : never
              : FLBool extends BooleanConstructor
                ? FNAltArg extends (arg: NonFalsy<TypeOfClock<Clock>>) => any
                  ? EventAsReturnType<ReturnType<FNAltArg>>
                  : never
                : FilterFun extends (clk: TypeOfClock<Clock>) => clk is FNInfClock
                  ? FNInf extends (clk: FNInfClock) => any
                    ? EventAsReturnType<ReturnType<FNInf>>
                    : never
                  : FN extends (clk: TypeOfClock<Clock>) => any
                    ? EventAsReturnType<ReturnType<FN>>
                    : never
            // has filter, has fn
            : SomeFN extends {filter: any; fn: any}
              ? FLUnit extends Unit<any>
                ? FN extends (clk: TypeOfClock<Clock>) => any
                  ? EventAsReturnType<ReturnType<FN>>
                  : never
                : FLBool extends BooleanConstructor
                  ? FNAltArg extends (arg: NonFalsy<TypeOfClock<Clock>>) => any
                    ? EventAsReturnType<ReturnType<FNAltArg>>
                    : never
                  : FilterFun extends (clk: TypeOfClock<Clock>) => clk is FNInfClock
                    ? FNInf extends (src: FNInfClock) => any
                      ? EventAsReturnType<ReturnType<FNInf>>
                      : never
                    : FN extends (clk: TypeOfClock<Clock>) => any
                      ? EventAsReturnType<ReturnType<FN>>
                      : never
              // no filter, has fn
              : SomeFN extends {fn: any}
                ? FN extends (clk: TypeOfClock<Clock>) => any
                  ? Clock extends Store<any>
                    ? Store<ReturnType<FN>>
                    : EventAsReturnType<ReturnType<FN>>
                  : never
                // has filter, no fn
                : SomeFN extends {filter: any}
                  ? FLUnit extends Unit<any>
                    ? EventAsReturnType<TypeOfClock<Clock>>
                    : FLBool extends BooleanConstructor
                      ? EventAsReturnType<NonFalsy<TypeOfClock<Clock>>>
                      : FilterFun extends (clk: TypeOfClock<Clock>) => clk is FNInfClock
                        ? EventAsReturnType<FNInfClock>
                        : EventAsReturnType<TypeOfClock<Clock>>
                  // no filter, no fn
                  : Clock extends Store<any>
                    ? Store<TypeOfClock<Clock>>
                    : EventAsReturnType<TypeOfClock<Clock>>
          : void
        : Clock extends Units
          ? Source extends Unit<any> | SourceRecord
            // has filter, has fn
            ? unknown extends SomeFN
              ? FLUnit extends Unit<any>
                ? FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                  ? EventAsReturnType<ReturnType<FN>>
                  : never
                : FLBool extends BooleanConstructor
                  ? FNAltArg extends (arg: NonFalsy<TypeOfSource<Source>>, clk: TypeOfClock<Clock>) => any
                    ? EventAsReturnType<ReturnType<FNAltArg>>
                    : never
                  : FilterFun extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
                    ? FNInf extends (src: FNInfSource, clk: TypeOfClock<Clock>) => any
                      ? EventAsReturnType<ReturnType<FNInf>>
                      : never
                    : FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                      ? EventAsReturnType<ReturnType<FN>>
                      : never
              // has filter, has fn
              : SomeFN extends {filter: any; fn: any}
                ? FLUnit extends Unit<any>
                  ? FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                    ? EventAsReturnType<ReturnType<FN>>
                    : never
                  : FLBool extends BooleanConstructor
                    ? FNAltArg extends (arg: NonFalsy<TypeOfSource<Source>>, clk: TypeOfClock<Clock>) => any
                      ? EventAsReturnType<ReturnType<FNAltArg>>
                      : never
                    : FilterFun extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
                      ? FNInf extends (src: FNInfSource, clk: TypeOfClock<Clock>) => any
                        ? EventAsReturnType<ReturnType<FNInf>>
                        : never
                      : FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                        ? EventAsReturnType<ReturnType<FN>>
                        : never
                // no filter, has fn
                : SomeFN extends {fn: any}
                  ? FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                    ? [Clock, Source] extends [Store<any>, Store<any> | SourceRecord]
                      ? Store<ReturnType<FN>>
                      : EventAsReturnType<ReturnType<FN>>
                    : never
                  // has filter, no fn
                  : SomeFN extends {filter: any}
                    ? FLUnit extends Unit<any>
                      ? EventAsReturnType<TypeOfSource<Source>>
                      : FLBool extends BooleanConstructor
                        ? EventAsReturnType<NonFalsy<TypeOfSource<Source>>>
                        : FilterFun extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
                          ? EventAsReturnType<FNInfSource>
                          : EventAsReturnType<TypeOfSource<Source>>
                    // no filter, no fn
                    : [Clock, Source] extends [Store<any>, Store<any> | SourceRecord]
                      ? Store<TypeOfSource<Source>>
                      : EventAsReturnType<TypeOfSource<Source>>
            : void
          : void
    : Target & ForceTargetInference

/**
 * Represents a step in a business logic workflow. It tells an application when it should act, which data it needs,
 * how it should be transformed and what should happens next
 *
 * ```js
 * sample({
 *   // when clickBuy event is triggered
 *   clock: clickBuy,
 *   // read state of $shoppingCart store
 *   source: $shoppingCart,
 *   // and if there at least one item in cart
 *   filter: (cart) => cart.items.length > 0,
 *   // then select items from cart
 *   fn: cart => cart.items,
 *   // and pass results to buyItemsFx effect and clearCart event
 *   target: [buyItemsFx, clearCart]
 * })
 * ```
 */
export function sample<
  Target,
  Source,
  Clock,
  FLBool,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? TypeOfSource<Source>
      : never
    ),
  FNInfClock extends (
    Clock extends Units
      ? TypeOfClock<Clock>
      : never
  ),
  FilterFun extends (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (
        | never
        | ((src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource)
        | ((src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => boolean)
      )
      : (
        | never
        | ((src: TypeOfSource<Source>) => src is FNInfSource)
        | ((src: TypeOfSource<Source>) => boolean)
      )
    : Clock extends Units
      ? (
        | never
        | ((clk: TypeOfClock<Clock>) => clk is FNInfClock)
        | ((clk: TypeOfClock<Clock>) => boolean)
      )
      : never
  ),
  FN extends (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
      : (src: TypeOfSource<Source>) => any
    : Clock extends Units
      ? (clk: TypeOfClock<Clock>) => any
      : never
  ),
  FNInf extends (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (src: FNInfSource, clk: TypeOfClock<Clock>) => any
      : (src: FNInfSource) => any
    : Clock extends Units
      ? (clk: FNInfClock) => any
      : never
  ),
  FNNonFalsy extends (
    Source extends Unit<any> | SourceRecord
    ? NonFalsy<TypeOfSource<Source>>
    : Clock extends Units
      ? NonFalsy<TypeOfClock<Clock>>
      : never
  ),
  FNAltArg extends (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (src: FNNonFalsy, clk: TypeOfClock<Clock>) => any
      : (src: FNNonFalsy) => any
    : Clock extends Units
      ? (clk: FNNonFalsy) => any
      : never
  ),
  SomeFN,
  SourceNoConf,
  ClockNoConf,
  FNSrcNoConf extends (
    SourceNoConf extends Unit<any> | SourceRecord
      ? (src: TypeOfSource<SourceNoConf>) => any
      : never
  ),
  FNBothNoConf extends (
    SourceNoConf extends Unit<any> | SourceRecord
      ? ClockNoConf extends Units
        ? ((src: TypeOfSource<SourceNoConf>, clk: TypeOfClock<ClockNoConf>) => any)
        : never
      : never
  ),
  FLUnit,
  Args extends any[],
  InferTarget,
>(...args:
  SourceNoConf extends Unit<any> | SourceRecord
    ? ClockNoConf extends Units
      ? [any, any, any] extends Args
        ? [source: SourceNoConf, clock: ClockNoConf, fn: FNBothNoConf] & Args
        : [any, any] extends Args
          ? [source: SourceNoConf, clock: ClockNoConf] & Args
          : never
      : [any, any] extends Args
        ? [source: SourceNoConf, fn: FNSrcNoConf] & Args
        : Args extends [Unit<any>]
          ? [source: SourceNoConf] & Args
          : SampleImpl<Target, Source, Clock, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, FLUnit, SomeFN>
    : SampleImpl<Target, Source, Clock, FLBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, FLUnit, SomeFN>
): SourceNoConf extends Unit<any> | SourceRecord
  ? ClockNoConf extends Units
    ? [any, any, any] extends Args
      ? SourceNoConf extends Store<any>
        ? ClockNoConf extends Store<any>
          ? Store<ReturnType<FNBothNoConf>>
          : EventAsReturnType<ReturnType<FNBothNoConf>>
        : EventAsReturnType<ReturnType<FNBothNoConf>>
      : [any, any] extends Args
        ? SourceNoConf extends Store<any>
          ? ClockNoConf extends Store<any>
            ? Store<TypeOfSource<SourceNoConf>>
            : EventAsReturnType<TypeOfSource<SourceNoConf>>
          : EventAsReturnType<TypeOfSource<SourceNoConf>>
        : void
    : [any, any] extends Args
      ? SourceNoConf extends Store<any>
        ? Store<ReturnType<FNSrcNoConf>>
        : EventAsReturnType<ReturnType<FNSrcNoConf>>
      : Args extends [Unit<any>]
        ? SourceNoConf extends Store<any>
          ? Store<TypeOfSource<SourceNoConf>>
          : EventAsReturnType<TypeOfSource<SourceNoConf>>
        : SampleRet<Target, Source, Clock, FLUnit, FLBool, FilterFun, FN, FNAltArg, FNInf, FNInfSource, FNInfClock, SomeFN, InferTarget>
  : SampleRet<Target, Source, Clock, FLUnit, FLBool, FilterFun, FN, FNAltArg, FNInf, FNInfSource, FNInfClock, SomeFN, InferTarget>

/*
  | 'clock | source | filter | fn | target'
  | 'clock | source |        | fn | target'
  | 'clock | source | filter | fn |       '
  | 'clock | source |        | fn |       '
  | 'clock | source | filter |    | target'
  | 'clock | source |        |    | target'
  | 'clock | source | filter |    |       '
  | 'clock | source |        |    |       '

  | '      | source | filter | fn | target'
  | '      | source |        | fn | target'
  | '      | source | filter | fn |       '
  | '      | source |        | fn |       '
  | '      | source | filter |    | target'
  | '      | source |        |    | target'
  | '      | source | filter |    |       '
  | '      | source |        |    |       '

  | 'clock |        | filter | fn | target'
  | 'clock |        |        | fn | target'
  | 'clock |        | filter | fn |       '
  | 'clock |        |        | fn |       '
  | 'clock |        | filter |    | target'
  | 'clock |        |        |    | target'
  | 'clock |        | filter |    |       '
  | 'clock |        |        |    |       '
*/
type Mode_Clk_Src = `clock | source | ${string}`;
type Mode_Clk_NoSrc  = `clock |        | ${string}`;
type Mode_NoClk_Src  = `      | source | ${string}`;
type Mode_Trg = `${string} | target`;
type Mode_Flt_Trg = `${string} | filter | ${string} | target`;
type Mode_NoFlt = `${string} | ${string} |        | ${string} | ${string}`;
type Mode_Fn_Trg = `${string} | fn | target`;
type Mode_Src = `${string} | source | ${string}`;
type Mode_Flt_Fn_Trg = `${string} | filter | fn | target`;
type Mode_Src_Flt_NoFn_Trg = `${string} | source | filter |    | target`;
type Mode_NoTrg = `${string} |       `;
type Mode_Flt = `${string} | filter | ${string}`;
type Mode_Flt_Fn = `${string} | filter | fn | ${string}`;

type TargetFilterFnConfig<
  Mode extends Mode_Flt_Trg,
  Target extends Units | ReadonlyArray<Unit<any>>,
  Source,
  Clock,
  FilterFun,
  FN,
> = Mode extends 'clock | source | filter | fn | target'
  ? {clock: Clock; source: Source; filter?: FilterFun; fn?: FN; target: Target; greedy?: boolean}
  : Mode extends 'clock | source | filter |    | target'
  ? {clock: Clock; source: Source; filter: FilterFun; target: Target; greedy?: boolean}
  : Mode extends '      | source | filter | fn | target'
  ? {source: Source; clock?: never; filter?: FilterFun; fn?: FN; target: Target; greedy?: boolean}
  : Mode extends '      | source | filter |    | target'
  ? {source: Source; clock?: never; filter: FilterFun; target: Target; greedy?: boolean}
  : Mode extends 'clock |        | filter | fn | target'
  ? {clock: Clock; source?: never; filter?: FilterFun; fn?: FN; target: Target; greedy?: boolean}
  : Mode extends 'clock |        | filter |    | target'
  ? {clock: Clock; source?: never; filter: FilterFun; target: Target; greedy?: boolean}
  : never

type TargetConfigCheck<
  Mode extends Mode_Trg,
  Target extends Units | ReadonlyArray<Unit<any>>,
  Source,
  Clock,
  FN,
  Config,
  SomeFN
> = // mode with fn
    Mode extends Mode_Fn_Trg
    // there should be an explicit conditional selection
    // of generic variable for function type
    // this could be a reason for a few unfixed implicit any
  ? FN extends DataSourceFunction<Source, Clock>
    ? TargetOrError<
        ReturnType<FN>,
        'fnRet',
        Target,
        Config & SomeFN
      >
    : [message: {error: 'function should accept data source types'; got: FN}]
    // mode with source only or with both clock and source
  : Mode extends Mode_Src
  ? Source extends Unit<any> | SourceRecord
    ? TargetOrError<
        TypeOfSource<Source>,
        'src',
        Target,
        Config & SomeFN
      >
    : [message: {error: 'source should be unit or object with stores'; got: Source}]
    // mode with clock only
  : Mode extends Mode_Clk_NoSrc
  ? Clock extends Units
    ? TargetOrError<
        TypeOfClock<Clock>,
        'clk',
        Target,
        Config & SomeFN
      >
    : [message: {error: 'clock should be unit or array of units'; got: Clock}]
  : never

type InferredType<Source, Clock, FilterFN> =
  Source extends Unit<any> | SourceRecord
  ? Clock extends Units
    ? FilterFN extends (src: any, clk: TypeOfClock<Clock>) => src is infer Ret
      ? Ret extends TypeOfSource<Source>
        ? Ret
        : never
      : never
    : FilterFN extends (src: any) => src is infer Ret
      ? Ret extends TypeOfSource<Source>
        ? Ret
        : never
      : never
  : Clock extends Units
    ? FilterFN extends (clk: any) => clk is infer Ret
      ? Ret extends TypeOfClock<Clock>
        ? Ret
        : never
      : never
    : never

type SampleFilterTargetDef<
  Mode extends Mode_Trg,
  Target extends Units | ReadonlyArray<Unit<any>>,
  Source,
  Clock,
  FLUnit,
  FLBool,
  FilterFun,
  FN,
  FNInf,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? TypeOfSource<Source>
      : never
    ),
  FNInfClock extends (
    Clock extends Units
      ? TypeOfClock<Clock>
      : never
    ),
  FNAltArg,
  SomeFN
> = Mode extends Mode_Flt_Trg
  ? FLUnit extends Unit<any>
    ? boolean extends UnitValue<FLUnit>
      ? FN extends DataSourceFunction<Source, Clock>
        ? TargetConfigCheck<
            Mode, Target, Source, Clock, FN,
            Mode extends 'clock | source | filter | fn | target'
            ? {clock: Clock; source: Source; filter?: FLUnit; fn?: FN; target: Target; greedy?: boolean}
            : Mode extends 'clock | source | filter |    | target'
            ? {clock: Clock; source: Source; filter: FLUnit; target: Target; greedy?: boolean}
            : Mode extends '      | source | filter | fn | target'
            ? {source: Source; clock?: never; filter?: FLUnit; fn?: FN; target: Target; greedy?: boolean}
            : Mode extends '      | source | filter |    | target'
            ? {source: Source; clock?: never; filter: FLUnit; target: Target; greedy?: boolean}
            : Mode extends 'clock |        | filter | fn | target'
            ? {clock: Clock; source?: never; filter?: FLUnit; fn?: FN; target: Target; greedy?: boolean}
            : Mode extends 'clock |        | filter |    | target'
            ? {clock: Clock; source?: never; filter: FLUnit; target: Target; greedy?: boolean}
            : never,
            SomeFN
          >
          : [message: {error: 'filter unit should has boolean type'; got: UnitValue<FLUnit>}]
        : [message: {error: 'function should accept data source types'; got: FN}]
    : FLBool extends BooleanConstructor
      ? Mode extends Mode_Flt_Fn_Trg
        ? FNAltArg extends (arg?: any, clk?: any) => any
          ? TargetOrError<
              ReturnType<FNAltArg>,
              'fnRet',
              Target,
              TargetFilterFnConfig<Mode, Target, Source, Clock, FLBool, FNAltArg> & SomeFN
            >
          : never
          // mode with source only or with both clock and source
        : Mode extends Mode_Src_Flt_NoFn_Trg
        ? Source extends Unit<any> | SourceRecord
          ? TargetOrError<
              NonFalsy<TypeOfSource<Source>>,
              'src',
              Target,
              TargetFilterFnConfig<Mode, Target, Source, Clock, FLBool, never> & SomeFN
            >
          : [message: {error: 'source should be unit or object with stores'; got: Source}]
          // mode with clock only
        : Mode extends Mode_Clk_NoSrc
        ? Clock extends Units
          ? TargetOrError<
              NonFalsy<TypeOfClock<Clock>>,
              'clk',
              Target,
              TargetFilterFnConfig<Mode, Target, Source, Clock, FLBool, never> & SomeFN
            >
          : [message: {error: 'clock should be unit or array of units'; got: Clock}]
        : never
    : FilterFun extends (
        Source extends Unit<any> | SourceRecord
        ? Clock extends Units
          ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
          : (src: TypeOfSource<Source>) => src is FNInfSource
        : Clock extends Units
          ? (clk: TypeOfClock<Clock>) => clk is FNInfClock
          : never
      )
        // mode with fn
      ? Mode extends Mode_Flt_Fn_Trg
        ? FNInf extends (
            Source extends Unit<any> | SourceRecord
            ? Clock extends Units
              ? (src: FNInfSource, clk: TypeOfClock<Clock>) => any
              : (src: FNInfSource) => any
            : Clock extends Units
              ? (clk: FNInfClock) => any
              : any
          )
          ? TargetOrError<
              ReturnType<FNInf>,
              'fnRet',
              Target,
              TargetFilterFnConfig<Mode, Target, Source, Clock, FilterFun & (
                Source extends Unit<any> | SourceRecord
                ? Clock extends Units
                  ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
                  : (src: TypeOfSource<Source>) => src is FNInfSource
                : Clock extends Units
                  ? (clk: TypeOfClock<Clock>) => clk is FNInfClock
                  : never
              ), FNInf & (
                Source extends Unit<any> | SourceRecord
                ? Clock extends Units
                  ? (src: FNInfSource, clk: TypeOfClock<Clock>) => any
                  : (src: FNInfSource) => any
                : Clock extends Units
                  ? (clk: FNInfClock) => any
                  : any
              )> & SomeFN
            >
          : [message: {error: 'function should accept data source types'; got: FNInf}]
          // mode with source only or with both clock and source
        : Mode extends Mode_Src_Flt_NoFn_Trg
        ? Source extends Unit<any> | SourceRecord
          ? TargetOrError<
              InferredType<Source, Clock, FilterFun>,
              'src',
              Target,
              TargetFilterFnConfig<Mode, Target, Source, Clock, FilterFun, never> & SomeFN
            >
          : [message: {error: 'source should be unit or object with stores'; got: Source}]
          // mode with clock only
        : Mode extends Mode_Clk_NoSrc
        ? Clock extends Units
          ? TargetOrError<
              InferredType<Source, Clock, FilterFun>,
              'clk',
              Target,
              TargetFilterFnConfig<Mode, Target, Source, Clock, FilterFun, never> & SomeFN
            >
          : [message: {error: 'clock should be unit or array of units'; got: Clock}]
        : never
    : FilterFun extends (
          Mode extends Mode_Clk_Src
        ? Source extends Unit<any> | SourceRecord
          ? Clock extends Units
            ? ((src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any)
            : never
          : never
        : Mode extends Mode_NoClk_Src
        ? Source extends Unit<any> | SourceRecord
          ? (src: TypeOfSource<Source>) => any
          : never
        : Clock extends Units
          ? (clk: TypeOfClock<Clock>) => any
          : never
      )
      ? ReturnType<FilterFun> extends boolean
        // mode with fn
        ? Mode extends Mode_Flt_Fn_Trg
          ? FN extends DataSourceFunction<Source, Clock>
            ? TargetOrError<
                ReturnType<FN>,
                'fnRet',
                Target,
                TargetFilterFnConfig<Mode, Target, Source, Clock, FilterFun, FN> & SomeFN
              >
            : [message: {error: 'function should accept data source types'; got: FN}]
            // mode with source only or with both clock and source
          : Mode extends Mode_Src_Flt_NoFn_Trg
          ? Source extends Unit<any> | SourceRecord
            ? TargetOrError<
                TypeOfSource<Source>,
                'src',
                Target,
                TargetFilterFnConfig<Mode, Target, Source, Clock, FilterFun, never> & SomeFN
              >
            : [message: {error: 'source should be unit or object with stores'; got: Source}]
            // mode with clock only
          : Mode extends Mode_Clk_NoSrc
          ? Clock extends Units
            ? TargetOrError<
                TypeOfClock<Clock>,
                'clk',
                Target,
                TargetFilterFnConfig<Mode, Target, Source, Clock, FilterFun, never> & SomeFN
              >
            : [message: {error: 'clock should be unit or array of units'; got: Clock}]
          : never
        : [message: {error: 'filter function should return boolean'; got: ReturnType<FilterFun>}]
      : [message: {error: 'filter should be function or unit'; got: FilterFun}]

  : Mode extends Mode_NoFlt
    ? FN extends DataSourceFunction<Source, Clock>
      ? TargetConfigCheck<
          Mode, Target, Source, Clock, FN,
          Mode extends 'clock | source |        | fn | target'
          ? {clock: Clock; source: Source; filter?: never; fn: FN; target: Target; greedy?: boolean}
          : Mode extends 'clock | source |        |    | target'
          ? {clock: Clock; source: Source; filter?: never; target: Target; greedy?: boolean}
          : Mode extends '      | source |        | fn | target'
          ? {source: Source; clock?: never; filter?: never; fn: FN; target: Target; greedy?: boolean}
          : Mode extends '      | source |        |    | target'
          ? {source: Source; clock?: never; filter?: never; target: Target; greedy?: boolean}
          : Mode extends 'clock |        |        | fn | target'
          ? {clock: Clock; source?: never; filter?: never; fn: FN; target: Target; greedy?: boolean}
          : Mode extends 'clock |        |        |    | target'
          ? {clock: Clock; source?: never; filter?: never; target: Target; greedy?: boolean}
          : never,
          SomeFN
        >
      : [message: {error: 'function should accept data source types'; got: FN}]
    : never

type TargetOrError<
  MatchingValue,
  Mode extends 'fnRet' | 'src' | 'clk',
  Target extends Units | ReadonlyArray<Unit<any>>,
  ResultConfig
> = [TypeOfTarget<MatchingValue, Target, Mode>] extends [Target]
    ? [config: ResultConfig]
    : [Target] extends [TypeOfTargetSoft<MatchingValue, Target, Mode>]
      ? [config: ResultConfig]
      : [message: {
          error: Mode extends 'fnRet'
            ? 'fn result should extend target type'
            : Mode extends 'src'
              ? 'source should extend target type'
              : 'clock should extend target type'
          targets: Show<TypeOfTarget<MatchingValue, Target, Mode>>
        }]

type SampleFilterDef<
  Mode extends Mode_NoTrg,
  Source,
  Clock,
  FLUnit,
  FLBool,
  FilterFun,
  FN,
  FNInf,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? TypeOfSource<Source>
      : never
    ),
  FNInfClock extends (
    Clock extends Units
      ? TypeOfClock<Clock>
      : never
    ),
  FNAltArg,
  SomeFN
> =
  Mode extends Mode_Flt
  ? FLUnit extends Unit<any>
    ? boolean extends UnitValue<FLUnit>
      ? [config: (
            Mode extends 'clock | source | filter | fn |       '
          ? {clock: Clock; source: Source; filter?: FLUnit; fn?: FN; target?: never; greedy?: boolean; name?: string}
          : Mode extends 'clock | source | filter |    |       '
          ? {clock: Clock; source: Source; filter: FLUnit; target?: never; greedy?: boolean; name?: string}
          : Mode extends '      | source | filter | fn |       '
          ? {source: Source; clock?: never; filter?: FLUnit; fn?: FN; target?: never; greedy?: boolean; name?: string}
          : Mode extends '      | source | filter |    |       '
          ? {source: Source; clock?: never; filter: FLUnit; target?: never; greedy?: boolean; name?: string}
          : Mode extends 'clock |        | filter | fn |       '
          ? {clock: Clock; source?: never; filter?: FLUnit; fn?: FN; target?: never; greedy?: boolean; name?: string}
          : Mode extends 'clock |        | filter |    |       '
          ? {clock: Clock; source?: never; filter: FLUnit; target?: never; greedy?: boolean; name?: string}
          : never
        ) & SomeFN]
      : [message: {error: 'filter unit should has boolean type'; got: UnitValue<FLUnit>}]
    : FLBool extends BooleanConstructor
      ? Mode extends Mode_Flt_Fn
        ? [config: (
              Mode extends 'clock | source | filter | fn |       '
            ? {clock: Clock; source: Source; filter?: FLBool; fn?: FNAltArg; target?: never; greedy?: boolean; name?: string}
            : Mode extends '      | source | filter | fn |       '
            ? {source: Source; clock?: never; filter?: FLBool; fn?: FNAltArg; target?: never; greedy?: boolean; name?: string}
            : Mode extends 'clock |        | filter | fn |       '
            ? {clock: Clock; source?: never; filter?: FLBool; fn?: FNAltArg; target?: never; greedy?: boolean; name?: string}
            : never
          ) & SomeFN]
        : [config: (
              Mode extends 'clock | source | filter |    |       '
            ? {clock: Clock; source: Source; filter: FLBool; target?: never; greedy?: boolean; name?: string}
            : Mode extends '      | source | filter |    |       '
            ? {source: Source; clock?: never; filter: FLBool; target?: never; greedy?: boolean; name?: string}
            : Mode extends 'clock |        | filter |    |       '
            ? {clock: Clock; source?: never; filter: FLBool; target?: never; greedy?: boolean; name?: string}
            : never
          ) & SomeFN]
      : FilterFun extends (
          Source extends Unit<any> | SourceRecord
          ? Clock extends Units
            ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
            : (src: TypeOfSource<Source>) => src is FNInfSource
          : Clock extends Units
            ? (clk: TypeOfClock<Clock>) => clk is FNInfClock
            : never
        )
        ? Mode extends Mode_Flt_Fn
          ? FNInf extends (
              Source extends Unit<any> | SourceRecord
              ? Clock extends Units
                ? (src: FNInfSource, clk: TypeOfClock<Clock>) => any
                : (src: FNInfSource) => any
              : Clock extends Units
                ? (clk: FNInfClock) => any
                : any
            )
            ? [config: (
                  Mode extends 'clock | source | filter | fn |       '
                ? {clock: Clock; source: Source; filter?: FilterFun; fn?: FNInf; target?: never; greedy?: boolean; name?: string}
                : Mode extends '      | source | filter | fn |       '
                ? {source: Source; clock?: never; filter?: FilterFun; fn?: FNInf; target?: never; greedy?: boolean; name?: string}
                : Mode extends 'clock |        | filter | fn |       '
                ? {clock: Clock; source?: never; filter?: FilterFun; fn?: FNInf; target?: never; greedy?: boolean; name?: string}
                : never
              ) & SomeFN]
            : [message: {
                error: 'fn should match inferred type'
                inferred: (Source extends Unit<any> | SourceRecord ? FNInfSource : FNInfClock)
                fnArg: FNInf extends (arg: infer Arg) => any ? Arg : never
              }]
          : [config: (
              Mode extends 'clock | source | filter |    |       '
            ? {clock: Clock; source: Source; filter: FilterFun; target?: never; greedy?: boolean; name?: string}
            : Mode extends '      | source | filter |    |       '
            ? {source: Source; clock?: never; filter: FilterFun; target?: never; greedy?: boolean; name?: string}
            : Mode extends 'clock |        | filter |    |       '
            ? {clock: Clock; source?: never; filter: FilterFun; target?: never; greedy?: boolean; name?: string}
            : never
          ) & SomeFN]
      : FilterFun extends (
          Source extends Unit<any> | SourceRecord
          ? Clock extends Units
            ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
            : (src: TypeOfSource<Source>) => any
          : Clock extends Units
            ? (clk: TypeOfClock<Clock>) => any
            : never
        )
        ? ReturnType<FilterFun> extends boolean
          ? [config: (
                Mode extends 'clock | source | filter | fn |       '
              ? {clock: Clock; source: Source; filter?: FilterFun; fn?: FN; target?: never; greedy?: boolean; name?: string}
              : Mode extends 'clock | source | filter |    |       '
              ? {clock: Clock; source: Source; filter: FilterFun; target?: never; greedy?: boolean; name?: string}
              : Mode extends '      | source | filter | fn |       '
              ? {source: Source; clock?: never; filter?: FilterFun; fn?: FN; target?: never; greedy?: boolean; name?: string}
              : Mode extends '      | source | filter |    |       '
              ? {source: Source; clock?: never; filter: FilterFun; target?: never; greedy?: boolean; name?: string}
              : Mode extends 'clock |        | filter | fn |       '
              ? {clock: Clock; source?: never; filter?: FilterFun; fn?: FN; target?: never; greedy?: boolean; name?: string}
              : Mode extends 'clock |        | filter |    |       '
              ? {clock: Clock; source?: never; filter: FilterFun; target?: never; greedy?: boolean; name?: string}
              : never
            ) & SomeFN]
          : [message: {error: 'filter function should return boolean'; got: ReturnType<FilterFun>}]
        : [message: {error: 'filter should be function or unit'; got: FilterFun}]
  : Mode extends Mode_NoFlt
  ? [config: (
        Mode extends 'clock | source |        | fn |       '
      ? {clock: Clock; source: Source; filter?: never; fn: FN; target?: never; greedy?: boolean; name?: string}
      : Mode extends 'clock | source |        |    |       '
      ? {clock: Clock; source: Source; filter?: never; target?: never; greedy?: boolean; name?: string}
      : Mode extends '      | source |        | fn |       '
      ? {source: Source; clock?: never; filter?: never; fn: FN; target?: never; greedy?: boolean; name?: string}
      : Mode extends '      | source |        |    |       '
      ? {source: Source; clock?: never; filter?: never; target?: never; greedy?: boolean; name?: string}
      : Mode extends 'clock |        |        | fn |       '
      ? {clock: Clock; source?: never; filter?: never; fn: FN; target?: never; greedy?: boolean; name?: string}
      : Mode extends 'clock |        |        |    |       '
      ? {clock: Clock; source?: never; filter?: never; target?: never; greedy?: boolean; name?: string}
      : never
    ) & SomeFN]
  : never

type DataSourceFunction<Source, Clock> =
  Source extends Unit<any> | SourceRecord
  ? Clock extends Units
    ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
    : (src: TypeOfSource<Source>) => any
  : Clock extends Units
    ? (clk: TypeOfClock<Clock>) => any
    : never

type TypeOfTargetSoft<SourceType, Target extends Units | ReadonlyArray<Unit<any>>, Mode extends 'fnRet' | 'src' | 'clk'> =
  Target extends Unit<any>
    ? Target extends Unit<infer TargetType>
      ? [SourceType] extends [Readonly<TargetType>]
        ? Target
        : WhichType<TargetType> extends ('void' | 'any')
          ? Target
          : IfAssignable<SourceType, TargetType,
            Target,
            Mode extends 'fnRet'
              ? never & {fnResult: SourceType; targetType: TargetType}
              : Mode extends 'src'
                ? never & {sourceType: SourceType; targetType: TargetType}
                : {clockType: SourceType; targetType: TargetType}
            >
      : never
    : {
      [
        K in keyof Target
      ]: Target[K] extends Unit<infer TargetType>
        ? [SourceType] extends [Readonly<TargetType>]
          ? Target[K]
          : WhichType<TargetType> extends ('void' | 'any')
            ? Target[K]
            : IfAssignable<SourceType, TargetType,
              Target[K],
              Mode extends 'fnRet'
                ? never & {fnResult: SourceType; targetType: TargetType}
                : Mode extends 'src'
                  ? never & {sourceType: SourceType; targetType: TargetType}
                  : {clockType: SourceType; targetType: TargetType}
              >
        : never
    }

type TypeOfTarget<SourceType, Target extends Units | ReadonlyArray<Unit<any>>, Mode extends 'fnRet' | 'src' | 'clk'> =
  Target extends Unit<any>
    ? Target extends Unit<infer TargetType>
      ? [SourceType] extends [Readonly<TargetType>]
        ? Target
        : WhichType<TargetType> extends ('void' | 'any')
          ? Target
          : Mode extends 'fnRet'
            ? {fnResult: SourceType; targetType: TargetType}
            : Mode extends 'src'
              ? {sourceType: SourceType; targetType: TargetType}
              : {clockType: SourceType; targetType: TargetType}
      : never
    : {
      [
        K in keyof Target
      ]: Target[K] extends Unit<infer TargetType>
        ? [SourceType] extends [Readonly<TargetType>]
          ? Target[K]
          : WhichType<TargetType> extends ('void' | 'any')
            ? Target[K]
            : Mode extends 'fnRet'
              ? {fnResult: SourceType; targetType: TargetType}
              : Mode extends 'src'
                ? {sourceType: SourceType; targetType: TargetType}
                : {clockType: SourceType; targetType: TargetType}
        : never
    }

type ClockValueOf<T> = T[keyof T]

type TypeOfSource<Source extends Unit<any> | SourceRecord> =
  Source extends Unit<any>
  ? UnitValue<Source>
  : Source extends SourceRecord
    ? {[K in keyof Source]: UnitValue<Source[K]>}
    : never

type TypeOfClock<Clock extends Units | ReadonlyArray<Unit<any>> | never[]> =
  Clock extends never[]
  ? unknown
  : Clock extends Unit<any>
  ? UnitValue<Clock>
  : Clock extends Tuple<Unit<any>>
    ? WhichType<UnitValue<ClockValueOf<{
        [
          K in keyof Clock as
            WhichType<UnitValue<Clock[K]>> extends 'any'
              ? never
              : K
        ]: Clock[K]
      }>>> extends 'never'
      ? any
      : UnitValue<ClockValueOf<{
        [
          K in keyof Clock as
            WhichType<UnitValue<Clock[K]>> extends 'any'
              ? never
              : K
        ]: Clock[K]
      }>>
    : Clock extends ReadonlyArray<Unit<any>>
      ? UnitValue<ClockValueOf<Clock>>
      : never

type SourceRecord = Record<string, Store<any>> | Tuple<Store<any>>

type Units = Unit<any> | Tuple<Unit<any>>

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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A, X extends GetSource<S>,
  S extends Source<A> = Source<A>
>(config: {
  source: S,
  filter: (source: GetSource<S>) => source is X,
  name?: string,
  greedy?: boolean
}): GuardResult<X>
// C
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any, B = any>(config: {
  source: Unit<A>,
  clock: Unit<B>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// SC (units: boolean fn or store)
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any, B = any>(config: {
  source: Unit<A>,
  clock: Unit<B>,
  filter: ((source: A, clock: B) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// SC
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any>(config: {
  source: Unit<A>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// S (unit - boolean fn or store)
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any>(config: {
  source: Unit<A>,
  filter: ((source: A) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// S
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<B = any>(config: {
  clock: Unit<B>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<B>>
// C (unit: boolean fn or store)
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<B = any>(config: {
  clock: Unit<B>,
  filter: ((clock: B) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<B>
// C
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any, B = any>(source: Unit<A>, config: {
  clock: Unit<B>,
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// SC (units: boolean fn or store)
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any, B = any>(source: Unit<A>, config: {
  clock: Unit<B>,
  filter: ((source: A, clock: B) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// SC
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any>(source: Unit<A>, config: {
  filter: BooleanConstructor,
  name?: string,
  greedy?: boolean
}): GuardResult<NonFalsy<A>>
// S (unit: boolean fn or store)
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any>(source: Unit<A>, config: {
  filter: ((source: A) => boolean) | Store<boolean>,
  name?: string,
  greedy?: boolean
}): GuardResult<A>
// S
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
export function guard<A = any,
  S extends Source<A> = Source<A>,
  F extends GuardFilterS<S> = GuardFilterS<S>,
>(source: S, config: {
  filter: F,
  name?: string,
  greedy?: boolean
}): GuardResult<GetGuardSource<S, F>>

// guard's last overload for `guard(source, config)`
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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
/**
 * Method for conditional event routing.
 * > Superseded by `sample({clock, source, filter, fn, target})`
 */
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

/**
 * Method for creating state-dependent effect and transforming effect payloads
 * @returns new effect
 */
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
/**
 * Method for transforming effect payloads
 * @returns new effect
 */
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
/**
 * Method for transforming effect payloads
 * @returns new effect
 */
export function attach<Params, FX extends Effect<any, any, any>>(config: {
  effect: FX
  mapParams: (params: Params) => NoInfer<EffectParams<FX>>
  name?: string
}): Effect<Params, EffectResult<FX>, EffectError<FX>>
/**
 * Method for passing state values to effects
 * @returns new effect
 */
export function attach<
  States extends StoreShape,
  FX extends Effect<GetShapeValue<States>, any, any>
>(config: {
  source: States
  effect: FX
  name?: string
}): Effect<void, EffectResult<FX>, EffectError<FX>>
/**
 * Creates state-dependent effect with provided function handler.
 * Allows the one to omit intermediate effects and declare effect handler right next to data source
 * @returns new effect
 */
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
/**
 * Creates independent instance of given effect. Used to add subscribers to effect call in a particular business case
 * @returns new effect linked to given one
 */
export function attach<
  FX extends Effect<any, any, any>,
>(config: {
  effect: FX
}): Effect<EffectParams<FX>, EffectResult<FX>, EffectError<FX>>
/**
 * Method for creating state-dependent effect and transforming effect payload
 * @returns new effect
 */
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
}

/**
 * Bind units and links between them created inside `cb` callback to unit or graph node to erase during `clearNode` call
 * Low level tool, usually absent in common applications
 * @param unit parent unit or graph node
 * @param cb callback assumed to create some units
 */
export function withRegion(unit: Unit<any> | Node, cb: () => void): void

/**
 * Convert given stores to store with array which values updated upon changes in given ones
 * @returns derived store
 */
export function combine<T extends Store<any>>(
  store: T,
): T extends Store<infer R> ? Store<[R]> : never
/**
 * Convert array of stores to store with array which values updated upon changes in given ones
 * @param tuple array of stores
 * @returns derived store updated upon changes in given ones
 */
export function combine<State extends Tuple>(
  tuple: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
/**
 * Convert object with stores to object store which fields updated upon changes in given ones
 * @param shape object with stores
 * @returns derived store updated upon changes in given ones
 */
export function combine<State>(shape: CombineState<State>): Store<State>
/**
 * Convert object with stores to object store which fields updated upon changes in given ones
 * @param shape object with stores
 * @returns derived store updated upon changes in given ones
 */
export function combine<State>(
  shape: State,
): Store<{[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]}>
/**
 * Creates derived store from given one, transforming value using the function
 * @param source source store
 * @param fn transformer function, accepts a store value
 * @returns derived store updated upon changes in given one
 */
export function combine<A, R>(source: Store<A>, fn: (source: A) => R): Store<R>
/**
 * Convert array of stores into derived store, transforming values using the function
 * @param tuple array of stores
 * @param fn transformer function, accepts an array of values
 * @returns derived store updated upon changes in given ones
 */
export function combine<State extends Tuple, R>(
  tuple: State,
  fn: (
    tuple: {[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]},
  ) => R,
): Store<R>
/**
 * Convert object with stores into derived store, transforming values using the function
 * @param shape object with stores
 * @param fn transformer function, accepts object with values
 * @returns derived store updated upon changes in given ones
 */
export function combine<State, R>(
  shape: State,
  fn: (
    shape: {[K in keyof State]: State[K] extends Store<infer U> ? U : State[K]},
  ) => R,
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, R>(
  a: Store<A>,
  b: Store<B>,
  fn: (a: A, b: B) => R,
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  fn: (a: A, b: B, c: C) => R,
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  fn: (a: A, b: B, c: C, d: D) => R,
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, E, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, E, F, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
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
/**
 * Convert given stores into derived store, transforming values using the function
 *
 * > Consider using `combine(arrayOfStores, arrayOfValues => ...)` instead
 *
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
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
/**
 * Convert given stores into derived store, transforming values using the function
 *
 * > Consider using `combine(arrayOfStores, arrayOfValues => ...)` instead
 *
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
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
/**
 * Convert given stores into derived store, transforming values using the function
 *
 * > Consider using `combine(arrayOfStores, arrayOfValues => ...)` instead
 *
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
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
/**
 * Convert given stores into derived store, transforming values using the function
 *
 * > Consider using `combine(arrayOfStores, arrayOfValues => ...)` instead
 *
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
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
/**
 * Convert given stores to store with array which values updated upon changes in given ones
 * @returns derived store
 */
export function combine<T extends Tuple<Store<any>>>(
  ...stores: T
): Store<{[K in keyof T]: T[K] extends Store<infer U> ? U : T[K]}>

/**
 * Fully isolated instance of application. The primary purpose of scope includes SSR and testing
 */
export interface Scope extends Unit<any> {
  getState<T>(store: Store<T>): T
}

export type ValueMap = Map<Store<any>, any> | Array<[Store<any>, any]> | {[sid: string]: any}

/**
 * Fill stores with given values in provided scope or domain
 */
export function hydrate(domainOrScope: Domain | Scope, config: {values: ValueMap}): void

/**
 * Serialize store values from given scope
 * @returns object with saved values
 */
export function serialize(
  scope: Scope,
  options?: {ignore?: Array<Store<any>>; onlyChanges?: boolean},
): {[sid: string]: any}

/**
 * Bind event to a scope to be called lated.
 *
 * When `scope` is not provided this method retrieve scope implicitly from scope of the handler (effect handler or watch function) inside which it's being called
 * @param unit event to bind
 * @returns function which will trigger an event in a given scope
 */
export function scopeBind<T>(unit: Event<T>, opts?: {scope: Scope}): (payload: T) => void
/**
 * Bind effect to a scope to be called lated.
 *
 * When `scope` is not provided this method retrieve scope implicitly from scope of the handler (effect handler or watch function) inside which it's being called
 * @param unit effect to bind
 * @returns function which will trigger an effect in a given scope and returns a promise with a result
 */
export function scopeBind<P, D>(unit: Effect<P, D>, opts?: {scope: Scope}): (params: P) => Promise<D>

/**
 * Creates isolated instance of application. Primary purposes of this method are SSR and testing.
 * @param domain optional root domain
 * @param config optional configuration object with initial store values and effect handlers
 * @returns new scope
 */
export function fork(
  domain: Domain,
  config?: {
    values?: ValueMap
    handlers?: Map<Effect<any, any, any>, Function> | Array<[Effect<any, any>, Function]> | {[sid: string]: Function}
  },
): Scope
/**
 * Creates isolated instance of application. Primary purposes of this method are SSR and testing.
 * @param config optional configuration object with initial store values and effect handlers
 * @returns new scope
 */
export function fork(
  config?: {
    values?: ValueMap
    handlers?: Map<Effect<any, any, any>, Function> | Array<[Effect<any, any>, Function]> | {[sid: string]: Function}
  },
): Scope

/**
 * Run effect in scope and wait for all triggered effects to settle. This method never throw an error
 * @param unit effect to run
 * @returns promise with status object for given effect, will resolve when there will be no pending effects in given scope
 */
export function allSettled<FX extends Effect<any, any, any>>(
  unit: FX,
  config: {scope: Scope; params: EffectParams<FX>},
): Promise<{status: 'done', value: EffectResult<FX>} | {status: 'fail'; value: EffectError<FX>}>
/**
 * Run effect withot arguments in scope and wait for all triggered effects to settle. This method never throw an error
 * @param unit effect to run
 * @returns promise with status object for given effect, will resolve when there will be no pending effects in given scope
 */
export function allSettled<FX extends Effect<void, any, any>>(
  unit: FX,
  config: {scope: Scope},
): Promise<{status: 'done', value: EffectResult<FX>} | {status: 'fail'; value: EffectError<FX>}>
/**
 * Run event in scope and wait for all triggered effects to settle. This method never throw an error
 * @param unit event to run
 * @returns void promise, will resolve when there will be no pending effects in given scope
 */
export function allSettled<T>(
  unit: Unit<T>,
  config: {scope: Scope; params: T},
): Promise<void>
/**
 * Run event withot arguments in scope and wait for all triggered effects to settle. This method never throw an error
 * @param unit event to run
 * @returns void promise, will resolve when there will be no pending effects in given scope
 */
export function allSettled(
  unit: Unit<void>,
  config: {scope: Scope},
): Promise<void>
