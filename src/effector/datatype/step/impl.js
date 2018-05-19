//@flow

import type {Cmd} from '../cmd'
import * as Name from './type'
import * as Type from './index.h'

class Step {
 /*:: type: any;*/
 /*::+*/ data: any
 constructor(data: any) {
  this.data = data
 }
}

class Single extends Step {}
class Multi extends Step {}
class Seq extends Step {}

Object.defineProperty(Single.prototype, 'type', {
 value: Name.SINGLE,
 configurable: true,
})

Object.defineProperty(Multi.prototype, 'type', {
 value: Name.MULTI,
 configurable: true,
})

Object.defineProperty(Seq.prototype, 'type', {
 value: Name.SEQ,
 configurable: true,
})

export function single(data: Cmd): Type.Single {
 return new Single(data)
}

export function multi(
 data: Set<Type.Step> | Type.Step[] = new Set(),
): Type.Multi {
 const resultData: Set<Type.Step> = Array.isArray(data) ? new Set(data) : data

 return new Multi(resultData)
}

export function seq(data: Array<Type.Step>): Type.Seq {
 return new Seq(data)
}
