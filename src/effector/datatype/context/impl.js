//@flow

import * as Type from './type'
import {type Time, now} from '../../time'

class ContextClass<+Data> {
 /*::
 +type: $Subtype<Type.ContextType>;
 +data: Data;
 +time: Time;
 */
 constructor(data: Data, time: Time) {
  this.data = data
  this.time = time
 }
}

class ComputeContext extends ContextClass<{
 +args: Array<any>,
 result: any,
 error: any,
 isError: boolean,
 isNone: boolean,
 isChanged: boolean,
}> {
 /*::
 +type: Type.ComputeContextType;
 */
}
class EmitContext extends ContextClass<{
 +payload: any,
 needToRun: boolean,
 +eventName: string,
}> {
 /*::
 +type: Type.EmitContextType;
 */
}
class RunContext extends ContextClass<{
 +args: Array<any>,
 +parentContext: ComputeContext | EmitContext | FilterContext | UpdateContext,
}> {
 /*::
 +type: Type.RunContextType;
 */
}
class FilterContext extends ContextClass<{
 +value: any,
 isChanged: boolean,
}> {
 /*::
 +type: Type.FilterContextType;
 */
}
class UpdateContext extends ContextClass<{
 value: any,
}> {
 /*::
 +type: Type.UpdateContextType;
 */
}

(ComputeContext.prototype: any).type = (Type.COMPUTE: Type.ComputeContextType)
;(EmitContext.prototype: any).type = (Type.EMIT: Type.EmitContextType)
;(RunContext.prototype: any).type = (Type.RUN: Type.RunContextType)
;(FilterContext.prototype: any).type = (Type.FILTER: Type.FilterContextType)
;(UpdateContext.prototype: any).type = (Type.UPDATE: Type.UpdateContextType)

export type {
 ComputeContext,
 EmitContext,
 RunContext,
 FilterContext,
 UpdateContext,
}

export type Context =
 | ComputeContext
 | EmitContext
 | RunContext
 | FilterContext
 | UpdateContext

export function filterContext(
 value: any,
 isChanged: boolean,
 time: Time = now(),
): FilterContext {
 return new FilterContext(
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
 return new ComputeContext(
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
 return new UpdateContext({value}, time)
}

export function emitContext(
 payload: any,
 eventName: string,
 time: Time = now(),
): EmitContext {
 return new EmitContext(
  {
   payload,
   eventName,
   needToRun: false,
  },
  time,
 )
}

export function runContext(
 args: Array<any>,
 parentContext: ComputeContext | EmitContext | FilterContext | UpdateContext,
 time: Time = now(),
): RunContext {
 return new RunContext(
  {
   args,
   parentContext,
  },
  time,
 )
}
