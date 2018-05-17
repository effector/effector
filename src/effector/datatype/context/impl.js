//@flow

import type {
 RunContext,
 EmitContext,
 ComputeContext,
 FilterContext,
 UpdateContext,
} from './index.h'
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
class Update extends Context {}

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
Object.defineProperty(Update.prototype, 'type', {
 value: Type.UPDATE,
 configurable: true,
})

export function filterContext(
 value: any,
 isChanged: boolean,
 time: Time = now(),
): FilterContext {
 return new Filter(
  {
   value,
   isChanged,
  },
  time,
 )
}

export function computeContext(
 args: Array<any>,
 time: Time = now(),
): ComputeContext {
 return new Compute(
  {
   args,
   result: null,
   error: null,
   isError: false,
   isNone: true,
   isChanged: true,
  },
  time,
 )
}

export function updateContext(value: any, time: Time = now()): UpdateContext {
 return new Update({value}, time)
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
   needToRun: false,
  },
  time,
 )
}

export function runContext(args: Array<any>, time: Time = now()): RunContext {
 return new Run(
  {
   args,
  },
  time,
 )
}
