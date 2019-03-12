//@flow
// import invariant from 'invariant'
import {type TypeDef} from 'effector/stdlib'
// import {__DEBUG__} from 'effector/flags'
import type {StepVisitor, CommonCtx, CommandList} from './index.h'
import command from './command'
import {runStep} from './runStep'
import {val, step} from './meta'

const querySome = meta => {
  const data: {
    +mode: 'some',
    +fn: (arg: any, meta: *) => {+arg: any, +list: Array<TypeDef<*, *>>},
  } = step(meta).data
  const fn = data.fn
  const arg = val('scope', meta).top.__stepArg
  const queryResult = fn(arg, meta)
  const newCtx = {
    __stepArg: queryResult.arg,
  }
  val('scope', meta).push(newCtx)
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
  } = step(meta).data
  const fn = data.fn
  const shape = data.shape
  const arg = val('scope', meta).top.__stepArg

  const queryResult = fn(arg, meta)
  for (const key in queryResult) {
    if (!(key in shape)) continue
    const def = shape[key]
    const subArg = queryResult[key]
    const newCtx = {
      __stepArg: subArg,
    }
    val('scope', meta).push(newCtx)
    runStep(def, meta)
    val('scope', meta).pop()
  }
  meta.stop = false
}

export const single: StepVisitor = meta => {
  const type = step(meta).data.type
  const local = command[type].local(meta, val('scope', meta).top.__stepArg)
  val('scope', meta).push(local)
  command[type].cmd(meta, local)
  meta.stop = !command[type].transition(meta, local)
}
export const multi: StepVisitor = meta => {
  const items = step(meta).data.slice()
  const scopeSize = val('scope', meta).full.length
  for (let i = 0; i < items.length; i++) {
    val('scope', meta).full.length = scopeSize
    runStep(items[i], meta)
  }
  meta.stop = false
}
export const seq: StepVisitor = meta => {
  const items = step(meta).data.slice()
  const scopeSize = val('scope', meta).full.length
  for (let i = 0; i < items.length; i++) {
    runStep(items[i], meta)
    if (meta.stop) {
      break
    }
  }
  val('scope', meta).full.length = scopeSize
}
export const query: StepVisitor = meta => {
  switch (step(meta).data.mode) {
    case 'some':
      return querySome(meta)
    case 'shape':
      return queryShape(meta)
  }
}

//extendWalk(runStep, stepVisitor)
