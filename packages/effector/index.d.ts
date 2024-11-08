/**
 * This tuple type is intended for use as a generic constraint to infer concrete
 * tuple type of ANY length.
 *
 * @see https://github.com/krzkaczor/ts-essentials/blob/a4c2485bc3f37843267820ec552aa662251767bc/lib/types.ts#L169
 */
type Tuple<T = unknown> = [T?, ...T[]]
type RoTuple<T = unknown> = readonly [T?, ...T[]]

/**
 * Non inferential type parameter usage. NoInfer in source and in return of fn helps with
 detecting loose objects against target type.
 *
 * @see https://github.com/microsoft/TypeScript/issues/14829#issuecomment-504042546
 */
type NoInfer<T> = [T][T extends any ? 0 : never]

/**
 * Generic Json type
 */
 type Json =
 | null
 | undefined
 | boolean
 | string
 | number
 | Json[]
 | {[k: string]: Json}

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

// Taken from the source code of typescript 4.5. Remove when we separate types for different versions
/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */
type Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object // `await` only unwraps object types with a callable then. Non-object types are not unwrapped.
  ? T extends {then(onfulfilled: infer F): any} // thenable, extracts the first argument to `then()`
    ? F extends (value: infer V) => any // if the argument to `then` is callable, extracts the argument
      ? Awaited<V> // recursively unwrap the value
      : never // the argument to `then` was not callable.
    : T // argument was not an object
  : T // non-thenable

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
  ? Effect<OptionalParams<Args>, Awaited<Done>, Fail>
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

export interface UnitTargetable<T> extends Unit<T> {
  readonly targetable: true
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
type EventCallableAsReturnType<Payload> = any extends Payload ? EventCallable<Payload> : never

/**
 * Event you can subscribe to.
 * It represents a user action, a step in the application process, a command to execute, or an intention to make modifications, among other things.
 */
export interface Event<Payload> extends Unit<Payload> {
  kind: "event"
  map<T>(fn: (payload: Payload) => T): EventAsReturnType<T>
  filter<T extends Payload>(config: {
    fn(payload: Payload): payload is T
  }): EventAsReturnType<T>
  filter(config: {fn(payload: Payload): boolean}): EventAsReturnType<Payload>
  filterMap<T>(fn: (payload: Payload) => T | undefined): EventAsReturnType<T>

  watch(watcher: (payload: Payload) => any): Subscription
  subscribe(observer: Observer<Payload>): Subscription
  /**
   * @deprecated use .compositeName.fullName instead
   */
  getType(): string

  compositeName: CompositeName
  sid: string | null
  shortName: string
}

/**
 * The function you can call to trigger an event.
 */
export interface EventCallable<Payload> extends Event<Payload>, UnitTargetable<Payload> {
  kind: "event"
  (payload: Payload): Payload
   (this: IfUnknown<Payload, void, Payload extends void ? void : `Error: Expected 1 argument, but got 0`>, payload?: Payload): void

  prepend<Before = void>(fn: (_: Before) => Payload): EventCallableAsReturnType<Before>
}

/**
 * Container for (possibly async) side effects
 */
export interface Effect<Params, Done, Fail = Error> extends UnitTargetable<Params> {
  kind: "effect"
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
  prepend<Before>(fn: (_: Before) => Params): EventCallable<Before>
  subscribe(observer: Observer<Params>): Subscription
  getType(): string
  compositeName: CompositeName
  sid: string | null
  shortName: string
}
type InferValueFromTupleOfUnits<T extends Tuple<Unit<any>>> =
  T[number] extends Unit<infer R> ? R : never
type InferValueFromTupleOfUnitTargetables<T extends Tuple<UnitTargetable<any>>> =
  T[number] extends UnitTargetable<infer R>? R : never

export interface Store<State> extends Unit<State> {
  kind: "store"
  map<T>(fn: (state: State) => T, config?: {skipVoid?: boolean}): Store<T>

  updates: Event<State>

  getState(): State
  subscribe(listener: Observer<State> | ((state: State) => any)): Subscription
  watch<E>(watcher: (state: State, payload: undefined) => any): Subscription
  watch<E>(
    trigger: Unit<E>,
    watcher: (state: State, payload: E) => any,
  ): Subscription

  defaultState: State
  compositeName: CompositeName
  shortName: string
  sid: string | null
}

/**
 * Hacky way to force TS perform checks against unsafe widening
 */
interface StoreValueType<X> {
  _: X
  (type: X): void
}

export interface StoreWritable<State> extends Store<State>, UnitTargetable<State> {
  kind: "store"
  readonly ____: StoreValueType<State>

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
  reset(...triggers: Array<Unit<any>>): this
  reset(triggers: Array<Unit<any>>): this

  reinit: EventCallable<void>
}

interface InternalStore<State> extends StoreWritable<State> {
  setState(state: State): void
}

export const is: {
  unit(obj: unknown): obj is Unit<any> | UnitTargetable<any>

  store<O, T>(
    obj: O | Unit<T> | UnitTargetable<T>,
  ): obj is typeof obj extends Unit<T>
    ? Store<T> | StoreWritable<T>
    : Store<any> | StoreWritable<any>

  event<O, T>(
    obj: O | Unit<T> | UnitTargetable<T>
  ): obj is typeof obj extends Unit<T>
    ? Event<T> | EventCallable<T>
    : Event<any> | EventCallable<any>

  effect<O, T, P, F>(
    obj: O | Effect<T, P, F>
  ): obj is Effect<T, P, F>

  domain(obj: unknown): obj is Domain
  scope(obj: unknown): obj is Scope
  attached<E extends Effect<any, any, any>>(obj: unknown): obj is E

  targetable<T>(obj: Unit<T>): obj is UnitTargetable<T>
}

/**
 * A way to group and process events, stores and effects. Useful for logging and assigning a reset trigger to many effects.
 * Domain is notified via onCreateEvent, onCreateStore, onCreateEffect, onCreateDomain methods when events, stores, effects, or nested domains are created
 */
export class Domain implements Unit<any> {
  readonly kind: kind
  readonly __: any
  onCreateEvent(hook: (newEvent: EventCallable<unknown>) => any): Subscription
  onCreateEffect(
    hook: (newEffect: Effect<unknown, unknown, unknown>) => any,
  ): Subscription
  onCreateStore(
    hook: (newStore: InternalStore<unknown>) => any,
  ): Subscription
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription
  event<Payload = void>(name?: string): EventCallable<Payload>
  event<Payload = void>(config: {name?: string; sid?: string}): EventCallable<Payload>
  createEvent<Payload = void>(name?: string): EventCallable<Payload>
  createEvent<Payload = void>(config: {
    name?: string
    sid?: string
  }): EventCallable<Payload>
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
  store<State, SerializedState extends Json = Json>(
    defaultState: State,
    config?: {
      name?: string
      sid?: string
      updateFilter?: (update: State, current: State) => boolean
      serialize?:
      | 'ignore'
      | {
          write: (state: State) => SerializedState
          read: (json: SerializedState) => State
        }
    },
  ): StoreWritable<State>
  createStore<State, SerializedState extends Json = Json>(
    defaultState: State,
    config?: {
      name?: string
      sid?: string
      updateFilter?: (update: State, current: State) => boolean
      serialize?:
        | 'ignore'
        | {
            write: (state: State) => SerializedState
            read: (json: SerializedState) => State
          }
    },
  ): StoreWritable<State>
  sid: string | null
  compositeName: CompositeName
  shortName: string
  getType(): string
  history: {
    domains: Set<Domain>
    stores: Set<StoreWritable<any>>
    effects: Set<Effect<any, any, any>>
    events: Set<EventCallable<any>>
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
  meta?: Record<string, any>
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
  meta?: Record<string, any>
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
  meta?: Record<string, any>
}): void

/**
 * Method to create an event subscribed to given observable
 * @param observable object with `subscribe` method, e.g. rxjs stream or redux store
 */
export function fromObservable<T>(observable: unknown): Event<T>
/**
 * Creates an event
 */
export function createEvent<E = void>(eventName?: string): EventCallable<E>
/**
 * Creates an event
 */
export function createEvent<E = void>(config: {
  name?: string
  sid?: string
  domain?: Domain
}): EventCallable<E>

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
  domain?: Domain
}): EffectByHandler<FN, Error>
/**
 * Creates an effect
 */
