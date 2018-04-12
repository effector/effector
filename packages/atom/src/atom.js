//@flow

import invariant from 'invariant'

import {Emission} from '@effector/emission'

import type {Atom} from './index.h'
export function atom<T>(defaultValue: T): Atomic<T> {
 return new Atomic(defaultValue)
}
function remote<T>(baseValue: () => T): Atom<T> {
 let value: () => T = baseValue
 return {
  get() {
   return value()
  },
  set(newValue: T) {
   value = () => newValue
  },
 }
}

function createAtom<T>(ref: Atom<T>) {
 const active = remote(() => true)
 const emission = new Emission()
 const set = new Emission()
 const get = new Emission()
 const offA = emission.watch(set, ref.set)
 const offB = emission.watch(get, (cb: T => void) => cb(ref.get()))
 const off = () => {
  active.set(false)
  offA()
  offB()
 }
 return {get, set, off, active, emission}
}

function getReturn<T>(defaultValue: () => T, get): T {
 let value: T | void
 get.dispatch((newValue: T) => {
  value = newValue
 })
 if (value == null) return defaultValue()
 return value
}
export class Atomic<T> {
 meta: () => {
  get: Emission,
  set: Emission,
  emission: Emission,
  off(): void,
  active: Atom<boolean>,
  defaultValue(): T,
 }
 constructor(defaultValue: Atomic<T> | T) {
  let fnValue: () => T
  const defValue = () => fnValue()
  if (defaultValue instanceof Atomic) {
   fnValue = () => {
    const result = defaultValue.get()
    fnValue = () => result
    return result
   }
  } else {
   fnValue = () => defaultValue
  }
  const {get, set, off, active, emission} = createAtom(remote(defValue))
  Object.defineProperty(this, 'meta', {
   value() {
    return {get, set, off, active, emission, defaultValue: defValue}
   },
  })
 }
 get(): T {
  const {active, defaultValue, get} = this.meta()
  invariant(active.get(), 'inactive atom')
  return getReturn(defaultValue, get)
 }
 set(newValue: ?T | void): void {
  if (newValue == null) return
  const {active, set} = this.meta()
  invariant(active.get(), 'inactive atom')
  const currentState = this.get()
  if (currentState === newValue) return
  set.dispatch(newValue)

  //  emission.emitSync(set, newValue)
 }
 isActive() {
  return this.meta().active.get()
 }
 off() {
  this.meta().off()
 }
 watch(fn: (_: T) => any): () => void {
  const {emission, set} = this.meta()
  return emission.watch(set, fn)
 }
 map<S>(fn: T => S): Reference<S> {
  return new Reference((_: T) => [fn(_)], this)
 }
 chain<S>(fn: T => String<S>): Reference<S> {
  return new Reference(fn, this)
 }
 sample<S, R>(b: Atomic<S>, fn: (a: T, b: S) => R): Atomic<R> {
  let bVal: S = b.get()
  const offB = b.watch(b => {
   bVal = b
  })
  const offA = iterate(this, {
   next(val) {
    const result = fn(val, bVal)
    atom.set(result)
   },
   complete() {
    atom.off()
    offA()
    offB()
   },
  })
  const atom: Atomic<R> = new Atomic()
  return atom
 }
 combine<S, R>(b: Atomic<S>, fn: (a: T, b: S) => R | null): Atomic<R> {
  //  const halt = () => this.off()
  let r
  const set = (a, b) => {
   const result = fn(a, b)
   if (result == null) return
   if (r === result) return
   r = result
   atom.set(result)
  }
  const offB = b.watch(b => {
   set(this.get(), b)
  })
  const offA = iterate(this, {
   next(val) {
    set(val, b.get())
   },
   complete() {
    atom.off()
    offA()
    offB()
   },
  })
  const atom: Atomic<R> = new Atomic()
  return atom
 }
 update(fn: T => ?T | void): this {
  const oldValue = this.get()
  const newValue = fn(oldValue)
  if (oldValue === newValue) return this
  if (newValue == null) return this
  this.set(newValue)
  return this
 }
 reset(): void {
  return this.set(this.meta().defaultValue())
 }
}

type String<T> = Iterable<T>

type Filter<T> = (String<T>) => String<T>
type Chain<T, S> = T => String<S>
type Seq<T> = Iterable<Filter<T>>
type SeqFilter<T> = (Seq<T>) => Seq<T>
declare function emptyString<T>(): String<T>
function* emptyString<T>(): String<T> {}
function* chainString<T, S>(chain: Chain<T, S>, text: String<T>): String<S> {
 for (const ch of text) {
  yield* chain(ch)
 }
}
function joinSeq<T>(...seq: Seq<T>[]): Filter<T> {
 return function* filter(text: String<T>): String<T> {
  let result = text
  for (const filters of seq) {
   for (const filter of filters) result = filter(result)
  }
  yield* result
 }
}
function iterate<A>(
 ref: Atomic<A>,
 observable: {next(_: A): void, complete(): void},
) {
 const off = ref.watch(_ => observable.next(_))
 return () => {
  observable.complete()
  off()
 }
}
export class Reference<B> extends Atomic<B> {
 constructor<A>(transformer: A => String<B>, ref: Atomic<A>) {
  const defs = [...transformer(ref.get())]
  super(defs[defs.length - 1])
  const halt = () => this.off()
  const set = t => this.set(t)
  const off = iterate(ref, {
   next(val) {
    for (const result of transformer(val)) {
     set(result)
    }
   },
   complete() {
    halt()
    off()
   },
  })
 }
}

// export function from<T>(transformer: Generator<T>, ref: Atomic<T>) {}

export function atoms<T>(): Atomic<T[]> {
 return new Atomic([])
}

// export function map<A, B>
