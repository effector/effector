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
  const scope = meta.val.scope.current
  //prettier-ignore
  const pos: {|
    head: number,
    +stack: Array<{|
      +list: $ReadOnlyArray<{|
        +stepObj: TypeDef<*, 'step'>,
        +postActions: Array<PostAction>,
      |}>,
      +postActions: Array<PostAction>,
      index: number,
    |}>,
  |} = {
    head: 0,
    stack: [{
      list: [{
        stepObj,
        postActions: [
          {type: 'callstack/pop'},
        ],
      }],
      postActions: [],
      index: 0,
    }],
  }
  headLoop: while (pos.head >= 0) {
    const stack = pos.stack[pos.head]
    while (stack.index < stack.list.length) {
      const ctx = stack.list[stack.index]
      const postActions = ctx.postActions
      const stepObj = ctx.stepObj
      meta.stop = false
      meta.callstack.push(stepObj)
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
          postActions.push({type: 'meta/!stop'})
          const items = stepObj.data
          const list = Array(items.length)
          for (let i = 0; i < items.length; i++) {
            //prettier-ignore
            list[i] = {
              stepObj: items[i],
              postActions: [
                {type: 'callstack/pop'},
                {type: 'scope/size', size: scope.full.length},
              ],
            }
          }
          stack.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list,
            postActions,
            index: 0,
          }
          continue headLoop
        }
        case 'seq': {
          postActions.push({type: 'scope/size', size: scope.full.length})
          const items = stepObj.data
          const list = Array(items.length)
          for (let i = 0; i < items.length; i++) {
            //prettier-ignore
            list[i] = {
              stepObj: items[i],
              postActions: [
                {type: 'callstack/pop'},
                {type: 'meta/?stop'},
              ],
            }
          }
          stack.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list,
            postActions,
            index: 0,
          }
          continue headLoop
        }
        case 'query': {
          postActions.push({type: 'meta/!stop'})
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
              const scopes = []
              for (const key in queryResult) {
                if (key in shape) {
                  scopes.push({
                    scope: {
                      __stepArg: queryResult[key],
                    },
                    step: shape[key],
                  })
                }
              }
              for (let i = 0; i < scopes.length; i++, scope.pop()) {
                scope.push(scopes[i].scope)
                runStepAlt(scopes[i].step, meta)
              }
              break
            }
          }
          break
        }
      }
      runPostActions(postActions, stack)
      stack.index += 1
    }
    runPostActions(stack.postActions, stack)
    pos.head -= 1
  }

  function runPostActions(postActions, stack) {
    for (let i = postActions.length - 1; i >= 0; i--) {
      const action = postActions[i]
      switch (action.type) {
        case 'meta/?stop':
          if (meta.stop) stack.index = Infinity
          break
        case 'head/--':
          pos.head -= 1
          break
        case 'callstack/pop':
          meta.callstack.pop()
          break
        case 'meta/!stop':
          meta.stop = false
          break
        case 'scope/size':
          scope.full.length = action.size
          break
      }
    }
  }
}

type PostAction =
  | {|+type: 'meta/?stop'|}
  | {|+type: 'head/--'|}
  | {|+type: 'callstack/pop'|}
  | {|+type: 'meta/!stop'|}
  | {|+type: 'scope/size', +size: number|}
