//@flow

import type {TypeDef} from 'effector/stdlib'
import type {Meta} from './index.h'
import command from './command'

import * as stepVisitor from './stepVisitor'
export function runStep(step: TypeDef<*, 'step'>, meta: Meta) {
  meta.stop = false
  meta.callstack.push(step)
  stepVisitor[step.type](meta)
  meta.callstack.pop()
}

export function runStepAlt(stepObj: TypeDef<*, 'step'>, meta: Meta) {
  meta.stop = false
  meta.callstack.push(stepObj)
  const scope = meta.val.scope.current
  switch (stepObj.type) {
    case 'single': {
      const type = stepObj.data.type
      const local = command[type].local(meta, scope.top.__stepArg)
      scope.push(local)
      command[type].cmd(meta, local)
      meta.stop = !command[type].transition(meta, local)
      break
    }
    case 'multi': {
      const items = stepObj.data.slice()
      const scopeSize = scope.full.length
      for (let i = 0; i < items.length; i++) {
        scope.full.length = scopeSize
        runStepAlt(items[i], meta)
      }
      meta.stop = false
      break
    }
    case 'seq': {
      const items = stepObj.data.slice()
      const scopeSize = scope.full.length
      for (let i = 0; i < items.length; i++) {
        runStepAlt(items[i], meta)
        if (meta.stop) {
          break
        }
      }
      scope.full.length = scopeSize
      break
    }
    case 'query': {
      switch (stepObj.data.mode) {
        case 'some': {
          const data: {
            +mode: 'some',
            +fn: (
              arg: any,
              meta: *,
            ) => {+arg: any, +list: Array<TypeDef<*, *>>},
          } = stepObj.data
          const fn = data.fn
          const arg = scope.top.__stepArg
          const queryResult = fn(arg, meta)
          scope.push({
            __stepArg: queryResult.arg,
          })
          const items = queryResult.list
          for (let i = 0; i < items.length; i++) {
            runStepAlt(items[i], meta)
          }
          meta.stop = false
          break
        }
        case 'shape': {
          const data: {
            +mode: 'shape',
            +shape: {[string]: TypeDef<*, *>},
            +fn: (arg: any, meta: *) => {[string]: any},
          } = stepObj.data
          const fn = data.fn
          const shape = data.shape
          const arg = scope.top.__stepArg

          const queryResult = fn(arg, meta)
          for (const key in queryResult) {
            if (!(key in shape)) continue
            scope.push({
              __stepArg: queryResult[key],
            })
            runStepAlt(shape[key], meta)
            scope.pop()
          }
          meta.stop = false
        }
      }
      break
    }
  }
  meta.callstack.pop()
}
