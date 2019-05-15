//@flow

import invariant from 'invariant'
import {type Store, createStoreObject} from './store'
import {is} from './validate'

//eslint-disable-next-line no-unused-vars
declare export function combine<R>(fn: () => R): Store<R>
declare export function combine<A, R>(a: Store<A>, fn: (a: A) => R): Store<R>
declare export function combine<A, B, R>(
  a: Store<A>,
  b: Store<B>,
  fn: (a: A, b: B) => R,
): Store<R>
declare export function combine<A, B, C, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  fn: (a: A, b: B, c: C) => R,
): Store<R>
declare export function combine<A, B, C, D, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  fn: (a: A, b: B, c: C, d: D) => R,
): Store<R>
declare export function combine<A, B, C, D, E, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  fn: (a: A, b: B, c: C, d: D, e: E) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, I, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, I, J, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  j: Store<J>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J) => R,
): Store<R>
declare export function combine<A, B, C, D, E, F, G, H, I, J, K, R>(
  a: Store<A>,
  b: Store<B>,
  c: Store<C>,
  d: Store<D>,
  e: Store<E>,
  f: Store<F>,
  g: Store<G>,
  h: Store<H>,
  i: Store<I>,
  j: Store<J>,
  k: Store<K>,
  fn: (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i: I, j: J, k: K) => R,
): Store<R>

export function combine(...args: Array<Store<any>>): Store<any> {
  invariant(args.length > 0, 'at least one argument required')
  let handler
  let stores
  {
    const rawHandler = args[args.length - 1]
    if (typeof rawHandler === 'function') {
      stores = args.slice(0, -1)
      handler = rawHandler
    } else {
      stores = args
    }
  }

  let structStoreShape

  makeShape: {
    if (stores.length === 1) {
      const obj = stores[0]
      /*
      without edge case combine(Color, (Color) => '~')
      */
      if (!is.store(obj)) {
        /*
        case combine([R,G,B], ([R,G,B]) => '~')
        case combine({R,G,B}, ({R,G,B}) => '~')

        edge case combine([Color], ([Color]) => '~')
        edge case combine({Color}, ({Color}) => '~')

        edge case combine([R,G,B])
        edge case combine({R,G,B})

        edge case combine([Color])
        edge case combine({Color})
        */
        structStoreShape = obj
        break makeShape
      }
    }
    /*
    case combine(R,G,B, (R,G,B) => '~')
    */
    structStoreShape = stores
    /*
    without edge case combine(R,G,B)
    without edge case combine(Color)
    */
    if (handler) {
      handler = spreadArgs(handler)
    }
  }
  //$off
  return createStoreObject(structStoreShape, handler)
}

const spreadArgs = fn => list => fn(...list)
