//@flow strict

import invariant from 'invariant'

// import {type ID, create} from '../ID'

export interface Lazy</*::+*/ T> {
  /*::+*/ isConst: boolean;
  read(): T;
}

class Sync</*::+*/ T> implements Lazy<T> {
 /*::+*/ read: () => T
  isConst: boolean
  constructor(value: T) {
   this.read = () => value
  }
}

Object.defineProperty(Sync.prototype, 'isConst', {
 value: true,
})

class Async</*::+*/ T> implements Lazy<T> {
 /*::+*/ value: () => T
  isConst: boolean
  // /*::+*/ id: ID = create()
  dispatching: boolean = false
  constructor(value: () => T) {
   this.value = value
  }
  read(): T {
   invariant(!this.dispatching, 'Self reference')
   this.dispatching = true
   const result = this.value()
   this.dispatching = false
   return result
  }
}

Object.defineProperty(Async.prototype, 'isConst', {
 value: false,
})

export type {Async, Sync}

declare export function fromValue<T>(value: T): Sync<T> // | Lazy<T>
// declare export function fromValue<T>(value: T): Lazy<T>
export function fromValue<T>(value: T): Lazy<T> {
 return new Sync(value)
}

declare export function fromThunk<T>(value: () => T): Async<T> // | Lazy<T>
// declare export function fromThunk<T>(value: () => T): Lazy<T>
export function fromThunk<T>(value: () => T): Lazy<T> {
 return new Async(value)
}
