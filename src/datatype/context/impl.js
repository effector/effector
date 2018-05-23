//@flow

import * as Type from './type'
import {type Time, now} from '../../effector/time'

class ContextClass<+Data> {
 /*::
 +type: $Subtype<Type.ContextType>;
 +data: Data;
 +time: Time;
 */
 constructor(data: Data) {
  this.data = data
  this.time = now()
 }
}

export class ComputeContext extends ContextClass<{
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
export class EmitContext extends ContextClass<{
 +payload: any,
 +eventName: string,
}> {
 /*::
 +type: Type.EmitContextType;
 */
}
export class RunContext extends ContextClass<{
 +args: Array<any>,
 +parentContext: ComputeContext | EmitContext | FilterContext | UpdateContext,
}> {
 /*::
 +type: Type.RunContextType;
 */
}
export class FilterContext extends ContextClass<{
 +value: any,
 isChanged: boolean,
}> {
 /*::
 +type: Type.FilterContextType;
 */
}
export class UpdateContext extends ContextClass<{
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

export type Context =
 | ComputeContext
 | EmitContext
 | RunContext
 | FilterContext
 | UpdateContext
