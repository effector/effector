//@flow

import type {TypeDef, StateRef} from 'effector/stdlib'

export type CtxKind =
  | 'compute'
  | 'emit'
  | 'filter'
  | 'update'
  | 'run'
  | 'combine'
export type CommonCtx = {__stepArg: any, ...}
export type Reg = {
  isChanged: boolean,
  isFailed: boolean,
}
export type Meta = {
  callstack: Array<TypeDef<*, *>>,
  stop: boolean,
  transactions: Array<() => void>,
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
  emit: Command<{__stepArg: any}>,
  filter: Command<{__stepArg: any, isChanged: boolean}>,
  run: Command<{__stepArg: any, isFailed: boolean}>,
  update: Command<{__stepArg: any, store: StateRef}>,
  compute: Command<{__stepArg: any, isChanged: boolean}>,
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