export function createEffect<Params, Done, Fail = Error>(
  effectName?: string,
  config?: {
    handler?: (params: Params) => Promise<Done> | Done
    sid?: string
    domain?: Domain
  },
): Effect<Params, Done, Fail>
/**
 * Creates an effect
 */
export function createEffect<FN extends Function>(config: {
  name?: string
  handler: FN
  sid?: string
  domain?: Domain
}): EffectByHandler<FN, Error>
/**
 * Creates an effect
 */
export function createEffect<Params, Done, Fail = Error>(config: {
  name?: string
  handler?: (params: Params) => Promise<Done> | Done
  sid?: string
  domain?: Domain
}): Effect<Params, Done, Fail>

/**
 * Creates a store
 * @param defaultState default state
 * @param config optional configuration object
 */
export function createStore<State, SerializedState extends Json = Json>(
  defaultState: State,
  config?: {
    skipVoid?: boolean;
    name?: string;
    sid?: string
    updateFilter?: (update: State, current: State) => boolean
    serialize?:
    | 'ignore'
    | {
        write: (state: State) => SerializedState
        read: (json: SerializedState) => State
      }
    domain?: Domain;
  },
): StoreWritable<State>

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
  store: StoreWritable<S>,
  api: Api,
): {
  [K in keyof Api]: ((store: S, e: void) => (S | void)) extends Api[K]
    ? EventCallable<void>
    : Api[K] extends ((store: S) => (S | void))
    ? EventCallable<void>
    : Api[K] extends ((store: S, e: infer E) => (S | void))
    ? EventCallable<E extends void ? Exclude<E, undefined> | void : E>
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
): StoreWritable<Done>
/**
 * Creates a Store out of successful results of Effect.
 * It works like a shortcut for `createStore(defaultState).on(effect.done, (_, {result}) => result)`
 * @param effect source effect
 * @param defaultState initial state of new store
 */
export function restore<Done>(
  effect: Effect<any, Done, any>,
  defaultState: null,
): StoreWritable<Done | null>
/**
 * Creates a Store from Event.
 * It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`
 * @param event source event
 * @param defaultState initial state of new store
 */
export function restore<E>(event: Event<E>, defaultState: E): StoreWritable<E>
/**
 * Creates a Store from Event.
 * It works like a shortcut for `createStore(defaultState).on(event, (_, payload) => payload)`
 * @param event source event
 * @param defaultState initial state of new store
 */
export function restore<E>(event: Event<E>, defaultState: null): StoreWritable<E | null>
export function restore<T extends Event<any>>(event: T): never
export function restore<T extends Effect<any, any, any>>(effect: T): never
export function restore<State extends {[key: string]: Store<any> | any}>(
  state: State,
): {
  [K in keyof State]: State[K] extends Store<infer S>
    ? StoreWritable<S>
    : StoreWritable<State[K]>
}

/**
 * Creates a domain
 */
export function createDomain(domainName?: string, config?: { domain?: Domain }): Domain
export function createDomain(config?: { name?: string; domain?: Domain }): Domain

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
type Target = UnitTargetable<any> | Tuple<any>

type ValidateSampleConfig<
  RawConfig,
  FnValid extends ('yes' | 'no') = RawConfig extends {fn: infer CheckFN}
  ? CheckFN extends ((...args: any[]) => void)
    ? 'yes'
    : 'no'
  : 'yes',
  ClockValid extends ('yes' | 'no') = RawConfig extends {clock: infer CheckClock}
  ? CheckClock extends (Unit<any> | RoTuple<Unit<any>>)
    ? 'yes'
    : 'no'
  : 'yes',
  TargetValid extends ('yes' | 'no') = RawConfig extends {target: infer CheckTarget}
  ? CheckTarget extends (Unit<any> | RoTuple<Unit<any>>)
    ? 'yes'
    : 'no'
  : 'yes',
  SourceValid extends ('yes' | 'no') = RawConfig extends {source: infer CheckSource}
  ? CheckSource extends (Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>)
    ? 'yes'
    : 'no'
  : 'yes',
  FilterValid extends ('yes' | 'no') = RawConfig extends {filter: infer CheckFilter}
  ? CheckFilter extends (Store<boolean> | ((...args: any[]) => boolean))
    ? 'yes'
    : 'no'
  : 'yes'
> = [FnValid, ClockValid, TargetValid, SourceValid, FilterValid] extends Tuple<'yes'>
  ? ['good', unknown]
  : [
      'bad',
      (
        FnValid extends 'no'
        ? {fn: () => any}
        : {}
      ) & (
        ClockValid extends 'no'
        ? {clock: Unit<any> | Array<Unit<any>>}
        : {}
      ) & (
        TargetValid extends 'no'
        ? {target: Unit<any> | Array<Unit<any>>}
        : {}
      ) & (
        SourceValid extends 'no'
        ? {source: Unit<any> | RoTuple<Store<any>> | Record<string, Store<any>>}
        : {}
      ) & (
        FilterValid extends 'no'
        ? {filter: Store<boolean> | (() => boolean)}
        : {}
      )
    ]

type SampleImpl<
  Target,
  Source,
  Clock,
  FilterFun,
  FN,
  FNInf,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? FLUnitOrBool extends BooleanConstructor
        ? NonNullable<TypeOfSource<Source>>
        : TypeOfSource<Source>
      : never
    ),
  FNInfClock extends (
    Clock extends Units
      ? FLUnitOrBool extends BooleanConstructor
        ? NonNullable<TypeOfClock<Clock>>
        : TypeOfClock<Clock>
      : never
  ),
  FNAltArg,
  FLUnitOrBool,
  RawConfig
