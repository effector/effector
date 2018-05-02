declare module 'redux-thunk' {
 import type {MiddlewareAPI} from 'redux'

 declare export type Dispatch<S> = {
  <R, E>(asyncAction: ThunkAction<R, S, E>): R,
 }

 declare export type ThunkAction<R, S, E> = (
  dispatch: Dispatch<S>,
  getState: () => S,
  extraArgument: E,
 ) => R

 //  declare export class Thunk<S, A, D = Dispatch<A>> {
 //   (api: MiddlewareAPI<S, A, D>): (next: D) => D;
 //   $call(api: MiddlewareAPI<S, A, D>): (next: D) => D;
 //   call$(api: MiddlewareAPI<S, A, D>): (next: D) => D;
 //   withExtraArgument(extraArgument: any): Thunk<S, A, D>;
 //  }

 declare export default class Thunk<S, A, D = Dispatch<A>> {
  (next: D): D;
  // $call(next: D): D;
  static $call(api: MiddlewareAPI<S, A, D>): (next: D) => D;
  // static call$(api: MiddlewareAPI<S, A, D>): (next: D) => D;
  static withExtraArgument(extraArgument: any): Thunk<S, A, D>;
 }
}
