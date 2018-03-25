//@flow strict

import invariant from 'invariant'

// import {type ID, create} from '../ID'

class Lazy</*::+*/ T> {
  /*::+*/ value: () => T
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

export type {Lazy}

export function fromValue<T>(value: T): Lazy<T> {
  return new Lazy(() => value)
}

export function fromThunk<T>(value: () => T): Lazy<T> {
  return new Lazy(value)
}