> = ValidateSampleConfig<RawConfig> extends ['bad', infer ConfigWithError]
  ? [error: ConfigWithError]
  // no target
  : unknown extends Target
    // no target, no source
    ? unknown extends Source
      // no target, no source, has clock
      ? SampleFilterDef<
          ModeSelector<
            'clock |        | filter | fn |       ',
            'clock |        | filter |    |       ',
            'clock |        |        | fn |       ',
            'clock |        |        |    |       ',
            RawConfig
          >,
          Source, Clock, FLUnitOrBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, RawConfig
        >
        // no target, has source
      : unknown extends Clock
        // no target, has source, no clock
        ? SampleFilterDef<
            ModeSelector<
              '      | source | filter | fn |       ',
              '      | source | filter |    |       ',
              '      | source |        | fn |       ',
              '      | source |        |    |       ',
              RawConfig
            >,
            Source, Clock, FLUnitOrBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, RawConfig
          >
        // no target, has source, has clock
        : SampleFilterDef<
            ModeSelector<
              'clock | source | filter | fn |       ',
              'clock | source | filter |    |       ',
              'clock | source |        | fn |       ',
              'clock | source |        |    |       ',
              RawConfig
            >,
            Source, Clock, FLUnitOrBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, RawConfig
          >
    // has target
    : Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>
        // has target, no source
      ? unknown extends Source
        // has target, no source, has clock
        ? SampleFilterTargetDef<
            ModeSelector<
              'clock |        | filter | fn | target',
              'clock |        | filter |    | target',
              'clock |        |        | fn | target',
              'clock |        |        |    | target',
              RawConfig
            >,
            Target, Source, Clock, FLUnitOrBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, RawConfig
          >
          // has target, has source
        : unknown extends Clock
          // has target, has source, no clock
          ? SampleFilterTargetDef<
              ModeSelector<
                '      | source | filter | fn | target',
                '      | source | filter |    | target',
                '      | source |        | fn | target',
                '      | source |        |    | target',
                RawConfig
              >,
              Target, Source, Clock, FLUnitOrBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, RawConfig
            >
          // has target, has source, has clock
          : SampleFilterTargetDef<
              ModeSelector<
                'clock | source | filter | fn | target',
                'clock | source | filter |    | target',
                'clock | source |        | fn | target',
                'clock | source |        |    | target',
                RawConfig
              >,
              Target, Source, Clock, FLUnitOrBool, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, RawConfig
            >
      : [error: {
          target: Target extends RoTuple<Unit<any>>
            ? {[K in keyof Target]: ReplaceDerivedUnitWithWritable<Target[K]>}
            : ReplaceDerivedUnitWithWritable<Target>
          error: 'derived units are not allowed in target'
        }]

type ModeSelector<
  FilterAndFN,
  FilterOnly,
  FNOnly,
  None,
  RawConfig,
> = unknown extends RawConfig
  ? FilterAndFN
  : RawConfig extends {fn: any; filter: any}
    ? FilterAndFN
    : RawConfig extends {filter: any}
      ? FilterOnly
      : RawConfig extends {fn: any}
        ? FNOnly
        : None

type SampleRet<
  Target,
  Source,
  Clock,
  FLUnitOrBool,
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
  RawConfig
