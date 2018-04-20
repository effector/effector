//@flow

import {
 createEvent,
 createActor,
 createQuant,
 type EventFabric,
 type OpaqueEvent,
 Quant,
} from './actor'

/*::
interface IterableInterface<T> {
  iter(): Iterable<T>,
  // @@iterator(): Iterable<T>,
}
type IterableInstance<T> = {
  iter(): Iterable<T>,
};
type IteratorInstance<T> = {
  iter(): Iterable<T>,
  @@iterator(): Iterator<T>,
};
*/

declare function iter<T>(
 Statics: Class<IterableInstance<T>>,
): Class<IteratorInstance<T>>
function iter<T>(
 Statics: Class<IterableInstance<T>>,
): Class<IterableInstance<T>> {
 Statics.prototype[Symbol.iterator] = function iterator() {
  return this.iter()
 }
 return Statics
}

export class Atom<T> {
 /*::+*/ quant: Quant
 /*::
  +@@iterator: *;
  +iter: () => *;
  */
 constructor(value: T) {
  this.quant = createQuant(value)
 }
 //$off
 * [Symbol.iterator]() {
  yield* this.iter()
 }
 get(): T {
  return this.quant.get()
 }
 set(value: T) {
  return this.quant.set(value)
 }
}

class Zero<T> extends Atom<void> {
 /*::
  +@@iterator: () => Iterator<T>
  */
 * iter(): Iterator<T> {}
}

const zz = (new Zero(): Zero<string>)

const zzz = [...zz]

class One<T> extends Atom<T> {
 /*::
  +@@iterator: () => Iterator<T>
  */
 * iter() {
  yield this.get()
 }
}
class Many<T> extends Atom<Iterable<T>> {
 /*::
  +@@iterator: () => Iterator<T>
  */
 * iter() {
  yield* this.get()
 }
}

type AtomCore<T> = Zero<T> | One<T> | Many<T>

type MapCore<A, B> = {
 /*::+*/ Zero: () => AtomCore<B>,
 /*::+*/ One: (_: A) => AtomCore<B>,
 /*::+*/ Many: (_: Iterable<A>) => AtomCore<B>,
}

type TapCore<A> = {
 /*::+*/ Zero: () => void,
 /*::+*/ One: (_: A) => void,
 /*::+*/ Many: (_: Iterable<A>) => void,
}

class AtomWatcher<T> extends Atom<AtomCore<T>> {
 map<S>(fn: T => S): AtomWatcher<T> {
  const value: AtomCore<T> = this.get()
  if (value instanceof Zero) return new AtomWatcher(new Zero())
  if (value instanceof One) return new AtomWatcher(new One(fn(value.get())))
  if (value instanceof Many)
   return new AtomWatcher(new Many([...value].map(fn)))
  throw new Error('wrong atom matcher')
 }
 cata<S>(cases: MapCore<T, S>): AtomWatcher<T> {
  const value: AtomCore<T> = this.get()
  if (value instanceof Zero) return new AtomWatcher(cases.Zero())
  if (value instanceof One) return new AtomWatcher(cases.One(value.get()))
  if (value instanceof Many) return new AtomWatcher(cases.Many(value.get()))
  throw new Error('wrong atom matcher')
 }
 sideCata(cases: TapCore<T>) {
  const value: AtomCore<T> = this.get()
  if (value instanceof Zero) cases.Zero()
  else if (value instanceof One) cases.One(value.get())
  else if (value instanceof Many) cases.Many(value.get())
  else throw new Error('wrong atom matcher')
 }
}

class AtomRef<T> extends AtomWatcher<(T) => void> {
 watch(fn: T => void) {
  const set = (value: AtomCore<(T) => void>) => super.set(value)
  return this.sideCata({
   Zero() {
    set(new One(fn))
   },
   One(oldFn) {
    set(new Many([oldFn, fn]))
   },
   Many(list) {
    set(new Many([...list, fn]))
   },
  })
 }
 valueSet(value: T) {}
}

function atomWatcher<T>(): AtomWatcher<T> {
 return new AtomWatcher(new Zero())
}

export function atom<T>(value: T): Atom<T> {
 return new Atom(value)
}
