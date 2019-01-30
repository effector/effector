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
}
export type Stage = 'solo' | 'combine' | 'effect'

export type Meta = {
  tr: {[id: string]: {ctx: CommonCtx, meta: Meta}},
  tc: {
    [id: string]: Array<{
      ctx: CommonCtx,
      meta: Meta,
    }>,
  },
  replay: boolean,
  callstack: Array<TypeDef<*, *>>,
  ctx: CommonCtx,
  stop: boolean,
  transactions: Array<() => void>,
  arg: any,
  reg: Reg,
  val: {[name: string]: StateRef},
}

export type Command<tag> = /*:: interface */ {
  cmd(meta: Meta): TypeDef<tag, 'ctx'>,
  transition(reg: Reg): boolean,
}
