//@flow

import /*::type*/ { Observable, Subscriber } from 'most'
/*
  S = State
  A = Action
  D = Dispatch
*/

// export type DispatchAPI<A> = (action: A) => A
export type Dispatch = (value: any) => void

export type MiddlewareAPI</*::+*/S> = {
  dispatch: Dispatch;
  getState(): S;
};

export type Store<S, /*::-*/L/*::: S => void*/ = ((s: S) => void)> = {
  // rewrite MiddlewareAPI members in order to get nicer error messages (intersections produce long messages)
  dispatch: Dispatch,
  getState(): S,
  subscribe(listener: L | Subscriber<S>): () => void,
  replaceReducer(nextReducer: Reducer<S>): void,
};

export type Reducer<S> = <A/*: {
  type: string,
}*/>(state: S, action: A) => S

export type CombinedReducer<S> = </*::-*/A>(state: $Shape<S> & {} | void, action: A) => S;

export type Middleware</*::-*/S> =
  (api: MiddlewareAPI<S>) =>
    (next: any) => any;

export type StoreCreator<S>
  = ( (reducer: Reducer<S>, enhancer?: StoreEnhancer<S>, nob: void) => Store<S> )
  & ( (reducer: Reducer<S>, preloadedState: S, enhancer?: StoreEnhancer<S>) => Store<S> )
;

export type StoreEnhancer<S> = (next: StoreCreator<S>) => StoreCreator<S>;

declare export function createStore<S>(reducer: Reducer<S>, enhancer?: StoreEnhancer<S>): Store<S>;
declare export function createStore<S>(reducer: Reducer<S>, preloadedState: S, enhancer?: StoreEnhancer<S>): Store<S>;

declare export function applyMiddleware<S>(...middlewares: $ReadOnlyArray<Middleware<S>>): StoreEnhancer<S>;

export type ActionCreator<A, B> = (...args: $ReadOnlyArray<B>) => A;
export type ActionCreators<K, A> = { [key: K]: ActionCreator<A, any> };

// declare export function bindActionCreators<A, C: ActionCreator<A, any>, D: DispatchAPI<A>>(actionCreator: C, dispatch: D): C;
// declare export function bindActionCreators<A, K, C: ActionCreators<K, A>, D: DispatchAPI<A>>(actionCreators: C, dispatch: D): C;

declare export function combineReducers<O/*::: Object*/>(reducers: O): CombinedReducer<$ObjMap<O, <S>(r: Reducer<S>) => S>>;

declare export function compose<A, B>(ab: (a: A) => B): (a: A) => B
declare export function compose<A, B, C>(
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => C
declare export function compose<A, B, C, D>(
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => D
declare export function compose<A, B, C, D, E>(
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => E
declare export function compose<A, B, C, D, E, F>(
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => F
declare export function compose<A, B, C, D, E, F, G>(
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => G
declare export function compose<A, B, C, D, E, F, G, H>(
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => H
declare export function compose<A, B, C, D, E, F, G, H, I>(
  hi: (h: H) => I,
  gh: (g: G) => H,
  fg: (f: F) => G,
  ef: (e: E) => F,
  de: (d: D) => E,
  cd: (c: C) => D,
  bc: (b: B) => C,
  ab: (a: A) => B
): (a: A) => I
