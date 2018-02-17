//@flow

import {Stream} from 'most'

import type {ID, Tag} from './id'

declare export function Dispatch<T>(value: T): T
declare export function Dispatch<T, TT>(value: T): TT

export type Store<S> = {
  dispatch: Function,
  getState(): S,
  subscribe(listener: any): () => void,
  replaceReducer(nextReducer: (state: S, action: any) => S): void,
}

export type Meta = {
  index: ID,
  eventID: ID,
  seq: ID,
  passed: boolean,
}

export type RawAction<P> = {
  type: string,
  payload: P,
  meta: Meta,
}

export type Domain<State = void> = {
  effect<Params, Done, Fail>(
    name: string,
    opts?: $Shape<UserlandConfig>,
  ): Effect<Params, Done, Fail, State>,
  event<Payload>(
    name: string
  ): Event<Payload, State>,
  domain(name: string): Domain<State>,
  typeConstant<Payload>(
    name: string
  ): Event<Payload, State>,
  register: (store: Store<State>) => void,
  port<R>(events$: Stream<R>): Promise<void>,
}

export type Subscription<A> = {
  unsubscribe(): void
}

export type Subscriber<A> = {
  next(value: A): void,
  error(err: Error): void,
  complete(value?: A): void,
}

export type Event<Payload, State> = {
  (params: Payload): {
    send(dispatchHook?: typeof Dispatch): Promise<Payload>,
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
  subscribe(subscriber: Subscriber<Payload>): Subscription<Payload>,
  // port<R>(events$: Stream<R>): Promise<void>,
}

export type Effect<Params, Done, Fail, State> = {
  (params: Params): {
    raw(): RawAction<Params>,
    send(dispatchHook?: typeof Dispatch): Promise<Params>,
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
  // port<R>(events$: Stream<R>): Promise<void>,
  use(thunk: (params: Params) => Promise<Done>): void,
  trigger(
    query: (state: State) => Params,
    eventName?: string,
  ): Event<void, State>,
  subscribe(subscriber: Subscriber<Params>): Subscription<Params>,
  done: Event<{params: Params, result: Done}, State>,
  fail: Event<{params: Params, error: Fail}, State>,
}

export type Reducer<S> = {
  /*::<P>*/(state: S, action: RawAction<P>): S,
  (state: S, action: any): S,
  options(opts: { fallback: boolean }): Reducer<S>,
  has(event: Event<any, any>): boolean,
  on<
    P,
    A/*: Event<P, any> | $ReadOnlyArray<Event<any, any>>*/
  >(event: A, handler: (state: S, payload: P, meta: Meta) => S): Reducer<S>,
  off<
    A/*: Event<any, any> | $ReadOnlyArray<Event<any, any>>*/
  >(event: A): Reducer<S>,
  reset<
    A/*: Event<any, any> | $ReadOnlyArray<Event<any, any>>*/
  >(event: A): Reducer<S>
}

type Handler<S, P> = (state: S, payload: P, meta: Meta) => S

export type Handlers<S> = {
  [propertyName: string]: Handler<S, any>
}

type functionOn<S, P> = (actionCreator: Event<P, any>, handler: Handler<S, P>) => Reducer<S>
type functionOff<S> = (actionCreator: Event<any, any>) => Reducer<S>

export type OnOff<S> = {
  (on: functionOn<S, any>, off: functionOff<S>): void;
}

export type WarnMode = 'off' | 'warn' | 'throw'

export type WarnModeCheck = () => WarnMode

export type DomainConfig = {
  effectImplementationCheck: WarnModeCheck,
  watchFailCheck: WarnModeCheck,
  dispatch: typeof Dispatch,
}

export type UserlandConfig = {
  effectImplementationCheck: WarnMode,
  watchFailCheck: WarnMode,
}
