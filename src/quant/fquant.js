//@flow

import {bypass, unary, type Unary} from './opaque.h'

export class FQuant {
  seq: Unary[]
  comap<I, O>(fn: (x: I) => O) {
    const quant = new FQuant()
    quant.seq = [unary(fn), ...this.seq]
    return quant
  }
  map<I, O>(fn: (x: I) => O) {
    const quant = new FQuant()
    quant.seq = [...this.seq, unary(fn)]
    return quant
  }
  toFn<I, O>(): (x: I) => O {
    return value => run(value)(this.seq)
  }
}

function run<I, O>(value: I): (seq: Unary[]) => O {
  return seq => {
    let result: any = value
    for (const fn of seq) {
      result = fn(result)
    }
    return result
  }
}

export function create(): FQuant {
  const quant = new FQuant()
  quant.seq = [bypass]
  return quant
}

export function lift<I, O>(fn: (x: I) => O): FQuant {
  const quant = new FQuant()
  quant.seq = [unary(fn)]
  return quant
}

export function value<T>(value: T): FQuant {
  const quant = new FQuant()
  quant.seq = [unary(_ => value)]
  return quant
}
