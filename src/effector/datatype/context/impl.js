//@flow

import type {RunContext, EmitContext, ComputeContext} from './index.h'
import * as Type from './type'
import {type Time, now} from '../../time'

class Context {
 /*:: type: any;*/
 /*::+*/ data: any
 /*::+*/ time: Time
 constructor(data: any, time: Time) {
  this.data = data
  this.time = time
 }
}

class Compute extends Context {}
class Emit extends Context {}
class Run extends Context {}
class Filter extends Context {}

Object.defineProperty(Compute.prototype, 'type', {
 value: Type.COMPUTE,
 configurable: true,
})
Object.defineProperty(Emit.prototype, 'type', {
 value: Type.EMIT,
 configurable: true,
})
Object.defineProperty(Run.prototype, 'type', {
 value: Type.RUN,
 configurable: true,
})
Object.defineProperty(Filter.prototype, 'type', {
 value: Type.FILTER,
 configurable: true,
})

export function computeContext(
 args: Array<any>,
 time: Time = now(),
): ComputeContext {
 return new Compute(
  {
   args,
   meta: {
    isCompute: true,
    isRun: false,
    isEmit: false,
   },
   result: null,
   error: null,
   isError: false,
   isNone: true,
   isChanged: true,
  },
  time,
 )
}

export function emitContext(
 payload: any,
 eventName: string,
 time: Time = now(),
): EmitContext {
 return new Emit(
  {
   payload,
   eventName,
   meta: {
    isCompute: false,
    isRun: false,
    isEmit: true,
   },
   needToRun: false,
  },
  time,
 )
}

export function runContext(args: Array<any>, time: Time = now()): RunContext {
 return new Run(
  {
   args,
   meta: {
    isCompute: false,
    isRun: true,
    isEmit: false,
   },
  },
  time,
 )
}
