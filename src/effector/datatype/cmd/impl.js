//@flow

import * as Name from './type'
import type {Atom} from '../../atom'

class CmdClass<+Data> {
 /*::+data: Data;*/
 constructor(data: Data) {
  this.data = data
 }
}

class Compute extends CmdClass<{
 reduce(oldValue: any, newValue: any, ctx: any): any,
}> {
 /*::+type: Name.ComputeType;*/
}

class Run extends CmdClass<{
 transactionContext?: (data: any) => () => void,
 runner(ctx: any): any,
}> {
 /*::+type: Name.RunType;*/
}
class Emit extends CmdClass<{
 +subtype: 'event' | 'effect',
 +fullName: string,
 runner(ctx: any): any,
}> {
 /*::+type: Name.EmitType;*/
}
class Filter extends CmdClass<{
 filter(value: any, ctx: any): boolean,
}> {
 /*::+type: Name.FilterType;*/
}
class Update extends CmdClass<{
 store: Atom<any>,
}> {
 /*::+type: Name.UpdateType;*/
}

(Compute.prototype: any).type = (Name.COMPUTE: Name.ComputeType)
;(Run.prototype: any).type = (Name.RUN: Name.RunType)
;(Emit.prototype: any).type = (Name.EMIT: Name.EmitType)
;(Filter.prototype: any).type = (Name.FILTER: Name.FilterType)
;(Update.prototype: any).type = (Name.UPDATE: Name.UpdateType)

export type {Compute, Run, Emit, Filter, Update}

export type Cmd = Run | Emit | Compute | Filter | Update

export function compute(data: {
 reduce(oldValue: any, newValue: any, ctx: any): any,
}): Compute {
 return new Compute(data)
}

export function run(data: {
 transactionContext?: (data: any) => () => void,
 runner(ctx: any): any,
}): Run {
 return new Run(data)
}

export function emit(data: {
 +subtype: 'event' | 'effect',
 +fullName: string,
 runner(ctx: any): any,
}): Emit {
 return new Emit(data)
}

export function filter(data: {filter(value: any, ctx: any): boolean}): Filter {
 return new Filter(data)
}

export function update(data: {store: Atom<any>}): Update {
 return new Update(data)
}
