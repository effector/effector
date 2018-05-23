//@flow

import * as Name from './type'
import type {Atom} from '../../effector/atom'

class CmdClass<+Data> {
 /*::+data: Data;*/
 constructor(data: Data) {
  this.data = data
 }
}

export class Compute extends CmdClass<{
 reduce(oldValue: any, newValue: any, ctx: any): any,
}> {
 /*::+type: Name.ComputeType;*/
}

export class Run extends CmdClass<{
 transactionContext?: (data: any) => () => void,
 runner(ctx: any): any,
}> {
 /*::+type: Name.RunType;*/
}
export class Emit extends CmdClass<{
 +subtype: 'event' | 'effect',
 +fullName: string,
 runner(ctx: any): any,
}> {
 /*::+type: Name.EmitType;*/
}
export class Filter extends CmdClass<{
 filter(value: any, ctx: any): boolean,
}> {
 /*::+type: Name.FilterType;*/
}
export class Update extends CmdClass<{
 store: Atom<any>,
}> {
 /*::+type: Name.UpdateType;*/
}

(Compute.prototype: any).type = (Name.COMPUTE: Name.ComputeType)
;(Run.prototype: any).type = (Name.RUN: Name.RunType)
;(Emit.prototype: any).type = (Name.EMIT: Name.EmitType)
;(Filter.prototype: any).type = (Name.FILTER: Name.FilterType)
;(Update.prototype: any).type = (Name.UPDATE: Name.UpdateType)

export type Cmd = Run | Emit | Compute | Filter | Update
