import { 
  Store,
  Middleware
} from 'redux'
import { Stream } from 'most'

type Tag = string
type ID = number

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
  register: (store: Store<State>) => void,
}

export type Event<Payload, State> = {
  (params: Payload): {
    send(dispatchHook?: <T>(value: T) => T): Promise<Payload>,
  },
  getType(): Tag,
  watch<R>(fn: (params: Payload, state: State) => R): void,
  epic<R>(
    handler: (
      data$: Stream<Payload>,
      state$: Stream<State>
    ) => Stream<R>
  ): Stream<R>,
}

export type Effect<Params, Done, Fail, State> = {
  (params: Params): {
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
  done: {
    epic<R>(
      handler: (
        data$: Stream<{params: Params, result: Done}>,
        state$: Stream<State>
      ) => Stream<R>
    ): Stream<R>,
    watch<R>(
      handler: (
        data: {params: Params, result: Done},
        state: State,
      ) => R
    ): void,
  },
  fail: {
    epic<R>(
      handler: (
        data$: Stream<{params: Params, error: Fail}>,
        state$: Stream<State>
      ) => Stream<R>
    ): Stream<R>,
    watch<R>(
      handler: (
        data: {params: Params, error: Fail},
        state: State,
      ) => R
    ): void,
  },
}

export function createDomain<State>(store: Store<State>, domainName?: string): Domain<State>

export function rootDomain<State>(domainName?: string): Domain<State>

export const effectorMiddleware: Middleware