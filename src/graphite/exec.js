//@flow

import type {TypeDef, Graph} from 'effector/stdlib'
import type {Meta, CommandList} from './index.h'

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

type PostAction =
  | {|+type: 'meta/?stop'|}
  | {|+type: 'meta/!stop'|}
  | {|+type: 'head/--'|}
  | {|+type: 'callstack/pop'|}
  | {|+type: 'scope/size', +size: number|}
  | {|+type: 'scope/push', +scope: {+arg: any}|}

const step = (meta: Meta): TypeDef<*, 'step'> =>
  meta.callstack[meta.callstack.length - 1]
const single = (meta: Meta) => step(meta).data.data

export function exec(unit: {+graphite: Graph<any>, ...}, payload: any) {
  runtime(unit.graphite, payload)
}
export function runtime(graph: Graph<any>, payload: any) {
  const meta: Meta = {
    callstack: [],
    pendingEvents: [],
    stop: false,
    scope: [
      {
        arg: payload,
      },
    ],
    val: {},
  }
  runStep(graph.seq, meta)
  runPendings(meta.pendingEvents)
}
const runPendings = pendings => {
  if (pendings.length === 0) return
  const ordered = []
  const orderedIDs = []
  for (let i = pendings.length - 1; i >= 0; i--) {
    const item = pendings[i]
    if (orderedIDs.indexOf(item.event.id) !== -1) continue
    orderedIDs.push(item.event.id)
    ordered.push(item)
  }
  if (ordered.length === 0) return
  for (let i = ordered.length - 1; i >= 0; i--) {
    const item = ordered[i]
    item.event(item.data)
  }
}
const runStep = (step: TypeDef<*, 'step'>, meta: Meta) => {
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

const cmd = {
  emit(meta, local) {},
  filter(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null /*: any*/),
      arg: local.arg,
      val: meta.val,
      fn: single(meta).fn,
    })
    local.isChanged = Boolean(runCtx.result)
  },
  run(meta, local) {
    const data = single(meta)
    if ('pushUpdate' in data) {
      data.pushUpdate = data => meta.pendingEvents.push(data)
    }
    const runCtx = tryRun({
      err: false,
      result: (null /*: any*/),
      arg: local.arg,
      val: meta.val,
      fn: data.fn,
    })
    local.isFailed = runCtx.err
  },
  update(meta, local) {
    local.store.current = local.arg
  },
  compute(meta, local) {
    const runCtx = tryRun({
      err: false,
      result: (null /*: any*/),
      arg: local.arg,
      val: meta.val,
      fn: single(meta).fn,
    })
    local.isChanged = !runCtx.err
    ///TODO WARNING!! DIRTY HACK REMOVE ASAP
    ///need to separate pre and post local variables
    local.arg = runCtx.err ? null : runCtx.result
  },
}

const command = ({
  emit: {
    cmd: cmd.emit,
    transition: () => true,
    local: (meta, arg) => ({arg}),
  },
  filter: {
    cmd: cmd.filter,
    transition: (meta, local) => local.isChanged,
    local: (meta, arg) => ({arg, isChanged: false}),
  },
  run: {
    cmd: cmd.run,
    transition: (meta, local) => local.isFailed,
    local: (meta, arg) => ({arg, isFailed: true}),
  },
  update: {
    cmd: cmd.update,
    transition: () => true,
    local: (meta, arg) => ({
      arg,
      store: single(meta).store,
    }),
  },
  compute: {
    cmd: cmd.compute,
    transition: (meta, local) => local.isChanged,
    local: (meta, arg) => ({
      arg,
      isChanged: false,
    }),
  },
}: CommandList)

const tryRun = ctx => {
  try {
    ctx.result = ctx.fn.call(null, ctx.arg, ctx.val)
  } catch (err) {
    console.error(err)
    ctx.err = true
  }
  return ctx
}
