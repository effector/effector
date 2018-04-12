//@flow

import type {Reducer} from './index.h'
import {createReducer} from './reducer'
import {combine} from './combine'

export class Collect {
 parts: $ReadOnlyArray<Reducer<any>>
 and<A>(red: Reducer<A>): Collect {
  return new Collect([...this.parts, red])
 }
 combine<R>(fn: (...data: any[]) => R): Reducer<R> {
  const reducers = this.parts.length === 0 ? [createReducer()] : this.parts
  const join: any = combine
  const joined = join(fn, ...reducers)
  return joined
 }
 joint<R>(fn: (...data: any[]) => R): Reducer<R> {
  return this.combine(fn)
 }
 constructor(parts: $ReadOnlyArray<Reducer<any>> = []) {
  this.parts = parts
 }
}

export function collect(): Collect {
 return new Collect()
}

export {collect as mill}
