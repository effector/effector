//@flow strict

import invariant from 'invariant'

// import {type ID, create} from '../ID'

export interface Lazy</*::+*/ T> {
 /*::+*/ isConst: boolean;
 read(): T;
}

class Scalar</*::+*/ T> implements Lazy<T> {
 /*::+*/ read: () => T
 isConst: boolean
 constructor(value: T) {
  this.read = () => value
 }
}

Object.defineProperty(Scalar.prototype, 'isConst', {
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

export type {Async, Scalar}

export function readWrite<T>(
 defaultValue: T,
): {
 /*::+*/ read: Async<T>,
 write(value: T): void,
 isChanged(val: number): boolean,
 getSeq(): number,
} {
 let value: T = defaultValue
 let seq = -1
 const read: Async<T> = new Async(() => value)
 function write(val: T) {
  seq += 1
  value = val
 }
 //  function read(): T {
 //   return reader.read()
 //  }
 function isChanged(num: number) {
  return seq > num
 }
 function getSeq() {
  return seq
 }
 return {read, write, isChanged, getSeq}
}

declare export function fromValue<T>(value: T): Scalar<T> // | Lazy<T>
// declare export function fromValue<T>(value: T): Lazy<T>
export function fromValue<T>(value: T): Lazy<T> {
 return new Scalar(value)
}

declare export function fromThunk<T>(value: () => T): Async<T> // | Lazy<T>
// declare export function fromThunk<T>(value: () => T): Lazy<T>
export function fromThunk<T>(value: () => T): Lazy<T> {
 return new Async(value)
}
