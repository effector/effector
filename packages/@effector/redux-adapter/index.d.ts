/// <reference types="symbol-observable" />

export interface Action<T = any> {
  type: T
}

export interface AnyAction extends Action {
  // Allows any extra properties to be defined in an action.
  [extraProps: string]: any
}

export type Reducer<S = any, A extends Action = AnyAction> = (
  state: S | undefined,
  action: A,
) => S

export type ReducersMapObject<S = any, A extends Action = Action> = {
  [K in keyof S]: Reducer<S[K], A>
}

export function combineReducers<T extends ReducersMapObject<any, any>>(
  reducers: T,
): Reducer<InferStateType<T>, InferActionTypes<InferReducerTypes<T>>>

type InferActionTypes<R> = R extends Reducer<any, infer A> ? A : AnyAction
type InferReducerTypes<T> = T extends Record<any, infer R> ? R : Reducer
type InferStateType<T> = T extends ReducersMapObject<infer S, any> ? S : never

export interface Dispatch<A extends Action = AnyAction> {
  <T extends A>(action: T): T
}

export interface Unsubscribe {
  (): void
}

export type Observable<T> = {
  subscribe: (observer: Observer<T>) => {unsubscribe: Unsubscribe}
  [Symbol.observable](): Observable<T>
}

export type Observer<T> = {
  next?(value: T): void
}

export interface Store<S = any, A extends Action = AnyAction> {
  dispatch: Dispatch<A>
  getState(): S
  subscribe(listener: () => void): Unsubscribe
  replaceReducer(nextReducer: Reducer<S, A>): void
  [Symbol.observable](): Observable<S>
}

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export interface StoreCreator {
  <S, A extends Action, Ext, StateExt>(
    reducer: Reducer<S, A>,
    enhancer?: StoreEnhancer<Ext, StateExt>,
  ): Store<S & StateExt, A> & Ext
  <S, A extends Action, Ext, StateExt>(
    reducer: Reducer<S, A>,
    preloadedState?: DeepPartial<S>,
    enhancer?: StoreEnhancer<Ext>,
  ): Store<S & StateExt, A> & Ext
}

export const createReduxStore: StoreCreator

export type StoreEnhancer<Ext = {}, StateExt = {}> = (
  next: StoreEnhancerStoreCreator,
) => StoreEnhancerStoreCreator<Ext, StateExt>
export type StoreEnhancerStoreCreator<Ext = {}, StateExt = {}> = <
  S = any,
  A extends Action = AnyAction
>(
  reducer: Reducer<S, A>,
  preloadedState?: DeepPartial<S>,
) => Store<S & StateExt, A> & Ext
