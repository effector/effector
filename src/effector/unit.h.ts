import type {
  Subscription,
  Subscriber,
  Node,
  kind,
  StateRef,
  Unit,
  Config,
} from './index.h'
import type {CompositeName} from './naming'

export interface Event<E> extends Unit {
  (payload: E): E
  id: string
  kind: kind
  getType(): string
  create(payload: E, args: unknown[]): E
  watch(watcher: (payload: E) => any): Subscription
  map<T>(fn: (_: E) => T): Event<T>
  filter(config: {fn(_: E): boolean}): Event<E>
  filter<T>(fn: (_: E) => T | void): Event<T>
  filterMap<T>(fn: (_: E) => T | void): Event<T>
  prepend<Before>(fn: (_: Before) => E): Event<Before>
  subscribe(subscriber: Subscriber<E>): Subscription
  thru<U>(fn: (event: Event<E>) => U): U
  getType(): string
  shortName: string
  graphite: Node
  compositeName: CompositeName
}

export interface Store<State> extends Unit {
  subscribers: Map<CommonUnit, Subscription>
  id: string
  stateRef: StateRef
  reset(...units: CommonUnit[]): Store<State>
  getState(): State
  setState(newState: State): void
  //prettier-ignore
  map: (
    & (<T>(fn: (_: State, lastState?: T) => T, _: void) => Store<T>)
    & (<T>(fn: (_: State, lastState: T) => T, firstState: T) => Store<T>)
  );
  on<E>(
    event: CommonUnit<E>,
    handler: (state: State, payload: E) => State | void,
  ): Store<State>
  off(unit: CommonUnit): void
  subscribe(listener: (upd: State) => void): Subscription
  thru<U>(fn: (store: Store<State>) => U): U
  //prettier-ignore
  watch: (
    & (
      <E>(
        watcher: (state: State, payload: E) => any,
        _: void,
      ) => Subscription
    )
    & (
      <E>(
        trigger: CommonUnit<E>,
        watcher: (state: State, payload: E) => any,
      ) => Subscription
    )
  );
  kind: kind
  defaultState: State
  defaultConfig: Config & {
    updateFilter?: (update: State, current: State) => boolean
  }
  defaultShape?: Object
  shortName: string
  sid: string | null
  graphite: Node
  updates: Event<State>
  compositeName: CompositeName
}

export interface Effect<Params, Done, Fail = Error> extends Unit {
  (payload: Params): Promise<Done>
  done: Event<{
    params: Params
    result: Done
  }>
  fail: Event<{
    params: Params
    error: Fail
  }>
  doneData: Event<Done>
  failData: Event<Fail>
  finally: Event<
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
  id: string
  use: {
    (handler: (params: Params) => Done | Promise<Done>): Effect<
      Params,
      Done,
      Fail
    >
    getCurrent(): (params: Params) => Promise<Done>
  }
  create(payload: Params, args: unknown[]): Params
  inFlight: Store<number>
  pending: Store<boolean>
  watch(watcher: (payload: Params) => any): Subscription
  prepend<Before>(fn: (_: Before) => Params): Event<Before>
  subscribe(subscriber: Subscriber<Params>): Subscription
  getType(): string
  kind: kind
  shortName: string
  graphite: Node
  compositeName: CompositeName
}

export interface Domain extends Unit {
  id: string
  onCreateEvent(hook: (newEvent: Event<any>) => any): Subscription
  onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any): Subscription
  onCreateStore(hook: (newStore: Store<any>) => any): Subscription
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription
  event<Payload>(name?: string, config?: Config): Event<Payload>
  effect<Params, Done, Fail>(
    name?: string,
    config?: Config,
  ): Effect<Params, Done, Fail>
  domain(name?: string): Domain
  store<State>(defaultState: State, config?: Config): Store<State>
  history: {
    events: Set<Event<any>>
    effects: Set<Effect<any, any>>
    stores: Set<Store<any>>
    domains: Set<Domain>
  }
  compositeName: CompositeName
  getType(): string
  kind: kind
  graphite: Node
}

export interface Scope extends Unit {
  kind: kind
  graphite: Node
  // changedStores: Set<string>
  reg: Record<string, StateRef>
  cloneOf?: Domain
  getState<T>(store: Store<T>): T
  getState(ref: StateRef): unknown
  /** value could be set only for stores with sid (they can be created by createStore, restore and combine) */
  sidValuesMap: Record<string, any>
  sidIdMap: Record<string, string>
  sidSerializeMap: Record<string, (p: any) => any>
  additionalLinks: Record<string, Node[]>
  handlers: Record<string, (params: unknown) => any>
  fxCount: Node
  storeChange: Node
  /** if any affected store is missing sid, then scope cannot be serialized correctly and data will be missing */
  warnSerialize?: boolean
  warnSerializeNode: Node
}

export type CommonUnit<T = any> = Event<T> | Effect<T, any, any> | Store<T>
export type DataCarrier = CommonUnit | Node
