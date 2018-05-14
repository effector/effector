//@flow

import type {ComputeType, EmitType, RunType} from './type.h'

export type Compute = {
 +type: ComputeType,
 +data: {
  reduce(oldValue: any, newValue: any, ctx: any): any,
  shouldChange: boolean,
 },
}

export type Emit = {
 +type: EmitType,
 +data: {
  +subtype: 'event' | 'effect',
  +fullName: string,
  runner(ctx: any): any,
 },
}

export type Run = {
 +type: RunType,
 +data: {
  transactionContext?: (data: any) => () => void,
  runner(ctx: any): any,
 },
}

export type Cmd = Run | Emit | Compute