> = unknown extends Target
    ? unknown extends Clock
      ? unknown extends Source
        ? never
        : Source extends Unit<any> | SourceRecord
          // has filter, has fn
          ? unknown extends RawConfig
            ? FLUnitOrBool extends Unit<any>
              ? FN extends (src: TypeOfSource<Source>) => any
                ? EventAsReturnType<ReturnType<FN>>
                : never
              : FLUnitOrBool extends BooleanConstructor
                ? FNAltArg extends (arg: NonNullable<TypeOfSource<Source>>) => any
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
            : RawConfig extends {filter: any; fn: any}
              ? FLUnitOrBool extends Unit<any>
                ? FN extends (src: TypeOfSource<Source>) => any
                  ? EventAsReturnType<ReturnType<FN>>
                  : never
                : FLUnitOrBool extends BooleanConstructor
                  ? FNAltArg extends (arg: NonNullable<TypeOfSource<Source>>) => any
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
              : RawConfig extends {fn: any}
                ? FN extends (src: TypeOfSource<Source>) => any
                  ? Source extends Store<any> | SourceRecord
                    ? Store<ReturnType<FN>>
                    : EventAsReturnType<ReturnType<FN>>
                  : never
                // has filter, no fn
                : RawConfig extends {filter: any}
                  ? FLUnitOrBool extends Unit<any>
                    ? EventAsReturnType<TypeOfSource<Source>>
                    : FLUnitOrBool extends BooleanConstructor
                      ? EventAsReturnType<NonNullable<TypeOfSource<Source>>>
                      : FilterFun extends (src: TypeOfSource<Source>) => src is FNInfSource
                        ? EventAsReturnType<FNInfSource>
                        : EventAsReturnType<TypeOfSource<Source>>
                  // no filter, no fn
                  : Source extends Store<any> | SourceRecord
                    ? Store<TypeOfSource<Source>>
                    : EventAsReturnType<TypeOfSource<Source>>
          : never
      : unknown extends Source
        ? Clock extends Units
          // has filter, has fn
          ? unknown extends RawConfig
            ? FLUnitOrBool extends Unit<any>
              ? FN extends (clk: TypeOfClock<Clock>) => any
                ? EventAsReturnType<ReturnType<FN>>
                : never
              : FLUnitOrBool extends BooleanConstructor
                ? FNAltArg extends (arg: NonNullable<TypeOfClock<Clock>>) => any
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
            : RawConfig extends {filter: any; fn: any}
              ? FLUnitOrBool extends Unit<any>
                ? FN extends (clk: TypeOfClock<Clock>) => any
                  ? EventAsReturnType<ReturnType<FN>>
                  : never
                : FLUnitOrBool extends BooleanConstructor
                  ? FNAltArg extends (arg: NonNullable<TypeOfClock<Clock>>) => any
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
              : RawConfig extends {fn: any}
                ? FN extends (clk: TypeOfClock<Clock>) => any
                  ? Clock extends Store<any>
                    ? Store<ReturnType<FN>>
                    : EventAsReturnType<ReturnType<FN>>
                  : never
                // has filter, no fn
                : RawConfig extends {filter: any}
                  ? FLUnitOrBool extends Unit<any>
                    ? EventAsReturnType<TypeOfClock<Clock>>
                    : FLUnitOrBool extends BooleanConstructor
                      ? EventAsReturnType<NonNullable<TypeOfClock<Clock>>>
                      : FilterFun extends (clk: TypeOfClock<Clock>) => clk is FNInfClock
                        ? EventAsReturnType<FNInfClock>
                        : EventAsReturnType<TypeOfClock<Clock>>
                  // no filter, no fn
                  : Clock extends Store<any>
                    ? Store<TypeOfClock<Clock>>
                    : EventAsReturnType<TypeOfClock<Clock>>
          : never
        : Clock extends Units
          ? Source extends Unit<any> | SourceRecord
            // has filter, has fn
            ? unknown extends RawConfig
              ? FLUnitOrBool extends Unit<any>
                ? FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                  ? EventAsReturnType<ReturnType<FN>>
                  : never
                : FLUnitOrBool extends BooleanConstructor
                  ? FNAltArg extends (arg: NonNullable<TypeOfSource<Source>>, clk: TypeOfClock<Clock>) => any
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
              : RawConfig extends {filter: any; fn: any}
                ? FLUnitOrBool extends Unit<any>
                  ? FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                    ? EventAsReturnType<ReturnType<FN>>
                    : never
                  : FLUnitOrBool extends BooleanConstructor
                    ? FNAltArg extends (arg: NonNullable<TypeOfSource<Source>>, clk: TypeOfClock<Clock>) => any
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
                : RawConfig extends {fn: any}
                  ? FN extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
                    ? [Clock, Source] extends [Store<any>, Store<any> | SourceRecord]
                      ? Store<ReturnType<FN>>
                      : EventAsReturnType<ReturnType<FN>>
                    : never
                  // has filter, no fn
                  : RawConfig extends {filter: any}
                    ? FLUnitOrBool extends Unit<any>
                      ? EventAsReturnType<TypeOfSource<Source>>
                      : FLUnitOrBool extends BooleanConstructor
                        ? EventAsReturnType<NonNullable<TypeOfSource<Source>>>
                        : FilterFun extends (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
                          ? EventAsReturnType<FNInfSource>
                          : EventAsReturnType<TypeOfSource<Source>>
                    // no filter, no fn
                    : [Clock, Source] extends [Store<any>, Store<any> | SourceRecord]
                      ? Store<TypeOfSource<Source>>
                      : EventAsReturnType<TypeOfSource<Source>>
            : never
          : never
    : Target

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
  const Target,
  const Source,
  const Clock,
  const FNNonFalsy extends (
    Source extends Unit<any> | SourceRecord
    ? NonNullable<TypeOfSource<Source>>
    : Clock extends Units
      ? NonNullable<TypeOfClock<Clock>>
      : never
  ),
  const RawConfig,
  const SourceNoConf,
  const ClockNoConf,
  const FNSrcNoConf extends (
    SourceNoConf extends Unit<any> | SourceRecord
      ? (src: TypeOfSource<SourceNoConf>) => any
      : never
  ),
  const FNBothNoConf extends (
    SourceNoConf extends Unit<any> | SourceRecord
      ? ClockNoConf extends Units
        ? ((src: TypeOfSource<SourceNoConf>, clk: TypeOfClock<ClockNoConf>) => any)
        : never
      : never
  ),
  const FLUnitOrBool,
  const FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? FLUnitOrBool extends BooleanConstructor
        ? NonNullable<TypeOfSource<Source>>
        : TypeOfSource<Source>
      : never
    ),
  const FNInfClock extends (
    Clock extends Units
      ? FLUnitOrBool extends BooleanConstructor
        ? NonNullable<TypeOfClock<Clock>>
        : TypeOfClock<Clock>
      : never
  ),
  const Args extends any[],
  const FilterFun = (
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
  const FN = (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => any
      : (src: TypeOfSource<Source>) => any
    : Clock extends Units
      ? (clk: TypeOfClock<Clock>) => any
      : never
  ),
  const FNInf = (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (src: FNInfSource, clk: TypeOfClock<Clock>) => any
      : (src: FNInfSource) => any
    : Clock extends Units
      ? (clk: FNInfClock) => any
      : never
  ),
  const FNAltArg = (
    Source extends Unit<any> | SourceRecord
    ? Clock extends Units
      ? (src: FNNonFalsy, clk: TypeOfClock<Clock>) => any
      : (src: FNNonFalsy) => any
    : Clock extends Units
      ? (clk: FNNonFalsy) => any
      : never
  ),
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
          : SampleImpl<Target, Source, Clock, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, FLUnitOrBool, RawConfig>
    : SampleImpl<Target, Source, Clock, FilterFun, FN, FNInf, FNInfSource, FNInfClock, FNAltArg, FLUnitOrBool, RawConfig>
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
        : never
    : [any, any] extends Args
      ? SourceNoConf extends Store<any>
        ? Store<ReturnType<FNSrcNoConf>>
        : EventAsReturnType<ReturnType<FNSrcNoConf>>
      : Args extends [Unit<any>]
        ? SourceNoConf extends Store<any>
          ? Store<TypeOfSource<SourceNoConf>>
          : EventAsReturnType<TypeOfSource<SourceNoConf>>
        : NoInfer<SampleRet<Target, Source, Clock, FLUnitOrBool, FilterFun, FN, FNAltArg, FNInf, FNInfSource, FNInfClock, RawConfig>>
  : NoInfer<SampleRet<Target, Source, Clock, FLUnitOrBool, FilterFun, FN, FNAltArg, FNInf, FNInfSource, FNInfClock, RawConfig>>

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

type TargetConfigCheck<
  Mode extends Mode_Trg,
  Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>,
  Source,
  Clock,
  FN,
  Config,
  RawConfig
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
        Config, RawConfig,
        FN,
        'noSrc',
        'noClk'
      >
    : [error: {
        fn: DataSourceFunction<Source, Clock>
        error: 'fn parameters should match clock/source types'
      }]
    // mode with source only or with both clock and source
  : Mode extends Mode_Src
  ? TargetOrError<
      TypeOfSource<Source>,
      'src',
      Target,
      Config, RawConfig,
      'noFn',
      Source,
      Clock
    >
    // mode with clock only
  : Mode extends Mode_Clk_NoSrc
  ? TargetOrError<
      TypeOfClock<Clock>,
      'clk',
      Target,
      Config, RawConfig,
      'noFn',
      'noSrc',
      Clock
    >
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

type TargetTypeSimple<Target> = Target extends Unit<infer TargetType>
  ? TargetType
  : Target extends RoTuple<Unit<infer TargetType>>
    ? TargetType
    : never

type SampleFilterTargetDef<
  Mode extends Mode_Trg,
  Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>,
  Source,
  Clock,
  FLUnitOrBool,
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
  RawConfig
> = Mode extends Mode_Flt_Trg
  ? FLUnitOrBool extends Unit<any>
    ? boolean extends UnitValue<FLUnitOrBool>
      ? TargetConfigCheck<
          Mode, Target, Source, Clock, FN,
          ToResultConfig<
            Mode,
            Clock,
            Source,
            FLUnitOrBool,
            FN,
            Target
          >,
          RawConfig
        >
      : [error: {
        fn: DataSourceFunction<Source, Clock>
        error: 'fn parameters should match clock/source types'
      }]
    : FLUnitOrBool extends BooleanConstructor
      ? Mode extends Mode_Flt_Fn_Trg
        ? FNAltArg extends (arg?: any, clk?: any) => any
          ? TargetOrError<
              ReturnType<FNAltArg>,
              'fnRet',
              Target,
              ToResultConfig<Mode, Clock, Source, FLUnitOrBool, FNAltArg, Target>,
              RawConfig,
              FNAltArg,
              'noSrc',
              'noClk'
            >
          : never
          // mode with source only or with both clock and source
        : Mode extends Mode_Src_Flt_NoFn_Trg
        ? TargetOrError<
            NonNullable<TypeOfSource<Source>>,
            'src',
            Target,
            ToResultConfig<Mode, Clock, Source, FLUnitOrBool, never, Target>,
            RawConfig,
            'noFn',
            Source,
            Clock
          >
          // mode with clock only
        : Mode extends Mode_Clk_NoSrc
        ? TargetOrError<
            NonNullable<TypeOfClock<Clock>>,
            'clk',
            Target,
            ToResultConfig<Mode, Clock, Source, FLUnitOrBool, never, Target>,
            RawConfig,
            'noFn',
            'noSrc',
            Clock
          >
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
        ? TargetOrError<
            SafeReturn<FNInf>,
            'fnRet',
            Target,
            ToResultConfig<
              Mode,
              Clock,
              Source,
              (
                Source extends Unit<any> | SourceRecord
                ? Clock extends Units
                  ? (src: TypeOfSource<Source>, clk: TypeOfClock<Clock>) => src is FNInfSource
                  : (src: TypeOfSource<Source>) => src is FNInfSource
                : Clock extends Units
                  ? (clk: TypeOfClock<Clock>) => clk is FNInfClock
                  : never
              ),
              (
                Source extends Unit<any> | SourceRecord
                ? Clock extends Units
                  ? (src: FNInfSource, clk: TypeOfClock<Clock>) => TargetTypeSimple<Target>
                  : (src: FNInfSource) => TargetTypeSimple<Target>
                : Clock extends Units
                  ? (clk: FNInfClock) => TargetTypeSimple<Target>
                  : never
              ),
              Target
            >,
            RawConfig,
            FNInf,
            // dont need source and clock types for case with filter infer
            'noSrc',
            'noClk'
          >
          // mode with source only or with both clock and source
        : Mode extends Mode_Src_Flt_NoFn_Trg
        ? TargetOrError<
            InferredType<Source, Clock, FilterFun>,
            'src',
            Target,
            ToResultConfig<Mode, Clock, Source, FilterFun, never, Target>,
            RawConfig,
            'noFn',
            'noSrc',
            'noClk'
          >
          // mode with clock only
        : Mode extends Mode_Clk_NoSrc
        ? TargetOrError<
            InferredType<Source, Clock, FilterFun>,
            'clk',
            Target,
            ToResultConfig<Mode, Clock, Source, FilterFun, never, Target>,
            RawConfig,
            'noFn',
            'noSrc',
            Clock
          >
        : never
    // mode with fn
    : Mode extends Mode_Flt_Fn_Trg
      ? FN extends DataSourceFunction<Source, Clock>
        ? TargetOrError<
            ReturnType<FN>,
            'fnRet',
            Target,
            ToResultConfig<Mode, Clock, Source, FilterFun, FN, Target>,
            RawConfig,
            FN,
            'noSrc',
            'noClk'
          >
        : [error: {
            fn: DataSourceFunction<Source, Clock>
            error: 'fn parameters should match clock/source types'
          }]
        // mode with source only or with both clock and source
      : Mode extends Mode_Src_Flt_NoFn_Trg
      ? TargetOrError<
          TypeOfSource<Source>,
          'src',
          Target,
          ToResultConfig<Mode, Clock, Source, FilterFun, never, Target>,
          RawConfig,
          'noFn',
          Source,
          Clock
        >
        // mode with clock only
      : Mode extends Mode_Clk_NoSrc
      ? TargetOrError<
          TypeOfClock<Clock>,
          'clk',
          Target,
          ToResultConfig<Mode, Clock, Source, FilterFun, never, Target>,
          RawConfig,
          'noFn',
          'noSrc',
          Clock
        >
      : never

  : Mode extends Mode_NoFlt
    ? FN extends DataSourceFunction<Source, Clock>
      ? TargetConfigCheck<
          Mode, Target, Source, Clock, FN,
          ToResultConfig<Mode, Clock, Source, never, FN, Target>,
          RawConfig
        >
      : [error: {
        fn: DataSourceFunction<Source, Clock>
        error: 'fn parameters should match clock/source types'
      }]
    : never

type RebuildClockTargetLoop<
  ClockUnit,
  ClockType,
  Target extends readonly unknown[]
> = Target extends readonly [Unit<infer TargetType>, ...infer TargetRest]
  ? [ClockType] extends [TargetType]
    ? RebuildClockTargetLoop<ClockUnit, ClockType, TargetRest>
    : WhichType<TargetType> extends 'void'
      ? ClockUnit
      : Unit<TargetType>
  : ClockUnit

type RebuildClockLoopBranch<
  Clock extends readonly unknown[],
  Target extends readonly unknown[],
  Result extends RoTuple<Unit<any>>,
  FilterMode extends ('noFilter' | 'Boolean')
> = Clock extends readonly [infer ClockUnit, ...infer ClockRest]
  ? ClockUnit extends Unit<infer ClockType>
    ? RebuildClockLoopBranch<
      ClockRest,
      Target,
      [
        ...Result,
        RebuildClockTargetLoop<
          ClockUnit,
          FilterMode extends 'noFilter' ? ClockType : NonNullable<ClockType>,
          Target
        >
      ],
      FilterMode
    >
    : never
  : Result

type RebuildClockLoop<
  Clock extends readonly unknown[],
  Target extends readonly unknown[],
  Result extends RoTuple<Unit<any>>,
  FilterMode extends ('noFilter' | 'Boolean')
> = Clock extends readonly [infer ForceFirst, ...infer ForceRest]
  ? RebuildClockLoopBranch<
    Clock,
    Target,
    Result,
    FilterMode
  >
  // non-inline array unable to match condition above
  // so we handle it in separate branch
  : Clock extends Array<UnitTargetable<infer ClockType>>
    ? Array<RebuildClockTargetLoop<
      UnitTargetable<ClockType>,
      ClockType,
      Target
    >>
    : never

type RebuildClockSingle<
  Clock,
  Target extends readonly unknown[],
  FilterMode extends ('noFilter' | 'Boolean')
> = Clock extends Unit<infer ClockType>
    ? RebuildClockTargetLoop<
      Clock,
      FilterMode extends 'noFilter' ? ClockType : NonNullable<ClockType>,
      Target
    >
    : never

type ToResultConfig<
  Mode,
  Clock,
  Source,
  Filter,
  FN,
  Target,
> = Mode extends 'clock | source | filter | fn | target'
  ? {clock: Clock; source: Source; filter?: Filter; fn?: FN; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock | source | filter |    | target'
  ? {clock: Clock; source: Source; filter: Filter; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends '      | source | filter | fn | target'
  ? {source: Source; clock?: never; filter?: Filter; fn?: FN; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends '      | source | filter |    | target'
  ? {source: Source; clock?: never; filter: Filter; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock |        | filter | fn | target'
  ? {clock: Clock; source?: never; filter?: Filter; fn?: FN; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock |        | filter |    | target'
  ? {clock: Clock; source?: never; filter: Filter; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock | source |        | fn | target'
  ? {clock: Clock; source: Source; filter?: never; fn: FN; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock | source |        |    | target'
  ? {clock: Clock; source: Source; filter?: never; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends '      | source |        | fn | target'
  ? {source: Source; clock?: never; filter?: never; fn: FN; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends '      | source |        |    | target'
  ? {source: Source; clock?: never; filter?: never; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock |        |        | fn | target'
  ? {clock: Clock; source?: never; filter?: never; fn: FN; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock |        |        |    | target'
  ? {clock: Clock; source?: never; filter?: never; target: Target; greedy?: boolean; batch?: boolean}
  : Mode extends 'clock | source | filter | fn |       '
  ? {clock: Clock; source: Source; filter?: Filter; fn?: FN; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock | source | filter |    |       '
  ? {clock: Clock; source: Source; filter: Filter; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends '      | source | filter | fn |       '
  ? {source: Source; clock?: never; filter?: Filter; fn?: FN; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends '      | source | filter |    |       '
  ? {source: Source; clock?: never; filter: Filter; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock |        | filter | fn |       '
  ? {clock: Clock; source?: never; filter?: Filter; fn?: FN; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock |        | filter |    |       '
  ? {clock: Clock; source?: never; filter: Filter; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock | source |        | fn |       '
  ? {clock: Clock; source: Source; filter?: never; fn: FN; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock | source |        |    |       '
  ? {clock: Clock; source: Source; filter?: never; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends '      | source |        | fn |       '
  ? {source: Source; clock?: never; filter?: never; fn: FN; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends '      | source |        |    |       '
  ? {source: Source; clock?: never; filter?: never; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock |        |        | fn |       '
  ? {clock: Clock; source?: never; filter?: never; fn: FN; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : Mode extends 'clock |        |        |    |       '
  ? {clock: Clock; source?: never; filter?: never; target?: never; greedy?: boolean; batch?: boolean; name?: string}
  : never

type IsFnRetSubtypeExtendsTarget<
  FnRetSubtype,
  TargetType,
  TargetSubtype = GetUnionLast<TargetType>
> =
  [FnRetSubtype] extends [TargetType]
  ? [TargetSubtype] extends [never]
    ? [TargetType] extends [never]
      ? 'no'
      : [FnRetSubtype] extends [TargetType]
        ? 'yes'
        : 'no'
    : [FnRetSubtype] extends [TargetSubtype]
      ? 'yes'
      : IsFnRetSubtypeExtendsTarget<FnRetSubtype, Exclude<TargetType, TargetSubtype>>
  : 'no'

type RebuildTargetValueByFnReturn<
  TargetType,
  FnRetType,
  FnRetSubtype = GetUnionLast<FnRetType>
> = [FnRetSubtype] extends [never]
  ? [FnRetType] extends [never]
    ? TargetType
    : IsFnRetSubtypeExtendsTarget<FnRetType, TargetType> extends 'no'
      ? FnRetType
      : TargetType
  : IsFnRetSubtypeExtendsTarget<FnRetSubtype, TargetType> extends 'no'
    ? FnRetSubtype
    : RebuildTargetValueByFnReturn<TargetType, Exclude<FnRetType, FnRetSubtype>>

type RebuildTargetClockLoopBranch<
  FilterMode extends ('noFilter' | 'Boolean'),
  ClockTypeRaw,
  TargetType,
  ClockRest extends readonly unknown[],
  TargetUnit,
  ClockType = FilterMode extends 'Boolean' ? NonNullable<ClockTypeRaw> : ClockTypeRaw
> = [ClockType] extends [TargetType]
  ? RebuildTargetClockLoop<ClockRest, TargetUnit, TargetType, FilterMode>
  : UnitTargetable<ClockTypeRaw>

type RebuildTargetClockLoop<
  Clock extends readonly unknown[],
  TargetUnit,
  TargetType,
  FilterMode extends ('noFilter' | 'Boolean')
> = WhichType<TargetType> extends 'void'
  ? TargetUnit
  : Clock extends readonly [Unit<infer ClockTypeRaw>, ...infer ClockRest]
    ? RebuildTargetClockLoopBranch<
      FilterMode,
      ClockTypeRaw,
      TargetType,
      ClockRest,
      TargetUnit
    >
    : TargetUnit

type RebuildTargetLoopBranch<
  Clock extends readonly unknown[],
  Target extends readonly unknown[],
  Result extends RoTuple<UnitTargetable<any>>,
  FilterMode extends ('noFilter' | 'Boolean')
> = Target extends readonly [infer TargetUnit, ...infer TargetRest]
  ? TargetUnit extends UnitTargetable<infer TargetType>
    ? RebuildTargetLoopBranch<
      Clock,
      TargetRest,
      [
        ...Result,
        RebuildTargetClockLoop<Clock, TargetUnit, TargetType, FilterMode>
      ],
      FilterMode
    >
    : never
  : Result

type RebuildTargetLoop<
  Clock extends readonly unknown[],
  Target extends readonly unknown[],
  Result extends RoTuple<UnitTargetable<any>>,
  FilterMode extends ('noFilter' | 'Boolean')
> = Target extends readonly [infer TargetUnit, ...infer TargetRest]
  ? RebuildTargetLoopBranch<
    Clock,
    Target,
    Result,
    FilterMode
  >
  // non-inline array unable to match condition above
  // so we handle it in separate branch
  : Target extends Array<UnitTargetable<infer TargetType>>
    ? Array<RebuildTargetClockLoop<
      Clock,
      UnitTargetable<TargetType>,
      TargetType,
      FilterMode
    >>
    : never

type RebuildTargetSingle<
  Clock extends readonly unknown[],
  Target,
  FilterMode extends ('noFilter' | 'Boolean')
> = Target extends Unit<infer TargetType>
    ? RebuildTargetClockLoop<Clock, Target, TargetType, FilterMode>
    : never

type SafeReturn<F> = F extends () => void ? ReturnType<F> : never

type TargetOrError<
  MatchingValue,
  Mode extends 'fnRet' | 'src' | 'clk',
  Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>,
  ResultConfig,
  SourceConfig,
  FN,
  Source,
  Clock
> = [
    Mode,
    Source,
    SourceConfig extends {fn: any} ? 'fn' : 'noFn',
    SourceConfig extends {filter: any}
      ? SourceConfig extends {filter: BooleanConstructor}
        ? 'boolOrNoFilter'
        : 'hasFilter'
      : 'boolOrNoFilter'
  ] extends ['clk', 'noSrc', 'noFn', 'boolOrNoFilter']
    ? SourceConfig extends {filter: any}
      ? SourceConfig extends {filter: BooleanConstructor}
        ? [Omit<ResultConfig & SourceConfig, 'clock' | 'target'> & {
          clock: Clock extends readonly unknown[]
            ? RebuildClockLoop<
              Clock,
              Target extends ReadonlyArray<UnitTargetable<any>>
                ? Target
                : [Target],
              [],
              'Boolean'
            >
            : RebuildClockSingle<
              Clock,
              Target extends ReadonlyArray<UnitTargetable<any>>
                ? Target
                : [Target],
              'Boolean'
            >
          target: Target extends readonly unknown[]
            ? RebuildTargetLoop<
              Clock extends ReadonlyArray<Unit<any>>
                ? Clock
                : [Clock],
              Target,
              [],
              'Boolean'
            >
            : RebuildTargetSingle<
              Clock extends ReadonlyArray<Unit<any>>
                ? Clock
                : [Clock],
              Target,
              'Boolean'
            >
        }]
        : never
      : [Omit<ResultConfig & SourceConfig, 'clock' | 'target'> & {
          clock: Clock extends readonly unknown[]
            ? RebuildClockLoop<
              Clock,
              Target extends ReadonlyArray<UnitTargetable<any>>
                ? Target
                : [Target],
              [],
              'noFilter'
            >
            : RebuildClockSingle<
              Clock,
              Target extends ReadonlyArray<UnitTargetable<any>>
                ? Target
                : [Target],
              'noFilter'
            >
          target: Target extends readonly unknown[]
            ? RebuildTargetLoop<
              Clock extends ReadonlyArray<Unit<any>>
                ? Clock
                : [Clock],
              Target,
              [],
              'noFilter'
            >
            : RebuildTargetSingle<
              Clock extends ReadonlyArray<Unit<any>>
                ? Clock
                : [Clock],
              Target,
              'noFilter'
            >
        }]
    : [TypeOfTarget<MatchingValue, Target>] extends [Target]
      ? [config: ResultConfig & SourceConfig]
      : [Target] extends [TypeOfTargetSoft<MatchingValue, Target, Mode>]
        ? [config: ResultConfig & SourceConfig]
        : Mode extends 'fnRet'
          ? [error: {
              fn: (...args: Parameters<FN extends ((...args: any) => any) ? FN : any>) => TypeOfTargetVal<MatchingValue, Target>
              target: Target extends readonly any[]
                ? {
                  [K in keyof Target]: Unit<
                    RebuildTargetValueByFnReturn<UnitValue<Target[K]>, MatchingValue>
                  >
                }
                : Unit<RebuildTargetValueByFnReturn<UnitValue<Target>, MatchingValue>>
              error: 'fn result should extend target type'
            }]
          : Mode extends 'src'
            ? IsTargetWiderThanSource<MatchingValue, Target> extends 'yes'
              ? [error: {
                  source: IsUnion<GetSourceExtendedByTarget<Source, Target>> extends true
                    ? GetSourceExtendedByTargetOnlyIncorrect<Source, Target>
                    : GetSourceExtendedByTarget<Source, Target>
                  error: 'source should extend target type'
                }]
              : [error: {
                target: Target extends readonly any[]
                  ? {
                    [K in keyof Target]: Unit<MatchingValue>
                  }
                  : Unit<MatchingValue>
                error: 'source should extend target type'
              }]
            : IsTargetWiderThanSource<MatchingValue, Target> extends 'yes'
              ? [error: {
                  clock: GetClockExtendedByTarget<Clock, Target>
                  error: 'clock should extend target type'
                }]
              : [error: {
                target: Target extends readonly any[]
                  ? {
                    [K in keyof Target]: Unit<MatchingValue>
                  }
                  : Unit<MatchingValue>
                error: 'clock should extend target type'
              }]

type SampleFilterDef<
  Mode extends Mode_NoTrg,
  Source,
  Clock,
  FLUnitOrBool,
  FilterFun,
  FN,
  FNInf,
  FNInfSource extends (
    Source extends Unit<any> | SourceRecord
      ? FLUnitOrBool extends BooleanConstructor
        ? NonNullable<TypeOfSource<Source>>
        : TypeOfSource<Source>
      : never
    ),
  FNInfClock extends (
    Clock extends Units
      ? FLUnitOrBool extends BooleanConstructor
        ? NonNullable<TypeOfClock<Clock>>
        : TypeOfClock<Clock>
      : never
  ),
  RawConfig,
  SourceType = TypeOfSource<Source>,
  ClockType = TypeOfClock<Clock>,
> =
  Mode extends Mode_Flt
  ? FLUnitOrBool extends Unit<any>
    ? [config: ToResultConfig<Mode, Clock, Source, FLUnitOrBool, FN, never> & RawConfig]
    : FLUnitOrBool extends BooleanConstructor
      ? [config: ToResultConfig<Mode, Clock, Source, FLUnitOrBool, FNInf, never> & RawConfig]
      : FilterFun extends (
          Source extends Unit<any> | SourceRecord
          ? Clock extends Units
            ? (src: SourceType, clk: ClockType) => src is FNInfSource
            : (src: SourceType) => src is FNInfSource
          : Clock extends Units
            ? (clk: ClockType) => clk is FNInfClock
            : never
        )
        ? Mode extends Mode_Flt_Fn
          ? FNInf extends (
              Source extends Unit<any> | SourceRecord
              ? Clock extends Units
                ? (src: FNInfSource, clk: ClockType) => any
                : (src: FNInfSource) => any
              : Clock extends Units
                ? (clk: FNInfClock) => any
                : any
            )
            ? [config: ToResultConfig<Mode, Clock, Source, FilterFun, FNInf, never> & RawConfig]
            : [message: {
                error: 'fn should match inferred type'
                inferred: (Source extends Unit<any> | SourceRecord ? FNInfSource : FNInfClock)
                fnArg: FNInf extends (arg: infer Arg) => any ? Arg : never
              }]
          : [config: ToResultConfig<Mode, Clock, Source, FilterFun, never, never> & RawConfig]
      : [config: ToResultConfig<Mode, Clock, Source, FilterFun, FN, never> & RawConfig]
  : Mode extends Mode_NoFlt
  ? [config: ToResultConfig<Mode, Clock, Source, never, FN, never> & RawConfig]
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
  Target extends UnitTargetable<any>
    ? Target extends UnitTargetable<infer TargetType>
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
      ]: Target[K] extends UnitTargetable<infer TargetType>
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

type TypeOfTarget<SourceType, Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>> =
  Target extends UnitTargetable<any>
    ? Target extends UnitTargetable<infer TargetType>
      ? [SourceType] extends [Readonly<TargetType>]
        ? Target
        : WhichType<TargetType> extends ('void' | 'any')
          ? Target
          : SourceType
      : never
    : {
      [
        K in keyof Target
      ]: Target[K] extends UnitTargetable<infer TargetType>
        ? [SourceType] extends [Readonly<TargetType>]
          ? Target[K]
          : WhichType<TargetType> extends ('void' | 'any')
            ? Target[K]
            : SourceType
        : never
    }

type RebuildFnReturnByTarget<FnReturn, TargetType, TargetTypeSubset = GetUnionLast<TargetType>> =
  [TargetType] extends [never]
  ? ['same', null]
  : [TargetTypeSubset] extends [never]
    ? [FnReturn] extends [TargetType]
      ? ['same', null]
      : ['change', TargetType]
    : [FnReturn] extends [TargetTypeSubset]
      ? RebuildFnReturnByTarget<FnReturn, Exclude<TargetType, TargetTypeSubset>>
      : ['change', TargetTypeSubset]

type TypeOfTargetValLoop<SourceType, Target extends readonly unknown[]> =
  Target extends readonly [infer TargetUnit, ...infer TargetRest]
  ? TargetUnit extends Unit<infer TargetType>
    ? RebuildFnReturnByTarget<SourceType, TargetType> extends ['change', infer ReturnType]
      ? ReturnType
      : TypeOfTargetValLoop<SourceType, TargetRest>
    : never
  : SourceType
  

type TypeOfTargetVal<SourceType, Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>> =
  Target extends UnitTargetable<any>
    ? Target extends UnitTargetable<infer TargetType>
      ? RebuildFnReturnByTarget<SourceType, TargetType> extends ['change', infer ReturnType]
        ? ReturnType
        : SourceType
      : never
    : Target extends readonly [infer ForceFirst, ...infer ForceRest]
      ? TypeOfTargetValLoop<SourceType, Target>
      // branch for non inline arrays
      : never

type IsTargetWiderThanSource<SourceType, Target extends UnitsTarget | ReadonlyArray<UnitTargetable<any>>> =
  Target extends UnitTargetable<any>
    ? Target extends UnitTargetable<infer TargetType>
      ? [TargetType] extends [SourceType]
        ? 'yes'
        : 'no'
      : never
    : Target extends RoTuple<infer TU>
      ? TU extends UnitTargetable<infer TargetType>
        ? [TargetType] extends [SourceType]
          ? 'yes'
          : 'no'
        : never
      : never

// @link https://ghaiklor.github.io/type-challenges-solutions/en/medium-isunion.html
type IsUnion<T, U = T> =
(
	WhichType<T> extends 'never'
		? false
		: T extends any
			? [U] extends [T]
				? false
				: true
			: never
) extends infer Result
	// In some cases `Result` will return `false | true` which is `boolean`,
	// that means `T` has at least two types and it's a union type,
	// so we will return `true` instead of `boolean`.
	? boolean extends Result
    ? true
		: Result
  // Should never happen
	: never;

type UnionToIntersection<union> = (
  union extends any ? (k: union) => void : never
) extends (k: infer intersection) => void
  ? intersection
  : never;

type GetUnionLast<Union> = UnionToIntersection<
  Union extends any ? () => Union : never
> extends () => infer Last
  ? Last
  : never;

type UnionToTuple<Union, Tuple extends unknown[] = []> = [
  Union
] extends [never]
  ? Tuple
  : UnionToTuple<
      Exclude<Union, GetUnionLast<Union>>,
      [GetUnionLast<Union>, ...Tuple]
    >;

type GetSourceExtendedByTargetOnlyIncorrect<
  Source,
  Target
> = Target extends RoTuple<Unit<any>>
  ? GetSourceExtendedByTarget<Source, {
    [K in keyof Target]: UnitValue<Target[K]> extends GetShapeValue<Source>
      ? GetShapeValue<Source> extends UnitValue<Target[K]>
        ? never
        : Target[K]
      : Target[K]
  }>
  : GetSourceExtendedByTarget<Source, Target>

type GetSourceExtendedByTarget<
  Source,
  Target,
  TargetType = Target extends UnitTargetable<any>
    ? Target extends UnitTargetable<infer TargetType>
      ? TargetType
      : never
    : Target extends RoTuple<infer TU>
      ? TU extends UnitTargetable<infer TargetType>
        ? TargetType
        : never
      : never
> =
  Source extends (Record<string, Store<any>> | RoTuple<Store<any>>)
  ? {
    [K in keyof TargetType]: K extends keyof Source
      ? Source[K] extends StoreWritable<any>
        ? StoreWritable<TargetType[K]>
        : Store<TargetType[K]>
      : Store<TargetType[K]>
  }
  : Unit<TargetType>

type GetClockExtendedByTarget<
  Clock,
  Target,
  TargetType = Target extends UnitTargetable<any>
    ? Target extends UnitTargetable<infer TargetType>
      ? TargetType
      : never
    : Target extends RoTuple<infer TU>
      ? TU extends UnitTargetable<infer TargetType>
        ? TargetType
        : never
      : never
> =
  Clock extends RoTuple<Unit<any>>
  ? {
    [K in keyof Clock]: Unit<TargetType>
  }
  : Unit<TargetType>

type ReplaceDerivedUnitWithWritable<Target> =
  Target extends Unit<any>
  ? Target extends Store<infer T>
    ? StoreWritable<T>
    : Target extends Event<infer T>
      ? EventCallable<T>
      // case for effects
      : Target
  : never

type ClockValueOf<T> = T[keyof T]

type TypeOfSource<Source> =
  Source extends Unit<any>
  ? UnitValue<Source>
  : Source extends SourceRecord
    ? {[K in keyof Source]: UnitValue<Source[K]>}
    : never

type TypeOfClock<Clock> =
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

type SourceRecord = Record<string, Store<any>> | RoTuple<Store<any>>

type Units = Unit<any> | RoTuple<Unit<any>>
type UnitsTarget = UnitTargetable<any> | Tuple<UnitTargetable<any>>

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
  domain?: Domain
  name?: string
}): FX extends (source: any, ...args: infer Args) => infer Done
  ? Effect<OptionalParams<Args>, Awaited<Done>>
  : never
/**
 * Creates independent instance of given effect. Used to add subscribers to effect call in a particular business case
 * @returns new effect linked to given one
 */
export function attach<
  FX extends Effect<any, any, any>,
>(config: {
  effect: FX
  name?: string
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
export function withRegion<T = void>(unit: Unit<any> | Node, cb: () => T): T

/**
 * Helper type for combine
 */
type CombVal<T> = T extends Store<any> ? StoreValue<T> : T

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
export function combine<A, R>(source: Store<A>, fn: (source: A) => R, config?: {skipVoid: boolean}): Store<R>
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
  config?: {skipVoid: boolean}
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
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, R>(
  a: A,
  b: B,
  fn: (a: CombVal<A>, b: CombVal<B>) => R,
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, R>(
  a: A,
  b: B,
  c: C,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>) => R,
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>) => R,
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, E, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>) => R,
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, E, F, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>, f: CombVal<F>) => R,
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores into derived store, transforming values using the function
 * @param fn transformer function, accepts store values in separate arguments
 * @returns derived store updated upon changes in given ones
 */
export function combine<A, B, C, D, E, F, G, R>(
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>, f: CombVal<F>, g: CombVal<G>) => R,
  config?: {skipVoid: boolean}
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
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>, f: CombVal<F>, g: CombVal<G>, h: CombVal<H>) => R,
  config?: {skipVoid: boolean}
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
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>, f: CombVal<F>, g: CombVal<G>, h: CombVal<H>, i: CombVal<I>) => R,
  config?: {skipVoid: boolean}
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
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>, f: CombVal<F>, g: CombVal<G>, h: CombVal<H>, i: CombVal<I>, j: CombVal<J>) => R,
  config?: {skipVoid: boolean}
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
  a: A,
  b: B,
  c: C,
  d: D,
  e: E,
  f: F,
  g: G,
  h: H,
  i: I,
  j: J,
  k: K,
  fn: (a: CombVal<A>, b: CombVal<B>, c: CombVal<C>, d: CombVal<D>, e: CombVal<E>, f: CombVal<F>, g: CombVal<G>, h: CombVal<H>, i: CombVal<I>, j: CombVal<J>, k: CombVal<K>) => R,
  config?: {skipVoid: boolean}
): Store<R>
/**
 * Convert given stores to store with array which values updated upon changes in given ones
 * @returns derived store
 */
export function combine<T extends Tuple<Store<any> | any>>(
  ...stores: T
): Store<{[K in keyof T]: T[K] extends Store<infer U> ? U : T[K]}>

/**
 * Fully isolated instance of application. The primary purpose of scope includes SSR and testing
 */
export interface Scope extends Unit<any> {
  getState<T>(store: Store<T>): T
}

export type ValueMap = Map<StoreWritable<any>, any> | Array<[StoreWritable<any>, any]> | {[sid: string]: any}

/**
 * Serialize store values from given scope
 * @returns object with saved values
 */
export function serialize(
  scope: Scope,
  options?: {ignore?: Array<Store<any>> },
): {[sid: string]: any}

/**
 * Bind event to a scope to be called later.
 *
 * When `scope` is not provided this method retrieve scope implicitly from scope of the handler (effect handler or watch function) inside which it's being called
 * @param unit event to bind
 * @returns function which will trigger an event in a given scope
 */
export function scopeBind<T>(unit: EventCallable<T>, opts?: {scope?: Scope; safe?: boolean}): (payload: T) => void
/**
 * Bind effect to a scope to be called later.
 *
 * When `scope` is not provided this method retrieve scope implicitly from scope of the handler (effect handler or watch function) inside which it's being called
 * @param unit effect to bind
 * @returns function which will trigger an effect in a given scope and returns a promise with a result
 */
export function scopeBind<P, D, F = Error>(unit: Effect<P, D, F>, opts?: {scope?: Scope; safe?: boolean}): (params: P) => Promise<D>

/**
 * Bind arbitary callback to a scope to be called later.
 * When `scope` is not provided this method retrieve scope implicitly from scope of the handler (effect handler or watch function) inside which it's being called
 * @param unit effect to bind
 * @returns function which will trigger an effect in a given scope and returns a promise with a result
 */
export function scopeBind<T extends Function>(fn: T, opts?: {scope?: Scope; safe?: boolean}): T

// fork types
type Handlers = Map<Effect<any, any, any>, Function> | Array<[Effect<any, any, any>, Function]> | {[sid: string]: Function};
type SerializedState = Record<string, unknown>;
type LegacyMap = Map<StoreWritable<any>, any>

type StorePair<T extends unknown = unknown> = [StoreWritable<T>, T];

/**
 * Creates isolated instance of application. Primary purposes of this method are SSR and testing.
 * @param config optional configuration object with initial store values and effect handlers
 * @returns new scope
 */
export function fork(
  config?: {
    values?: StorePair<any>[] | SerializedState | LegacyMap,
    handlers?: Handlers
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
 * Run unit in scope and wait for all triggered effects to settle. This method never throw an error
 * @param unit event or store to run
 * @returns void promise, will resolve when there will be no pending effects in given scope
 */
export function allSettled<T>(
  unit: UnitTargetable<T>,
  config: {scope: Scope; params: T},
): Promise<void>
/**
 * Run unit without arguments in scope and wait for all triggered effects to settle. This method never throw an error
 * @param unit event or store to run
 * @returns void promise, will resolve when there will be no pending effects in given scope
 */
export function allSettled(
  unit: UnitTargetable<void>,
  config: {scope: Scope},
): Promise<void>
/**
 * Check for any ongoing computations in provided scope and wait for them to settle.
 * @param scope {Scope}
 * @returns void promise, will resolve when there will be no pending effects in given scope
 */
export function allSettled(scope: Scope): Promise<void>

export function createWatch<T>({
  unit,
  fn,
  scope,
  batch,
}: {
  unit: Unit<T> | Unit<T>[]
  fn: (value: T) => any
  scope?: Scope
  batch?: boolean
}): Subscription
