//@flow

import type {Cmd} from '../cmd'
import * as Name from './type'

class StepClass<+Data> {
 /*::
 +data: Data;
 */
 constructor(data: Data) {
  this.data = data
 }
}

class Single extends StepClass<Cmd> {
 /*::
 +type: Name.SingleType;
 +data: Cmd;
 */
}
class Multi extends StepClass<Set<Step>> {
 /*::
 +type: Name.MultiType;
 +data: Set<Step>;
 */
}
class Seq extends StepClass<Array<Step>> {
 /*::
 +type: Name.SeqType;
 +data: Array<Step>;
 */
}

(Single.prototype: any).type = (Name.SINGLE: Name.SingleType)
;(Multi.prototype: any).type = (Name.MULTI: Name.MultiType)
;(Seq.prototype: any).type = (Name.SEQ: Name.SeqType)

export type Step = Single | Multi | Seq
export type {Single, Multi, Seq}

export function single(data: Cmd): Single {
 return new Single(data)
}

export function multi(data: Set<Step> | Step[] = new Set()): Multi {
 const resultData: Set<Step> = Array.isArray(data) ? new Set(data) : data

 return new Multi(resultData)
}

export function seq(data: Array<Step>): Seq {
 return new Seq(data)
}
