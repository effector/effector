//@flow

import type {TypeDef, StateRef} from 'effector/stdlib'

export type CommonCtx = TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>
export type Reg = {
  isChanged: boolean,
}
export type Meta = {
  ctx: TypeDef<'compute' | 'emit' | 'filter' | 'update', 'ctx'>,
  stop: boolean,
  transactions: Array<() => void>,
  arg: any,
  reg: Reg,
  val: {[name: string]: StateRef},
}

export type Command<tag> = /*:: interface */ {
  cmd(single: TypeDef<tag, 'cmd'>, meta: Meta): TypeDef<tag, 'ctx'>,
  transition(reg: Reg): boolean,
}
