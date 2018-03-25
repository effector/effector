//@flow strict

import invariant from 'invariant'

// import {type ID, create} from '../ID'

class Const</*::+*/ T> {
  /*::+*/ read: () => T
  isConst: boolean
  constructor(value: T) {
    this.read = () => value
  }
}

Object.defineProperty(Const.prototype, 'isConst', {
  value: true,
})

class Lazy</*::+*/ T> {
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

Object.defineProperty(Lazy.prototype, 'isConst', {
  value: false,
})

type Value</*::+*/ T> = {
  /*::+*/ isConst: boolean,
  read(): T,
}

export type {Value as Lazy}

export function fromValue<T>(value: T): Value<T> {
  return new Const(value)
}

export function fromThunk<T>(value: () => T): Value<T> {
  return new Lazy(value)
}
