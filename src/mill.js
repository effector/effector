//@flow

import type {Reducer} from './index.h'
import {createReducer} from './reducer'
import {joint} from './joint'


export class Mill {
  parts: $ReadOnlyArray<Reducer<any>>
  and<A>(red: Reducer<A>): Mill {
    return new Mill([
      ...this.parts,
      red,
    ])
  }
  joint<R>(fn: (...data: any[]) => R): Reducer<R> {
    const reducers = this.parts.length === 0
      ? [createReducer()]
      : this.parts
    const join: any = joint
    const joined = join(fn, ...reducers)
    return joined
  }
  constructor(parts: $ReadOnlyArray<Reducer<any>> = []) {
    this.parts = parts
  }
}

export function mill(): Mill {
  return new Mill
}
