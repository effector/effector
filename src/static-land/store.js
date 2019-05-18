//@flow

import {createStore, combine, type Store} from 'effector'

// Functor
export function map<A, B>(f: A => B, store: Store<A>): Store<B> {
  return store.map(f)
}

// Apply
export function ap<A, B>(f: Store<(A) => B>, event: Store<A>): Store<B> {
  return combine(f, event, (f, u) => f(u))
}

// Applicative depends on Apply
export const of = /*::<A>*/ (a: A): Store<A> => createStore(a)

// Extend
export function extend<A, B>(f: (fa: Store<A>) => B, fa: Store<A>): Store<B> {
  return createStore(f(fa))
}

// Comonad depends on Extend
export function extract<A>(a: Store<A>): A {
  return a.getState()
}

function leftAdjunct<A, B>(f: (a: Event<A>) => B, a: A): Store<B>;
function rightAdjunct<A, B>(f: (a: A) => Store<B>, a: Event<A>): B;