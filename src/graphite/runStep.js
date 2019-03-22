//@flow

import type {TypeDef} from 'effector/stdlib'
import type {Meta} from './index.h'
import command from './command'

type Line = {|
  +step: TypeDef<*, 'step'>,
  +pre: Array<PostAction>,
  +post: Array<PostAction>,
|}

type Area = {|
  +list: $ReadOnlyArray<Line>,
  +pre: Array<PostAction>,
  +post: Array<PostAction>,
  index: number,
|}

export function runStep(step: TypeDef<*, 'step'>, meta: Meta) {
  const scope = meta.scope
  //prettier-ignore
  const pos: {|
    head: number,
    +stack: Array<Area>,
  |} = {
    head: 0,
    stack: [{
      list: [{
        step,
        pre: [],
        post: [
          {type: 'callstack/pop'},
        ],
      }],
      pre: [],
      post: [],
      index: 0,
    }],
  }
  headLoop: while (pos.head >= 0) {
    const area = pos.stack[pos.head]
    runActions(area.pre, area)
    while (area.index < area.list.length) {
      const line = area.list[area.index]
      const step = line.step
      meta.stop = false
      meta.callstack.push(step)
      runActions(line.pre, area)
      switch (step.type) {
        case 'single': {
          const type = step.data.type
          const local = command[type].local(meta, scope[scope.length - 1].arg)
          scope.push(local)
          command[type].cmd(meta, local)
          meta.stop = !command[type].transition(meta, local)
          break
        }
        case 'multi': {
          line.post.push({type: 'meta/!stop'})
          const items = step.data
          const list: Array<Line> = Array(items.length)
          for (let i = 0; i < items.length; i++) {
            list[i] = {
              step: items[i],
              pre: [],
              post: [
                {type: 'callstack/pop'},
                {type: 'scope/size', size: scope.length},
              ],
            }
          }
          area.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list,
            pre: [],
            post: line.post,
            index: 0,
          }
          continue headLoop
        }
        case 'seq': {
          line.post.push({type: 'scope/size', size: scope.length})
          const items: Array<TypeDef<*, 'step'>> = step.data
          const list: Array<Line> = Array(items.length)
          for (let i = 0; i < items.length; i++) {
            //prettier-ignore
            list[i] = {
              step: items[i],
              pre: [],
              post: [
                {type: 'callstack/pop'},
                {type: 'meta/?stop'},
              ],
            }
          }
          area.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list,
            pre: [],
            post: line.post,
            index: 0,
          }
          continue headLoop
        }
        /*case 'query': {
          line.post.push({type: 'meta/!stop'})
          const areaList: Array<Line> = []
          switch (step.data.mode) {
            case 'some': {
              const data: {
                +mode: 'some',
                +fn: (
                  arg: any,
                  meta: *,
                ) => {+arg: any, +list: Array<TypeDef<*, *>>},
              } = step.data
              const fn = data.fn
              const arg = scope[scope.length - 1].arg
              const queryResult = fn(arg, meta)

              const items = queryResult.list

              for (let i = 0; i < items.length; i++) {
                areaList.push({
                  step: items[i],
                  pre: [
                    {
                      type: 'scope/push',
                      scope: {
                        arg: queryResult.arg,
                      },
                    },
                  ],
                  post: [
                    {type: 'callstack/pop'},
                    {type: 'scope/size', size: scope.length},
                    {type: 'meta/!stop'},
                  ],
                })
              }
              break
            }
            case 'shape': {
              const data: {
                +mode: 'shape',
                +shape: {[string]: TypeDef<*, *>},
                +fn: (arg: any, meta: *) => {[string]: any},
              } = step.data
              const fn = data.fn
              const shape = data.shape
              const arg = scope[scope.length - 1].arg

              const queryResult = fn(arg, meta)
              for (const key in queryResult) {
                if (key in shape) {
                  areaList.push({
                    step: shape[key],
                    pre: [
                      {
                        type: 'scope/push',
                        scope: {
                          arg: queryResult[key],
                        },
                      },
                    ],
                    post: [
                      {type: 'callstack/pop'},
                      {type: 'scope/size', size: scope.length},
                      {type: 'meta/!stop'},
                    ],
                  })
                }
              }
              break
            }
          }
          area.index += 1
          pos.head += 1
          pos.stack[pos.head] = {
            list: areaList,
            pre: [],
            post: line.post,
            index: 0,
          }
          continue headLoop
        }*/
      }
      runActions(line.post, area)
      area.index += 1
    }
    runActions(area.post, area)
    pos.head -= 1
  }

  function runActions(post: Array<PostAction>, area: Area) {
    for (let i = post.length - 1; i >= 0; i--) {
      const action = post[i]
      switch (action.type) {
        case 'meta/?stop':
          if (meta.stop) area.index = Infinity
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
          scope.length = action.size
          break
        case 'scope/push':
          scope.push(action.scope)
          break
        /*::
        default:
          (action.type: empty)
        */
      }
    }
  }
}

type PostAction =
  | {|+type: 'meta/?stop'|}
  | {|+type: 'meta/!stop'|}
  | {|+type: 'head/--'|}
  | {|+type: 'callstack/pop'|}
  | {|+type: 'scope/size', +size: number|}
  | {|+type: 'scope/push', +scope: {+arg: any}|}
