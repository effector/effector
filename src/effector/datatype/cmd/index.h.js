//@flow

import type {
 ComputeType,
 EmitType,
 RunType,
 FilterType,
 UpdateType,
} from './type.h'

import type {Atom} from '../../atom'

export type Compute = {
 +type: ComputeType,
 +data: {
  reduce(oldValue: any, newValue: any, ctx: any): any,
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

export type Filter = {
 +type: FilterType,
 +data: {
  filter(value: any, ctx: any): boolean,
 },
}

export type Update = {
 +type: UpdateType,
 +data: {
  store: Atom<any>,
 },
}

export type Cmd = Run | Emit | Compute | Filter | Update
