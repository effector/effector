import {
  Subscription,
  Subscriber,
  Graph,
  kind,
  StateRef,
  Unit,
  Config,
} from './index.h'
import {CompositeName} from './naming'

export interface Event<E> extends Unit {
  /*::
  [[call]](payload: E): E,
  */
  /*::+*/ id: string;
  /*::+*/ kind: kind;
  getType(): string;
  create(payload: E, type: string, args: any[]): E;
  watch(watcher: (payload: E) => any): Subscription;
  map<T>(fn: (_: E) => T): Event<T>;
  filter(config: {fn(_: E): boolean}): Event<E>;
  filter<T>(fn: (_: E) => T | void): Event<T>;
  filterMap<T>(fn: (_: E) => T | void): Event<T>;
  prepend<Before>(fn: (_: Before) => E): Event<Before>;
  subscribe(subscriber: Subscriber<E>): Subscription;
  thru<U>(fn: (event: Event<E>) => U): U;
  getType(): string;
  shortName: string;
  domainName?: CompositeName;
  graphite: Graph;
  compositeName: CompositeName;
}

export interface Store<State> extends Unit {
  subscribers: Map<Event<any>, Subscription>;
  /*::+*/ id: string;
  /*::+*/ stateRef: StateRef;
  reset(event: Event<any> | Effect<any, any, any>): Store<State>;
  getState(): State;
  setState(newState: State): void;
  //prettier-ignore
  /*::+*/ map: (
  & (<T>(fn: (_: State, lastState?: T) => T, _: void) => Store<T>)
  & (<T>(fn: (_: State, lastState: T) => T, firstState: T) => Store<T>)
 );
  on<E>(
    event: Event<E> | Effect<E, any, any> | Store<E>,
    handler: (state: State, payload: E) => State | void,
  ): Store<State>;
  off(event: Event<any>): void;
  subscribe(listener: any): Subscription;
  thru<U>(fn: (store: Store<State>) => U): U;
  //prettier-ignore
  /*::+*/ watch: (
    & (
      <E>(
        watcher: (state: State, payload: E, type: string) => any,
        _: void,
      ) => Subscription
    )
    & (
      <E>(
        trigger: Store<E>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
    & (
      <E>(
        event: Event<E>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
    & (
      <E>(
        effect: Effect<E, any, any>,
        watcher: (state: State, payload: E, type: string) => any,
      ) => Subscription
    )
  );
  kind: kind;
  defaultState: State;
  defaultConfig: Config;
  defaultShape?: Object;
  shortName: string;
  domainName?: CompositeName;
  sid: string | null;
  graphite: Graph;
  updates: Event<State>;
  compositeName?: CompositeName;
}

export interface Effect<Params, Done, Fail = Error> extends Unit {
  /*::
  [[call]](payload: Params): Promise<Done>,
  */
  done: Event<{
    params: Params,
    result: Done,
  }>;
  fail: Event<{
    params: Params,
    error: Fail,
  }>;
  finally: Event<
    | {
        status: 'done',
        params: Params,
        result: Done,
      }
    | {
        status: 'fail',
        params: Params,
        error: *,
      },
  >;
  /*::+*/ id: string;
  use: {
    /*::
    [[call]](asyncFunction: (params: Params) => Promise<Done> | Done): void,
    */
    getCurrent(): (params: Params) => Promise<Done>,
  };
  create(payload: Params, type: string, args: any[]): Params;
  pending: Store<boolean>;
  watch(watcher: (payload: Params) => any): Subscription;
  // getNode(): Vertex<['event', string]>,
  //map<T>(fn: (_: E) => T): Event<T>,
  prepend<Before>(fn: (_: Before) => Params): Event<Before>;
  subscribe(subscriber: Subscriber<Params>): Subscription;
  //prettier-ignore
  //   to: (
  //   & (<T>(
  //    store: Store<T>,
  //    reducer: (state: T, payload: Params) => T
  //   ) => Subscription)
  //   & ((store: Store<Params>, _: void) => Subscription)
  //  ),
  // epic<T>(fn: (_: Stream<Params>) => Stream<T>): Event<T>,
  getType(): string;
  kind: kind;
  shortName: string;
  domainName?: CompositeName;
  graphite: Graph;
  compositeName: CompositeName;
}

export interface Domain extends Unit {
  /*:: +*/ id: string;
  onCreateEvent(hook: (newEvent: Event<any>) => any): Subscription;
  onCreateEffect(hook: (newEffect: Effect<any, any, any>) => any): Subscription;
  onCreateStore(hook: (newStore: Store<any>) => any): Subscription;
  onCreateDomain(hook: (newDomain: Domain) => any): Subscription;
  event<Payload>(name?: string, config?: Config): Event<Payload>;
  effect<Params, Done, Fail>(
    name?: string,
    config?: Config,
  ): Effect<Params, Done, Fail>;
  domain(name?: string): Domain;
  store<State>(defaultState: State, config?: Config): Store<State>;
  compositeName: CompositeName;
  getType(): string;
  kind: kind;
  graphite: Graph;
}
