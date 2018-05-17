//@flow

import type {Compute, Emit, Run} from '../cmd'
import type {Multi, Seq} from '../step'
import type {Time} from '../../time'
import * as Type from './type.h'

export type ComputeContext = {
 type: Type.ComputeContextType,
 +time: Time,
 +data: {
  +args: Array<any>,
  result: any,
  error: any,
  isError: boolean,
  isNone: boolean,
  isChanged: boolean,
 },
}

export type EmitContext = {
 type: Type.EmitContextType,
 +time: Time,
 +data: {
  +payload: any,
  needToRun: boolean,
  +eventName: string,
 },
}

export type RunContext = {
 type: Type.RunContextType,
 +time: Time,
 +data: {
  +args: Array<any>,
 },
}

export type FilterContext = {
 type: Type.FilterContextType,
 +time: Time,
 +data: {
  +value: any,
  result: any,
  isNone: boolean,
  isChanged: boolean,
 },
}

// export type Context = {
//  +time: Time,
//  +compute: Map<Compute, ComputeContext>,
//  +emit: Map<Emit, EmitContext>,
//  +run: Map<Run, RunContext>,
//  +multi: Map<Multi, Context>,
//  +seq: Map<Seq, Array<Context>>,
// }
