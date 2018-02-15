import {
  Store,
  Middleware
} from 'redux'
import { Stream } from 'most'

type Tag = string
type ID = number

export type RawAction<P> = {
  type: string | Tag,
  payload: P,
  meta: {
    index: ID,
    eventID: ID,
    seq: ID,
  },
}

export type Reducer<S> = {
  (state: S, action: RawAction<any>): S,
  options(opts: { fallback: boolean }): Reducer<S>,
  has(event: Event<any, any>): boolean,
  on<
    P,
    A extends Event<P, any>
  >(event: A | A[], handler: (state: S, payload: P, meta: {
    index: ID,
    eventID: ID,
    seq: ID,
  }) => S): Reducer<S>,
  off<A extends Event<any, any>>(event: A): Reducer<S>,
  reset<A extends Event<any, any>>(event: A | A[]): Reducer<S>,
}

export type Domain<State = void> = {
  effect<Params, Done, Fail>(
    name: string
  ): Effect<Params, Done, Fail, State>,
  event<Payload>(
    name: string
  ): Event<Payload, State>,
  domain(name: string): Domain<State>,
  typeConstant<Payload>(
    name: string
  ): Event<Payload, State>,
  register(store: Store<State>): void,
}

export type Event<Payload, State> = {
  (params: Payload): {
    send(dispatchHook?: <T>(value: T) => T): Promise<Payload>,
    raw(): RawAction<Payload>,
  },
  getType(): Tag,
  watch<R>(fn: (params: Payload, state: State) => R): void,
  epic<R>(
    handler: (
      data$: Stream<Payload>,
      state$: Stream<State>
    ) => Stream<R>
  ): Stream<R>,
  trigger(
    query: (state: State) => Payload,
    eventName?: string,
  ): Event<void, State>,
}

export type Effect<Params, Done, Fail, State> = {
  (params: Params): {
    raw(): RawAction<Params>,
    send(dispatchHook?: <T>(value: T) => T): Promise<Params>,
    done(): Promise<{params: Params, result: Done}>,
    fail(): Promise<{params: Params, error: Fail}>,
    promise(): Promise<{params: Params, result: Done}>,
  },
  getType(): Tag,
  watch<R>(fn: (params: Params, state: State) => R): void,
  epic<R>(
    handler: (
      data$: Stream<Params>,
      state$: Stream<State>
    ) => Stream<R>
  ): Stream<R>,
  use(thunk: (params: Params) => Promise<Done>): void,
  trigger(
    query: (state: State) => Params,
    eventName?: string,
  ): Event<void, State>,
  done: Event<{params: Params, result: Done}, State>,
  fail: Event<{params: Params, error: Fail}, State>,
}

export function createDomain<State>(store: Store<State>, domainName?: string): Domain<State>

export function createRootDomain<State>(domainName?: string): Domain<State>

export const effectorMiddleware: Middleware

export function joint<A, B, R>(
  fn: (a: A, b: B) => R,
  reducerA: Reducer<A>,
  reducerB: Reducer<B>,
  noc: void,
  nod: void,
  noe: void,
  nof: void
): Reducer<R>
export function joint<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  reducerA: Reducer<A>,
  reducerB: Reducer<B>,
  reducerC: Reducer<C>,
  nod: void,
  noe: void,
  nof: void
): Reducer<R>
export function joint<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  reducerA: Reducer<A>,
  reducerB: Reducer<B>,
  reducerC: Reducer<C>,
  reducerD: Reducer<D>,
  noe: void,
  nof: void
): Reducer<R>
export function joint<A, B, C, D, E, R>(
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
  reducerA: Reducer<A>,
  reducerB: Reducer<B>,
  reducerC: Reducer<C>,
  reducerD: Reducer<D>,
  reducerE: Reducer<E>,
  nof: void
): Reducer<R>
export function joint<A, B, C, D, E, F, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
  reducerA: Reducer<A>,
  reducerB: Reducer<B>,
  reducerC: Reducer<C>,
  reducerD: Reducer<D>,
  reducerE: Reducer<E>,
  reducerF: Reducer<F>
): Reducer<R>

