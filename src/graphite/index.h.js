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

export type Meta = {|
  callstack: Array<TypeDef<*, *>>,
  stop: boolean,
  scope: Array<any>,
  pendingEvents: Array<{
    event: (data: any) => any,
    data: any,
  }>,
  val: {[name: string]: StateRef},
|}

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

export type Line = {|
  +step: TypeDef<*, 'step'>,
  +pre: Array<PostAction>,
  +post: Array<PostAction>,
|}

export type Area = {|
  +list: $ReadOnlyArray<Line>,
  +pre: Array<PostAction>,
  +post: Array<PostAction>,
  index: number,
  active: boolean,
|}
export type Pos = {|
  head: number,
  +stack: Array<Area>,
|}
export type PostAction =
  | {|+type: 'meta/?stop'|}
  | {|+type: 'meta/!stop'|}
  | {|+type: 'head/--'|}
  | {|+type: 'callstack/pop'|}
  | {|+type: 'scope/size', +size: number|}
  | {|+type: 'scope/push', +scope: {+arg: any}|}
