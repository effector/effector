import {
  Store,
  Middleware
} from 'redux'
import { Stream } from 'most'

type Tag = string
type ID = number

export type WarnMode = 'off' | 'warn' | 'throw'
export type EventConfig = {
  effectImplementationCheck?: WarnMode,
  watchFailCheck?: WarnMode,
}

export type Meta = {
  index: ID,
  eventID: ID,
  seq: ID,
}

export type RawAction<P> = {
  type: string | Tag,
  payload: P,
  meta: Meta,
}

export type Reducer<S> = {
  (state: S, action: RawAction<any>): S,
  options(opts: { fallback: boolean }): Reducer<S>,
  has(event: Event<any, any>): boolean,
  on<
    P,
    A extends Event<P, any>
  >(event: A | A[], handler: (state: S, payload: P, meta: Meta) => S): Reducer<S>,
  off<A extends Event<any, any>>(event: A): Reducer<S>,
  reset<A extends Event<any, any>>(event: A | A[]): Reducer<S>,
}

export type Domain<State = void> = {
  effect<Params, Done, Fail>(
    name: string,
    options?: EventConfig,
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

export function joint<A, R>(
  fn: (a: A) => R,
  setA: Reducer<A>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, R>(
  fn: (a: A, b: B) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, C, R>(
  fn: (a: A, b: B, c: C) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  setC: Reducer<C>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, C, D, R>(
  fn: (a: A, b: B, c: C, d: D) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  setC: Reducer<C>,
  setD: Reducer<D>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, C, D, E, R>(
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  setC: Reducer<C>,
  setD: Reducer<D>,
  setE: Reducer<E>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, C, D, E, F, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  setC: Reducer<C>,
  setD: Reducer<D>,
  setE: Reducer<E>,
  setF: Reducer<F>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, C, D, E, F, G, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  setC: Reducer<C>,
  setD: Reducer<D>,
  setE: Reducer<E>,
  setF: Reducer<F>,
  setG: Reducer<G>,
  ...none: Array<void>
): Reducer<R>
export function joint<A, B, C, D, E, F, G, H, R>(
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R,
  setA: Reducer<A>,
  setB: Reducer<B>,
  setC: Reducer<C>,
  setD: Reducer<D>,
  setE: Reducer<E>,
  setF: Reducer<F>,
  setG: Reducer<G>,
  setH: Reducer<H>,
  ...none: Array<void>
): Reducer<R>

