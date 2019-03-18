//@flow

import type {TypeDef, StateRef} from 'effector/stdlib'

export type CtxKind =
  | 'compute'
  | 'emit'
  | 'filter'
  | 'update'
  | 'run'
  | 'combine'
export type CommonCtx = {arg: any, ...}
export type Reg = {
  isChanged: boolean,
  isFailed: boolean,
}
export type Meta = {
  callstack: Array<TypeDef<*, *>>,
  stop: boolean,
  transactions: Array<() => void>,
  scope: Array<any>,
  pendingEvents: Array<{
    event: (data: any) => any,
    data: any,
  }>,
  reg: Reg,
  val: {[name: string]: StateRef},
}

export type Command<Local> = {
  cmd(meta: Meta, local: Local): void,
  transition(meta: Meta, local: Local): boolean,
  local(meta: Meta): Local,
}

export type CommandList = $ReadOnly<{
  emit: Command<{arg: any}>,
  filter: Command<{arg: any, isChanged: boolean}>,
  run: Command<{arg: any, isFailed: boolean}>,
  update: Command<{arg: any, store: StateRef}>,
  compute: Command<{arg: any, isChanged: boolean}>,
}>

export type StepVisitor = (meta: Meta) => void
export type ScopeIterator = {
  +index: number,
  +body: Array<any>,
  value(): any,
  bottom(): any,
  down(): boolean,
  up(): boolean,
}
