//@flow

export class Atom<A> {
 value: A
 get(): A {
  return this.value
 }
 set(_: A) {
  this.value = _
 }
}

export function atom<A>(defaultState: A): Atom<A> {
 const result: Atom<A> = new Atom()
 result.set(defaultState)
 return result
}
