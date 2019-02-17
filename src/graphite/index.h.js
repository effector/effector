//@flow

import type {TypeDef, StateRef} from 'effector/stdlib'

export type CtxKind =
  | 'compute'
  | 'emit'
  | 'filter'
  | 'update'
  | 'run'
  | 'combine'
export type CommonCtx = TypeDef<CtxKind, 'ctx'>
export type Reg = {
  isChanged: boolean,
  isFailed: boolean,
}
export type Meta = {
  callstack: Array<TypeDef<*, *>>,
  ctx: CommonCtx,
  stop: boolean,
  transactions: Array<() => void>,
  arg: any,
  reg: Reg,
  val: {[name: string]: StateRef},
}

export type Command = {
  cmd(meta: Meta): TypeDef<*, 'ctx'>,
  transition(meta: Meta): boolean,
}
export type StepVisitor = (ctx: CommonCtx, meta: Meta) => void
