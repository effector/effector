//@flow
/* eslint-disable no-unused-vars */
import type {Subscription, Subscriber} from '../effector/index.h'
import type {GraphiteMeta} from 'effector/stdlib/typedef'
import type {kind} from 'effector/stdlib/kind'
import type {Event} from 'effector/event'
import type {CompositeName} from '../compositeName'

//TODO: generalize or simplify type, or resolve inconsistensy
//which leads to adding FnEffect definition
export type Effect<
  Params,
  Done,
  Fail = Error,
  -Args = [Params],
  +Fn = (...params: Args) => Promise<Done> | Done,
> = {
  /*::
  [[call]]: Fn,
  */
  done: Event<{params: Params, result: Done}>,
  fail: Event<{params: Params, error: Fail}>,
  /*::+*/ id: string,
  /*::+*/ use: {
    /*::
    [[call]]<F>(
      asyncFunction: (params: Params) => Promise<Done> | Done
    ): Effect<
      Params,
      Done,
      Fail,
      Args,
      Fn,
    >,
    */
    getCurrent(): Fn,
  },
  create(payload: Params, type: string, args: any[]): $Call<Fn, Params>,
  watch(watcher: (payload: Params) => any): Subscription,
  //map<T>(fn: (_: E) => T): Event<T>,
  prepend<Before>(fn: (_: Before) => Params): Event<Before>,
  subscribe(subscriber: Subscriber<Params>): Subscription,
  getType(): string,
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: GraphiteMeta,
  compositeName: CompositeName,
}

export type FnEffect<
  Params,
  Done,
  Fail = Error,
  +Fn = (...params: any[]) => Promise<Done> | Done,
> = {
  /*::
  [[call]]: Fn,
  */
  +done: Event<{params: Params, result: Done}>,
  +fail: Event<{params: Params, error: Fail}>,
  /*::+*/ id: string,
  +use: {
    (asyncFunction: Fn): void,
    getCurrent(): Fn,
  },
  create(payload: Params, type: string, args: any[]): Promise<Done>,
  +watch: (watcher: (payload: Params) => any) => Subscription,
  //map<T>(fn: (_: E) => T): Event<T>,
  prepend<Before>(fn: (_: Before) => Params): Event<Before>,
  subscribe(subscriber: Subscriber<Params>): Subscription,
  getType(): string,
  +kind: kind,
  shortName: string,
  domainName?: CompositeName,
  graphite: GraphiteMeta,
  compositeName: CompositeName,
}

export type Thunk<Args, Done> = (_: Args) => Promise<Done>
export type Callbacks<Args, Done, Fail> = [
  (_: {result: Done, params: Args}) => void,
  (_: {error: Fail, params: Args}) => void,
  Thunk<Args, Done>,
]
