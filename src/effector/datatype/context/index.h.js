//@flow

import type {Compute, Emit, Run} from '../cmd'
import type {Multi, Seq} from '../step'
import type {Time} from '../../time'

export type ComputeContext = {
 +time: Time,
 +args: Array<any>,
 +meta: {
  +isCompute: true,
  +isRun: false,
  +isEmit: false,
 },
 result: any,
 error: any,
 isError: boolean,
 isNone: boolean,
 isChanged: boolean,
}

export type EmitContext = {
 +time: Time,
 +payload: any,
 +meta: {
  +isCompute: false,
  +isRun: false,
  +isEmit: true,
 },
 needToRun: boolean,
 +eventName: string,
}

export type RunContext = {
 +time: Time,
 +args: Array<any>,
 +meta: {
  +isCompute: false,
  +isRun: true,
  +isEmit: false,
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
