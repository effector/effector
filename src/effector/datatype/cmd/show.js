//@flow

import * as Name from './type.h'
import * as Type from './index.h'

export function show(value: Type.Cmd): string {
 switch (value.type) {
  case ('emit': Name.EmitType):
   return `Emit(${value.data.fullName})`
  case ('run': Name.RunType):
   return 'Run'
  case ('compute': Name.ComputeType):
   return 'Compute'
  default:
   /*::(value.type: empty)*/
   throw new Error('impossible type')
 }
}
