//@flow
import invariant from 'invariant'
import {type TypeDef} from 'effector/stdlib'
import {__DEBUG__} from 'effector/flags'
import type {StepVisitor, CommonCtx, CommandList} from './index.h'
import command from './command'
import {runStep} from './runStep'

declare var __step: TypeDef<*, 'step'>
declare var __single: any
declare function __val(key: string, value: any): any

const querySome = meta => {
  const data: {
    +mode: 'some',
    +fn: (arg: any, meta: *) => {+arg: any, +list: Array<TypeDef<*, *>>},
  } = __step.data
  const fn = data.fn
  const arg = __val('scope').top.__stepArg
  const queryResult = fn(arg, meta)
  const newCtx = {
    __stepArg: queryResult.arg,
  }
  __val('scope').push(newCtx)
  const items = queryResult.list
  for (let i = 0; i < items.length; i++) {
    runStep(items[i], meta)
  }
  meta.stop = false
}
const queryShape = meta => {
  const data: {
    +mode: 'shape',
    +shape: {[string]: TypeDef<*, *>},
    +fn: (arg: any, meta: *) => {[string]: any},
  } = __step.data
  const fn = data.fn
  const shape = data.shape
  const arg = __val('scope').top.__stepArg

  const queryResult = fn(arg, meta)
  for (const key in queryResult) {
    if (!(key in shape)) continue
    const def = shape[key]
    const subArg = queryResult[key]
    const newCtx = {
      __stepArg: subArg,
    }
    __val('scope').push(newCtx)
    runStep(def, meta)
    __val('scope').pop()
  }
  meta.stop = false
}

export const single: StepVisitor = meta => {
  const type = __step.data.type
  const local = command[type].local(meta)
  __val('scope').push(local)
  command[type].cmd(meta, local)
  meta.stop = !command[type].transition(meta, local)
}
export const multi: StepVisitor = meta => {
  const items = __step.data.slice()
  const scopeSize = __val('scope').full.length
  for (let i = 0; i < items.length; i++) {
    __val('scope').full.length = scopeSize
    runStep(items[i], meta)
  }
  meta.stop = false
}
export const seq: StepVisitor = meta => {
  const items = __step.data.slice()
  const scopeSize = __val('scope').full.length
  for (let i = 0; i < items.length; i++) {
    runStep(items[i], meta)
    if (meta.stop) {
      break
    }
  }
  __val('scope').full.length = scopeSize
}
export const query: StepVisitor = meta => {
  switch (__step.data.mode) {
    case 'some':
      return querySome(meta)
    case 'shape':
      return queryShape(meta)
  }
}

//extendWalk(runStep, stepVisitor)
