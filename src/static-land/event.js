//@flow

import {sample, type Event} from 'effector'

// Functor
export function map<A, B>(f: A => B, event: Event<A>): Event<B> {
  return event.map(f)
}

// Filterable
export function filter<A>(f: A => boolean, event: Event<A>): Event<A> {
  return event.filter(data => {
    if (f(data)) return data
  })
}

// Contravariant
export function contramap<A, B>(f: A => B, event: Event<B>): Event<A> {
  return event.prepend(f)
}

// Apply
export function ap<A, B>(f: Event<(A) => B>, event: Event<A>): Event<B> {
  // Doesn't work
  return sample(event, f, (u, f) => f(u))
}
