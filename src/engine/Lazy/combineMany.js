//@flow strict

import invariant from 'invariant'
import {type Lazy, fromThunk, fromValue} from './instance'
import {combine} from './combine'
import {map} from './methods'

export function combineMany<R>(...args: Array<Lazy<any>>): Lazy<R> {
  invariant(args.length > 0, 'combineMany need at least 1 argument')
  const [fn, ...rest] = args.reverse()
  invariant(
    typeof fn === 'function',
    'last argument should be a function, got %s',
    typeof fn,
  )
  switch (rest.length) {
    case 0:
      return fromThunk(fn)
    case 1:
      return map(fn, rest[0])
    case 2:
      return combine(rest[1], rest[0], fn)
    default: {
      const combined = rest.reduceRight(reducer, voidAcc)
      return map(list => fn(...list), combined)
    }
  }
}

const voidAcc: Lazy<any[]> = fromValue([])

function add(acc: any[], value: any): any[] {
  return [...acc, value]
}

function reducer(acc: Lazy<any[]>, val: Lazy<any>): Lazy<any[]> {
  return combine(acc, val, add)
}
