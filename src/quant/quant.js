//@flow

import {create, type ID} from './id'
import * as FunQuant from './fquant'

export class Quant {
  id: ID
  value: any
  map<I, O>(fn: (x: I) => O) {
    const quant = new Quant()
    const value = fn(this.value)
    quant.value = value
    quant.id = this.id.inc()
    return quant
  }
}


