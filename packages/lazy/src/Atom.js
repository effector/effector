//@flow strict

// import invariant from 'invariant'

// import {type Lazy, fromThunk, fromValue} from './instance'

export type Atom<T> = {
  get(): T,
  set(thunk: () => T): void,
  // lock(): void,
  // unlock(): void,
  // isLocked(): boolean,
}

export function createAtom<T>(defaultValue: () => T): Atom<T> {
 let value = defaultValue
 // let isLocked = false
 // const lazy: Lazy<T> = fromThunk(() => value)

 // const defer: Lazy<(_: T) => void> = fromValue(newValue => {
 //   value = newValue
 // })

 return {
  get() {
   return value()
   // return lazy.read()
  },
  set(newValue) {
   value = newValue
   // invariant(!isLocked, 'locked value')
   // defer.read()(value)
  },
  // isLocked() {
  //   return isLocked
  // },
  // lock() {
  //   invariant(!isLocked, 'already locked')
  //   isLocked = true
  // },
  // unlock() {
  //   invariant(isLocked, 'already unlocked')
  //   isLocked = false
  // },
 }
}
