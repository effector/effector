//@flow

import * as Type from './index.h'
import type {ComputeType, EmitType, RunType} from './type.h'

class Cmd {
 /*:: type: any;*/
 /*::+*/ data: any
 constructor(data: any) {
  this.data = data
 }
}

class Compute extends Cmd {}
class Run extends Cmd {}
class Emit extends Cmd {}

Object.defineProperty(Compute.prototype, 'type', {
 value: ('compute': ComputeType),
 configurable: true,
})

Object.defineProperty(Run.prototype, 'type', {
 value: ('run': RunType),
 configurable: true,
})

Object.defineProperty(Emit.prototype, 'type', {
 value: ('emit': EmitType),
 configurable: true,
})

export function compute(data: {
 reduce(oldValue: any, newValue: any, ctx: any): any,
 shouldChange?: boolean,
}): Type.Compute {
 if (data.shouldChange === undefined) data.shouldChange = false
 return new Compute(data)
}

export function run(data: {runner(ctx: any): any}): Type.Run {
 return new Run(data)
}

export function emit(data: {
 +subtype: 'event' | 'effect',
 +fullName: string,
 runner(ctx: any): any,
}): Type.Emit {
 return new Emit(data)
}
